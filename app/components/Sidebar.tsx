"use client";

import { useBookmarks } from "../hooks/useBookmarks";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bookmark, Star, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onSelectStock: (symbol: string) => void;
  currentStock: string;
}

export default function Sidebar({ onSelectStock, currentStock }: SidebarProps) {
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2 mb-2">
          <Bookmark className="w-5 h-5" />
          <h2 className="font-semibold">Bookmarked Stocks</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            if (isBookmarked(currentStock)) {
              removeBookmark(currentStock);
            } else {
              addBookmark(currentStock);
            }
          }}
        >
          {isBookmarked(currentStock) ? (
            <>
              <Trash2 className="w-4 h-4 mr-2" />
              Remove Current
            </>
          ) : (
            <>
              <Star className="w-4 h-4 mr-2" />
              Add Current
            </>
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          {bookmarks.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground p-4">
              No bookmarks yet
            </div>
          ) : (
            <div className="space-y-2">
              {bookmarks.map((symbol) => (
                <Button
                  key={symbol}
                  variant="ghost"
                  className={cn(
                    "w-full justify-between",
                    symbol === currentStock && "bg-accent"
                  )}
                  onClick={() => onSelectStock(symbol)}
                >
                  {symbol}
                  <Trash2
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeBookmark(symbol);
                    }}
                  />
                </Button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="text-xs text-muted-foreground">
          Popular Stocks
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"].map((symbol) => (
            <Button
              key={symbol}
              variant="secondary"
              size="sm"
              onClick={() => onSelectStock(symbol)}
            >
              {symbol}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}