"use client";

import { showError } from "@/features/globals/global-message-store";
import { Button } from "@/features/ui/button";
import { Download, Loader } from "lucide-react";
import { useState } from "react";
import { DownloadChatExport } from "../chat-menu/chat-export-client";

export const ExportChatButton = (props: { chatThreadId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isLoading}
      onClick={async () => {
        try {
          setIsLoading(true);
          await DownloadChatExport({ chatThreadId: props.chatThreadId });
        } catch (error) {
          showError(`${error}`);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      {isLoading ? (
        <Loader size={16} className="animate-spin" />
      ) : (
        <Download size={16} />
      )}
      <span className="ml-2">Export chat</span>
    </Button>
  );
};
