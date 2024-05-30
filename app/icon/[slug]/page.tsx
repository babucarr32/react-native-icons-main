import React from "react";

import IconPage from "@/components/icon-page";

function Page({ params }: { params: { slug: string } }) {
  return <IconPage param={params.slug} />;
}

export default Page;
