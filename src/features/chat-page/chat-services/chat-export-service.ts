"use server";
import "server-only";

import { userHashedId } from "@/features/auth-page/helpers";
import { ServerActionResponse } from "@/features/common/server-action-response";
import { FindAllChatMessagesForCurrentUser } from "./chat-message-service";
import {
  FindAllChatThreadForCurrentUser,
  FindChatThreadForCurrentUser,
} from "./chat-thread-service";
import { ChatMessageModel, ChatThreadModel } from "./models";

export interface ChatExportMessage {
  id: string;
  createdAt: string;
  role: ChatMessageModel["role"];
  author: string;
  content: string;
  multiModalImage?: string;
}

export interface ChatExportConversation {
  id: string;
  title: string;
  createdAt: string;
  lastMessageAt: string;
  persona: {
    title: string;
    message: string;
  };
  extensions: string[];
  messages: ChatExportMessage[];
}

export interface ChatExportPayload {
  format: "azurechat-export";
  version: "1.0";
  exportedAt: string;
  userId: string;
  chats: ChatExportConversation[];
}

const toIso = (value: Date | string) => new Date(value).toISOString();

const mapConversation = (props: {
  thread: ChatThreadModel;
  messages: ChatMessageModel[];
}): ChatExportConversation => {
  const { thread, messages } = props;

  return {
    id: thread.id,
    title: thread.name,
    createdAt: toIso(thread.createdAt),
    lastMessageAt: toIso(thread.lastMessageAt),
    persona: {
      title: thread.personaMessageTitle || "",
      message: thread.personaMessage || "",
    },
    extensions: thread.extension || [],
    messages: messages.map((message) => ({
      id: message.id,
      createdAt: toIso(message.createdAt),
      role: message.role,
      author: message.name,
      content: message.content,
      multiModalImage: message.multiModalImage,
    })),
  };
};

const buildExportPayload = async (
  chats: ChatExportConversation[]
): Promise<ChatExportPayload> => ({
  format: "azurechat-export",
  version: "1.0",
  exportedAt: new Date().toISOString(),
  userId: await userHashedId(),
  chats,
});

export const BuildSingleChatExportForCurrentUser = async (
  chatThreadId: string
): Promise<ServerActionResponse<ChatExportPayload>> => {
  const threadResponse = await FindChatThreadForCurrentUser(chatThreadId);
  if (threadResponse.status !== "OK") {
    return threadResponse;
  }

  const messagesResponse = await FindAllChatMessagesForCurrentUser(chatThreadId);
  if (messagesResponse.status !== "OK") {
    return messagesResponse;
  }

  return {
    status: "OK",
    response: await buildExportPayload([
      mapConversation({
        thread: threadResponse.response,
        messages: messagesResponse.response,
      }),
    ]),
  };
};

export const BuildAllChatsExportForCurrentUser = async (): Promise<
  ServerActionResponse<ChatExportPayload>
> => {
  const chatThreadResponse = await FindAllChatThreadForCurrentUser();
  if (chatThreadResponse.status !== "OK") {
    return chatThreadResponse;
  }

  const chats: ChatExportConversation[] = [];
  for (const thread of chatThreadResponse.response) {
    const messagesResponse = await FindAllChatMessagesForCurrentUser(thread.id);
    if (messagesResponse.status !== "OK") {
      return messagesResponse;
    }

    chats.push(
      mapConversation({
        thread,
        messages: messagesResponse.response,
      })
    );
  }

  return {
    status: "OK",
    response: await buildExportPayload(chats),
  };
};
