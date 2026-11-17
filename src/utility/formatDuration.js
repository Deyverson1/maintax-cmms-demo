export function formatDuration(hours) {
  if (!hours || hours <= 0) return null;
  const days = Math.floor(hours / 24);
  const remainingHours = Math.floor(hours % 24);
  const minutes = Math.round((hours % 1) * 60);

  if (days > 0) return `${days}d ${remainingHours}h`;
  if (hours < 1) return `${minutes}m`;
  return `${Math.floor(hours)}h ${minutes}m`;
};