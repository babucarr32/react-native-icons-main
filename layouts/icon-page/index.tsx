import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Github } from "lucide-react";

import useQuery from "@/hooks/useQuery";

import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";

import { icons } from "@/script/icons";

function IconPage() {
  const param = useParams<{ slug: string }>();
  const { handleSearch, debounceSearch, searchInputRef } = useQuery(param.slug);
  const result = useMemo(() => {
    return icons.find(({ path }) => path === param.slug);
  }, []);

  return (
    <div className="backdrop-blur fixed z-40 w-[calc(100vw-32px)] md:w-[calc(100vw-300px-45px)] lg:w-[calc(100vw-300px-95px)] 2xl:max-w-[1235px]">
      <div
        className="py-4"
        
      >
        <div className="flex gap-2">
          <Input
            id="search"
            ref={searchInputRef}
            onChange={debounceSearch}
            placeholder="Search icon..."
            className="w-full h-[50px] border-2 rounded-lg dark:bg-secondary-background"
          />
          <Link
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-2 h-[50px] rounded-lg dark:bg-secondary-background"
            )}
            target="_blank"
            href={result?.license!}
          >
            Licence
          </Link>
          <Link
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-2  h-[50px] w-[50px] rounded-lg dark:bg-secondary-background"
            )}
            target="_blank"
            href={result?.source.url!}
          >
            <Github className="size-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IconPage;
