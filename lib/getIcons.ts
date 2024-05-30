// "use server";
// import {
// allGameIcons,
// allIcons,
// allAntDesignIcons,
// allCSSGGIcons,
// allDevicons,
// allIonicons,
// allHeroicons,
// allBoxicons,
// allLucideIcons,
// allLineAwesomes,
// allFeatherIcons,
// allFlatColorIcons,
// IconType,
// } from "@/.contentlayer/generated";

// const paths = {
// gameIcons: allGameIcons,
// lucideIcons: allLucideIcons,
// googleIcons: allIcons,
// antDesignIcons: allAntDesignIcons,
// cssIcons: allCSSGGIcons,
// devicons: allDevicons,
// featherIcons: allFeatherIcons,
// flatColorIcons: allFlatColorIcons,
// ionicons: allIonicons,
// lineAwesomeIcons: allLineAwesomes,
// boxicons: allBoxicons,
// heroicons: allHeroicons,
// };
const { signal } = new AbortController();

const siteUrl =
  process.env.NODE_ENV === "production"
    ? "https://linkblink.vercel.app"
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
    signal,
  });

  return await response.json();
  // let firstPosition = 0;
  // let lastPosition = 50;
  // if (pageParam) {
  //   firstPosition = pageParam * 50 + 50;
  //   lastPosition = firstPosition + 50;
  // }

  // if (searchValue) {
  //   const filteredIcons =
  //     (paths["devicons"]
  //       ?.filter((icon: IconType) => {
  //         console.log(icon.name.includes(searchValue));
  //         return icon.name.includes(searchValue);
  //       })
  //       .slice(firstPosition, lastPosition) as any) || [];
  //   console.log(filteredIcons, searchValue);
  //   // return filteredIcons;
  // }

  // return path
  //   ? (paths["devicons"]?.slice(firstPosition, lastPosition) as any)
  //   : [];
};
