"use client";
import React from "react";

import Link from "next/link";
import IconCard from "./icon-card";
import { Icons } from "@/lib/icons";
import Balancer from "react-wrap-balancer";

function Homepage() {
  return (
    <div className="max-w-[1350px] mx-auto">
      <p className="text-[25px] sm:text-[50px] lg:text-[70px] font-bold text-center mt-5 md:mt-10 bg-gradient-to-r from-amber-500 to-amber-900 bg-clip-text text-transparent">
        ReactNativeIcons
      </p>

      <div className="text-center max-w-lg mx-auto">
        <Balancer className="text-secondary-text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Balancer>
      </div>

      <div className="flex flex-wrap gap-5 justify-center mt-5 md:mt-10 lg:mt-20">
        {Icons.map(({ logo, name, path }, index) => (
          <Link target="_blank" key={index} href={`/icon/${path}`}>
            <IconCard src={logo} name={name} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
