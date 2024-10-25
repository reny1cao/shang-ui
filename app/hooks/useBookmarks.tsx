"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "stockBookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, []);

  const addBookmark = (symbol: string) => {
    const newBookmarks = [...new Set([...bookmarks, symbol])];
    setBookmarks(newBookmarks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
  };

  const removeBookmark = (symbol: string) => {
    const newBookmarks = bookmarks.filter((b) => b !== symbol);
    setBookmarks(newBookmarks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
  };

  const isBookmarked = (symbol: string) => bookmarks.includes(symbol);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
  };
}