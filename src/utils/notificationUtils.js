/**
 * Utility functions for SBTET notifications and circulars.
 */

export function parseNotificationDate(val) {
  if (!val) return null;
  if (typeof val === "number") return new Date(val);
  if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
  const str = String(val).trim();
  if (!str) return null;

  const aspMatch = str.match(/\/Date\((\d+)\)\//);
  if (aspMatch) {
    const d = new Date(parseInt(aspMatch[1], 10));
    return isNaN(d.getTime()) ? null : d;
  }

  // Handle DD-MM-YYYY or DD/MM/YYYY
  const ddmmyyyy = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})(.*)$/);
  if (ddmmyyyy) {
    const p1 = parseInt(ddmmyyyy[1], 10);
    const p2 = parseInt(ddmmyyyy[2], 10);
    const year = parseInt(ddmmyyyy[3], 10);

    // Standard DD-MM-YYYY
    const d1 = new Date(year, p2 - 1, p1);
    const now = new Date();
    // If d1 is far in the future (> now + 1 day) and p1 <= 12, check if MM-DD-YYYY resolves an inverted date
    if (d1.getTime() > now.getTime() + 86400000 && p1 <= 12) {
      const d2 = new Date(year, p1 - 1, p2);
      if (!isNaN(d2.getTime()) && d2.getTime() <= now.getTime() + 86400000) {
        return d2;
      }
    }
    if (!isNaN(d1.getTime())) return d1;
  }

  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    const now = new Date();
    // If date string is far in the future (> now + 1 day), check if day and month were swapped (e.g. 2026-12-10 for Oct 12)
    if (d.getTime() > now.getTime() + 86400000) {
      const day = d.getDate();
      const month = d.getMonth();
      const year = d.getFullYear();
      if (day <= 12) {
        const swapped = new Date(year, day - 1, month + 1);
        if (!isNaN(swapped.getTime()) && swapped.getTime() <= now.getTime() + 86400000) {
          return swapped;
        }
      }
    }
    return d;
  }
  return null;
}

export function getNotificationPublishDate(itemOrDate) {
  if (!itemOrDate) return null;
  if (itemOrDate instanceof Date || typeof itemOrDate === "number" || typeof itemOrDate === "string") {
    return parseNotificationDate(itemOrDate);
  }

  // timeStamp is the authoritative arrival/publication timestamp recorded by the system
  const ts = parseNotificationDate(itemOrDate.timeStamp || itemOrDate.timestamp);
  const nd = parseNotificationDate(
    itemOrDate.NotificationDate || itemOrDate.date || itemOrDate.createdAt || itemOrDate.created_at
  );

  const now = new Date();
  if (ts && !isNaN(ts.getTime()) && ts.getTime() <= now.getTime() + 86400000) {
    return ts;
  }

  if (nd && !isNaN(nd.getTime())) {
    return nd;
  }

  return ts || null;
}

/**
 * Checks if a notification was published within the last 5 to 6 calendar days.
 * E.g., if published on 10th Oct, shows through 16th Oct.
 *
 * @param {Object|string|Date|number} itemOrDate - The notification item or date
 * @param {number} maxDays - Max elapsed days to consider recent (default: 6)
 * @returns {boolean} - True if published within the threshold
 */
export function isRecentNotification(itemOrDate, maxDays = 6) {
  const pubDate = getNotificationPublishDate(itemOrDate);
  if (!pubDate || isNaN(pubDate.getTime())) return false;

  const now = new Date();
  const pubMidnight = new Date(pubDate.getFullYear(), pubDate.getMonth(), pubDate.getDate()).getTime();
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const diffDays = Math.floor((nowMidnight - pubMidnight) / (24 * 60 * 60 * 1000));
  return diffDays >= -1 && diffDays <= maxDays;
}
