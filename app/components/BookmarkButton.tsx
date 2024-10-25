"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBookmarks } from "../hooks/useBookmarks";

interface BookmarkButtonProps {
  stockSymbol: string;
  onSelectStock: (symbol: string) => void;
}

export default function BookmarkButton({ stockSymbol, onSelectStock }: BookmarkButtonProps) {
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={isBookmarked(stockSymbol) ? "text-yellow-500" : ""}
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5 text-sm font-semibold">Bookmarked Stocks</div>
        <DropdownMenuSeparator />
        {bookmarks.length === 0 ? (
          <div className="px-2 py-4 text-center text-sm text-muted-foreground">
            No bookmarks yet
          </div>
        ) : (
          bookmarks.map((symbol) => (
            <DropdownMenuItem
              key={symbol}
              onClick={() => onSelectStock(symbol)}
              className="justify-between"
            >
              {symbol}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeBookmark(symbol);
                }}
                className="h-6 w-6 p-0 hover:text-destructive"
              >
                ×
              </Button>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            if (isBookmarked(stockSymbol)) {
              removeBookmark(stockSymbol);
            } else {
              addBookmark(stockSymbol);
            }
          }}
        >
          {isBookmarked(stockSymbol) ? "Remove Current" : "Add Current"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}