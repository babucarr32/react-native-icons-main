import { NextRequest, NextResponse } from "next/server";

import { allCssGg } from "@/_contents/css.gg";
import { allFeather } from "@/_contents/feather";
import { allBoxIcons } from "@/_contents/boxicons";
import { allTypicons } from "@/_contents/typicons";
import { allDevicons } from "@/_contents/devicons";
import { allRemixIcon } from "@/_contents/RemixIcon";
import { allHeroicons } from "@/_contents/heroicons";
import { allLucide } from "@/_contents/lucide-static";
import { allTablerIcons } from "@/_contents/tabler-icons";
import { allSimpleIcons } from "@/_contents/simple-icons";
import { allThemifyIcons } from "@/_contents/themify-icons";
import { allWeatherIcons } from "@/_contents/weather-icons";
import { allGrommetIcons } from "@/_contents/grommet-icons";
import { allVSCodeIcons } from "@/_contents/vscode-codicons";
import { allGithubOcticonsIcons } from "@/_contents/octicons";
import { allGameIcons } from "@/_contents/game-icons-inverted";
import { Icon, allCircumIcons } from "@/_contents/Circum-Icons";
import { allAntDesignIcons } from "@/_contents/ant-design-icons";
import { allFlatColorIcons } from "@/_contents/flat-color-icons";
import { allSimpleLineIcons } from "@/_contents/simple-line-icons";

const paths = {
  // googleIcons: allIcons,
  cssGGIcons: allCssGg,
  boxicons: allBoxIcons,
  typicons: allTypicons,
  devicons: allDevicons,
  lucideIcons: allLucide,
  gameIcons: allGameIcons,
  heroicons: allHeroicons,
  featherIcons: allFeather,
  remixIcons: allRemixIcon,
  simpleIcons: allSimpleIcons,
  tablerIcons: allTablerIcons,
  VSCodeIcons: allVSCodeIcons,
  circumIcons: allCircumIcons,
  themifyIcons: allThemifyIcons,
  weatherIcons: allWeatherIcons,
  grommetIcons: allGrommetIcons,
  octicons: allGithubOcticonsIcons,
  antDesignIcons: allAntDesignIcons,
  flatColorIcons: allFlatColorIcons,
  simpleLineIcons: allSimpleLineIcons,
};

const fetchIcons = async (
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

  const fetchedAll = lastPosition >= paths[path].length;

  console.log({ firstPosition, lastPosition });
  if (searchValue) {
    const filteredIcons =
      paths[path]?.filter((icon: Icon) =>
        icon.name.toLowerCase().includes(searchValue.toLowerCase())
      ) || [];
    return {
      icons: filteredIcons.slice(firstPosition, lastPosition) as any,
      fetchedAll,
    };
  }

  return path
    ? {
        icons: paths[path]?.slice(firstPosition, lastPosition) as any,
        fetchedAll,
      }
    : { icons: [], fetchIcons: true };
};

export async function POST(request: NextRequest) {
  const req = await request.json();
  const { pageParam, path, searchValue } = req;

  const { icons, fetchedAll } = await fetchIcons(pageParam, path, searchValue);

  return NextResponse.json({ icons, fetchedAll });
}
