import React, { useCallback, useState } from "react";

import { useAtomValue } from "jotai";

import { cn } from "@/lib/utils";
import { ConvertSVGToReactNative } from "./lib";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { Icons } from "@/.contentlayer/generated";

import {
  jotaiOptions,
  jotaiSvgProps,
  jotaiConfigFile,
  jotaiNamedExport,
  jotaiPrettierConfig,
  jotaiReplaceAttrValues,
  currentColorAtom,
} from "../icon-page/side-menu";

export type IconType = {
  snippet: Icons & {
    stroke: boolean;
    colored: boolean;
    setSize: boolean;
    strokeAndFill: boolean;
    pathColor: boolean;
  };
};

function ErrorDialog({
  open,
  error,
  setOpen,
}: {
  error: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-500 dark:text-red-500">
            Ohh ow, something went wrong.
          </DialogTitle>{" "}
        </DialogHeader>
        <p className="text-red-500 dark:text-red-500">{error}</p>
      </DialogContent>
    </Dialog>
  );
}

function Icon({ snippet }: IconType) {
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const configOptions = useAtomValue(jotaiOptions);
  const svgPropsValue = useAtomValue(jotaiSvgProps);
  const namedExport = useAtomValue(jotaiNamedExport);
  const configFileValue = useAtomValue(jotaiConfigFile);
  const prettierConfigValue = useAtomValue(jotaiPrettierConfig);
  const replaceAttrValuesValue = useAtomValue(jotaiReplaceAttrValues);
  const currentColor = useAtomValue(currentColorAtom);

  const [copying, setCopying] = useState<number>(0);

  const stringified = JSON.stringify(snippet.body.raw);
  const codeString = JSON.parse(stringified).replaceAll("`", "");

  const onCopy = useCallback(async () => {
    try {
      const configFile = JSON.parse(configFileValue);
      const replaceAttrValues = replaceAttrValuesValue
        ? JSON.parse(replaceAttrValuesValue)
        : [];
      console.log(replaceAttrValues);

      const svgProps = svgPropsValue ? JSON.parse(svgPropsValue) : [];

      const prettierConfig = prettierConfigValue
        ? JSON.parse(prettierConfigValue)
        : null;

      const overrideConfig = {
        ...configOptions,
        svgProps,
        configFile,
        namedExport,
        prettierConfig,
        replaceAttrValues,
      };

      const reactComponent = await ConvertSVGToReactNative(
        codeString,
        overrideConfig
      );

      await navigator.clipboard.writeText(reactComponent);

      setCopying((c) => c + 1);
      setTimeout(() => {
        setCopying((c) => c - 1);
      }, 2000);
    } catch (err: any) {
      setOpen(true);
      setError(`Failed to copy text: ${err.message}`);
    }
  }, [
    namedExport,
    configOptions,
    svgPropsValue,
    configFileValue,
    prettierConfigValue,
    replaceAttrValuesValue,
  ]);

  return (
    <>
      <ErrorDialog error={error} open={open} setOpen={setOpen} />
      <div
        style={{ color: currentColor }}
        onClick={onCopy}
        className={cn(
          "h-[50px] [&>div>svg]:size-[24px] w-[50px] bg-zinc-200 dark:bg-secondary-background relative cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-900 rounded-lg flex justify-center items-center",
          currentColor === "currentColor" && "!fill-zinc-950 dark:!fill-white"
        )}
      >
        {copying ? (
          <span className="text-sm absolute -top-5 text-amber-500">copied</span>
        ) : (
          ""
        )}
        <div dangerouslySetInnerHTML={{ __html: codeString }} />
      </div>
    </>
  );
}

export default Icon;
