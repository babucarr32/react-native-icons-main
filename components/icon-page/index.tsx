"use client";
import React from "react";

import useQuery from "@/hooks/useQuery";

import Icon from "../homepage/icon";
import { Loader } from "lucide-react";
import { InView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

function IconPage({ param }: { param: string }) {
  const { data, loading, isFirstLoad, setEntry, setInView } = useQuery(param);
  const _icons = data?.flatMap((page) => page);

  return (
    <div>
      <div className="flex flex-wrap gap-5 justify-center mt-[100px]">
        {_icons.length
          ? (_icons as any)?.map((icon: any, index: any) => (
              <InView
                as="div"
                key={index}
                onChange={(inView, entry) => {
                  setInView(inView);
                  setEntry(entry);
                }}
              >
                <Icon snippet={icon as any} />
              </InView>
            ))
          : ""}
      </div>
      {isFirstLoad || loading ? (
        <div
          className={cn(
            "mt-5 w-fit mx-auto animate animate-spin",
            isFirstLoad && ""
          )}
        >
          <Loader />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default IconPage;
