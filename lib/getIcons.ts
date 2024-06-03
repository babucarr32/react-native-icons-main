const siteUrl =
  process.env.NODE_ENV === "production"
    ? "https://react-native-icons.vercel.app"
    : "http://localhost:3000";

export const fetchIcons = async (
  pageParam: number,
  path: any,
  searchValue: string
) => {
  const response = await fetch(`${siteUrl}/api`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pageParam,
      path,
      searchValue,
    }),
  });

  return await response.json();
};
