import React from "react";
import Image from "next/image";

import { Card, CardContent, CardFooter } from "../ui/card";

function IconCard({ name, src }: { name: string; src: string }) {
  return (
    <Card className="w-[150px] sm:w-[200px] border-2 dark:bg-secondary-background rounded-lg">
      <CardContent className="h-[80px] sm:h-[90px] p-6 pb-0 justify-center flex flex-col items-center gap-2">
        <Image alt="Logo" src={src} width={50} height={50} />
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-secondary-text truncate">{name}</p>
      </CardFooter>
    </Card>
  );
}

export default IconCard;
