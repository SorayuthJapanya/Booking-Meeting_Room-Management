export const timeFormat = (data: string) => {
  const isoString = data;
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const dateFormat = (data: string) => {
  const date = new Date(data);
  const formatted = date.toLocaleDateString("en-GB");
  return formatted;
};
