"use client";
import { RedirectToPage } from "@/features/common/navigation-helpers";
import { showError } from "@/features/globals/global-message-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/features/ui/dropdown-menu";
import { LoadingIndicator } from "@/features/ui/loading";
import { Download, MoreVertical, Trash } from "lucide-react";
import { useState } from "react";
import { DownloadChatExport } from "./chat-export-client";
import { DropdownMenuItemWithIcon } from "./chat-menu-item";
import { DeleteAllChatThreads } from "./chat-menu-service";

export const ChatContextMenu = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAll = async () => {
    if (
      window.confirm("Are you sure you want to delete all the chat threads?")
    ) {
      setIsLoading(true);
      const response = await DeleteAllChatThreads();

      if (response.status === "OK") {
        setIsLoading(false);
        RedirectToPage("chat");
      } else {
        showError(response.errors.map((e) => e.message).join(", "));
      }
    }
  };

  const handleExportAll = async () => {
    try {
      setIsLoading(true);
      await DownloadChatExport();
    } catch (error) {
      showError(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isLoading}>
        {isLoading ? (
          <LoadingIndicator isLoading={isLoading} />
        ) : (
          <MoreVertical size={18} aria-label="Chat Menu Dropdown Menu"/>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        <DropdownMenuItemWithIcon onClick={async () => await handleExportAll()}>
          <Download size={18} />
          <span>Export all</span>
        </DropdownMenuItemWithIcon>
        <DropdownMenuItemWithIcon
          onClick={async () => await handleDeleteAll()}
        >
          <Trash size={18} />
          <span>Delete all</span>
        </DropdownMenuItemWithIcon>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
