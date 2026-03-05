"use client";

const extractFileName = (contentDisposition: string | null): string | null => {
  if (!contentDisposition) {
    return null;
  }

  const match = /filename="([^"]+)"/.exec(contentDisposition);
  return match?.[1] || null;
};

export const DownloadChatExport = async (props?: { chatThreadId?: string }) => {
  const params = new URLSearchParams();
  if (props?.chatThreadId) {
    params.set("chatThreadId", props.chatThreadId);
  }

  const query = params.toString();
  const url = `/api/chat/export${query ? `?${query}` : ""}`;
  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    let errorMessage = "Unable to export chats.";
    try {
      const body = await response.json();
      errorMessage = body.message || errorMessage;
    } catch {
      // Ignore parse failures and return fallback message.
    }
    throw new Error(errorMessage);
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const fileName =
    extractFileName(response.headers.get("content-disposition")) ||
    "chat-export.json";

  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
};
