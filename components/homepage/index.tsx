"use client";
import React from "react";

import Link from "next/link";
import IconCard from "./icon-card";
import { icons } from "../../script/icons";
import Balancer from "react-wrap-balancer";

function Homepage() {
  return (
    <div className="max-w-[1350px] mx-auto px-4">
      <p className="text-[25px] sm:text-[50px] lg:text-[70px] font-bold text-center mt-5 md:mt-10 bg-gradient-to-r from-amber-500 to-amber-900 bg-clip-text text-transparent">
        ReactNativeIcons
      </p>

      <div className="text-center max-w-lg mx-auto px-4">
        <Balancer className="text-secondary-text">
          A vast collection of thousands of high-quality icon components sourced from your
          favorite icon libraries. Perfectly suited for all your React Native
          projects.
        </Balancer>
      </div>

      <div className="flex flex-wrap gap-5 justify-center mt-5 md:mt-10 lg:mt-14 max-w-[1300px] mx-auto">
        {icons.map(({ logo, name, path }, index) => (
          <Link target="_blank" key={index} href={`/icon/${path}`}>
            <IconCard src={logo} name={name} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
