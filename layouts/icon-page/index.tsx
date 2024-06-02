import React from "react";
import { useParams } from "next/navigation";

import { Github } from "lucide-react";

import useQuery from "@/hooks/useQuery";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function IconPage() {
  const param = useParams<{ slug: string }>();
  const { handleSearch } = useQuery(param.slug);

  return (
    <div
      style={{ position: "fixed", top: 90, zIndex: 40 }}
      className="backdrop-blur z-0 w-[calc(100vw-300px)]"
    >
      <form
        className="pt-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch((e as any).target["search"].value);
        }}
      >
        <div className="flex gap-2">
          <Input
            id="search"
            placeholder="Search icon..."
            className="w-full h-[50px] border-2 rounded-lg dark:bg-secondary-background"
          />
          <Button
            variant={"outline"}
            className="border-2 h-[50px] rounded-lg dark:bg-secondary-background"
          >
            Licence
          </Button>
          <Button
            // size="icon"
            variant={"outline"}
            className="border-2 h-[50px] w-[50px] rounded-lg dark:bg-secondary-background"
          >
            <Github className="size-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default IconPage;
