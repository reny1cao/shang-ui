export const TIME_RANGES = [
  { label: "1 Week", value: "1W", days: 7 },
  { label: "1 Month", value: "1M", days: 30 },
  { label: "3 Months", value: "3M", days: 90 },
  { label: "6 Months", value: "6M", days: 180 },
  { label: "1 Year", value: "1Y", days: 365 },
  { label: "2 Years", value: "2Y", days: 730 },
] as const;

export const PREDICTION_RANGES = [
  { label: "1 Week", value: "1W", days: 7 },
  { label: "2 Weeks", value: "2W", days: 14 },
  { label: "1 Month", value: "1M", days: 30 },
  { label: "3 Months", value: "3M", days: 90 },
  { label: "6 Months", value: "6M", days: 180 },
] as const;

export const POPULAR_STOCKS = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"] as const;

export const STORAGE_KEYS = {
  BOOKMARKS: "stockBookmarks",
} as const;