import React from "react";

import useQuery from "@/hooks/useQuery";
import { useParams } from "next/navigation";

import { Input } from "@/components/ui/input";

function IconPage() {
  const param = useParams<{ slug: string }>();
  const { handleSearch } = useQuery(param.slug);

  return (
    <div className="backdrop-blur h-20 sticky top-16 z-40 w-full">
      <form
        className="pt-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch((e as any).target["search"].value);
        }}
      >
        <Input
          id="search"
          placeholder="Search icon..."
          className="w-full h-[50px] border-2 rounded-lg dark:bg-secondary-background"
        />
      </form>
    </div>
  );
}

export default IconPage;
