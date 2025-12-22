export function msUntilNextMinute(targetMinutes: number[]) {
  const now = new Date();

  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();
  const currentMs = now.getMilliseconds();

  // Find the next target minute
  let nextMinute = targetMinutes.find(m => m > currentMinute);

  // If none left, wrap to next hour
  if (nextMinute === undefined) {
    nextMinute = targetMinutes[0];
    now.setHours(now.getHours() + 1);
  }

  const next = new Date(now);
  next.setMinutes(nextMinute, 0, 0);

  return next.getTime() - Date.now();
}

export function formatTimeMinsHours(timestamp: Date) {
  const hrs = timestamp.getHours()
  const min = timestamp.getMinutes()

  const calcHours = hrs > 12 ? hrs - 12 : hrs
  const calcMins = min === 0 ? "00" : min
  const suffix = hrs > 12 ? "PM" : "AM"

  return `${calcHours === 0 ? 12 : calcHours}:${calcMins} ${suffix}`
}