"use client";
import React from "react";

import IconPage from "@/layouts/icon-page";
import SideMenu from "@/components/icon-page/side-menu";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-5 xl:gap-10">
      <div className="shrink-0 fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] md:sticky md:block">
        <SideMenu />
      </div>
      <div className="w-full max-w-[1300px] px-4 lg:pr-10 relative">
        <IconPage />
        {children}
      </div>
    </div>
  );
}

export default Layout;
