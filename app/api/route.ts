import { NextRequest, NextResponse } from "next/server";

import {
  allIcons,
  IconType,
  allDevicons,
  allBoxicons,
  allIonicons,
  allHeroicons,
  allGameIcons,
  allCSSGGIcons,
  allLucideIcons,
  allLineAwesomes,
  allFeatherIcons,
  allAntDesignIcons,
  allFlatColorIcons,
} from "@/.contentlayer/generated";

const paths = {
  googleIcons: allIcons,
  devicons: allDevicons,
  ionicons: allIonicons,
  boxicons: allBoxicons,
  heroicons: allHeroicons,
  gameIcons: allGameIcons,
  cssIcons: allCSSGGIcons,
  lucideIcons: allLucideIcons,
  featherIcons: allFeatherIcons,
  antDesignIcons: allAntDesignIcons,
  flatColorIcons: allFlatColorIcons,
  lineAwesomeIcons: allLineAwesomes,
};

export const fetchIcons = async (
  pageParam: number,
  path: keyof typeof paths,
  searchValue: string
) => {
  let firstPosition = 0;
  let lastPosition = 400;
  if (pageParam) {
    firstPosition = (pageParam - 1) * 50 + 400;
    lastPosition = firstPosition + 50;
  }

  console.log({ firstPosition, lastPosition });
  if (searchValue) {
    const filteredIcons =
      paths[path]?.filter((icon: IconType) =>
        icon.name.includes(searchValue)
      ) || [];
    return filteredIcons.slice(firstPosition, lastPosition) as any;
  }

  return path ? (paths[path]?.slice(firstPosition, lastPosition) as any) : [];
};

export async function POST(request: NextRequest) {
  const req = await request.json();
  const { pageParam, path, searchValue } = req;

  const result = await fetchIcons(pageParam, path, searchValue);

  return NextResponse.json(result);
}
