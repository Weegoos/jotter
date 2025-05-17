export function useDateFormat() {
  function formatDate(isoString, locale = "en-GB", options = {}) {
    if (!isoString) return "Invalid Date";

    const date = new Date(isoString);
    if (isNaN(date)) return "Invalid Date";

    const defaultOptions = {
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    return date
      .toLocaleString(locale, { ...defaultOptions, ...options })
      .replace(",", "");
  }

  return { formatDate };
}
