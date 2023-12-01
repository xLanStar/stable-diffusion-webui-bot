export const formatTime = (seconds: number) => {
  const num = Math.floor(seconds);
  return `${(Math.floor(num / 3600) % 60).toString().padStart(2, "0")}:${(
    Math.floor(num / 60) % 60
  )
    .toString()
    .padStart(2, "0")}:${(num % 60).toString().padStart(2, "0")}`;
};
