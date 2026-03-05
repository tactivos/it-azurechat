import {
  BuildAllChatsExportForCurrentUser,
  BuildSingleChatExportForCurrentUser,
} from "@/features/chat-page/chat-services/chat-export-service";

const toFileDate = () => new Date().toISOString().replace(/[:.]/g, "-");

export async function GET(req: Request) {
  const url = new URL(req.url);
  const chatThreadId = url.searchParams.get("chatThreadId");
  const trimmedChatThreadId = chatThreadId?.trim();

  if (chatThreadId !== null && !trimmedChatThreadId) {
    return Response.json(
      {
        message: "Invalid chatThreadId.",
      },
      { status: 400 }
    );
  }

  const response = trimmedChatThreadId
    ? await BuildSingleChatExportForCurrentUser(trimmedChatThreadId)
    : await BuildAllChatsExportForCurrentUser();

  if (response.status !== "OK") {
    const statusCode = response.status === "NOT_FOUND" ? 404 : 500;
    const message =
      response.status === "NOT_FOUND"
        ? "Chat not found."
        : "Unable to export chats.";
    return Response.json(
      {
        message,
      },
      { status: statusCode }
    );
  }

  const fileName = trimmedChatThreadId
    ? `chat-export-${trimmedChatThreadId}-${toFileDate()}.json`
    : `chat-export-all-${toFileDate()}.json`;

  return new Response(JSON.stringify(response.response, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}
