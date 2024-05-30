"use client";
import React from "react";

import useQuery from "@/hooks/useQuery";

import Icon from "../homepage/icon";
import { Loader } from "lucide-react";
import { InView } from "react-intersection-observer";

function IconPage({ param }: { param: string }) {
  const { data, loading, setEntry, setInView } = useQuery(param);
  const _icons = data?.flatMap((page) => page);

  return (
    <div>
      <div className="flex flex-wrap gap-5 justify-center mt-5">
        {_icons.length
          ? (_icons as any)?.map((icon: any, index: any) => (
              <InView
                as="div"
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
      {loading ? (
        <div className="mt-5 w-fit mx-auto animate animate-spin">
          <Loader />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default IconPage;
