export function checkInactivity(lastActivity: Date, thresholdMinutes: number) {
  const now = new Date();
  const diff = (now.getTime() - lastActivity.getTime()) / (1000 * 60);
  return diff > thresholdMinutes;
}
