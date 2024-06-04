"use client";
import React, { useEffect } from "react";

import { Config } from "@svgr/core";
import { atom, useAtom, useSetAtom } from "jotai";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

import { JSXRuntime, expandProps, exportType, globalOptions } from "./data";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export const currentColorAtom = atom("currentColor");
export const jotaiSvgProps = atom(`{
  "width": 24,
  "height": 24
}`);
export const jotaiReplaceAttrValues = atom(`{
  "currentColor": '#000'
}`);
export const jotaiNamedExport = atom("ReactComponent");
export const jotaiPrettierConfig = atom(`{
  "semi": false
}`);
export const jotaiConfigFile = atom(`{
  "plugins": [
    {
      "name": "preset-default",
      "params": {
        "overrides": {
          "removeTitle": false
        }
      }
    }
  ]
}`);

export const jotaiOptions = atom<Config>({
  svgo: true,
  ref: false,
  icon: false,
  memo: false,
  prettier: true,
  descProp: false,
  titleProp: false,
  dimensions: false,
  typescript: false,
  expandProps: "end",
  exportType: "default",
  jsxRuntime: "classic",
  svgoConfig: null as any,
});

function CheckboxOption({ label, text }: { text: string; label: string }) {
  const setOptionConfig = useSetAtom(jotaiOptions);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        onCheckedChange={(value) => {
          setOptionConfig((prev) => ({ ...prev, [label]: value }));
        }}
        className="border"
        id={label}
      />
      <label
        htmlFor={label}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-700 dark:text-zinc-200"
      >
        {text}
      </label>
    </div>
  );
}

function RadioGroupOption({
  data,
  configName,
  defaultValue,
}: {
  configName: string;
  defaultValue: string;
  data: { name: string; id: string }[];
}) {
  const setOptionConfig = useSetAtom(jotaiOptions);

  return (
    <RadioGroup
      defaultValue={defaultValue}
      onValueChange={(value) =>
        setOptionConfig((prev) => ({ ...prev, [configName]: value }))
      }
    >
      {data.map(({ id, name }) => (
        <div key={id} className="flex items-center space-x-2">
          <RadioGroupItem value={id} id={id} />
          <Label htmlFor={id}>{name}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function OptionAccordion() {
  const [replaceAttrValues, setReplaceAttrValues] = useAtom(
    jotaiReplaceAttrValues
  );
  const [svgProps, setSvgProps] = useAtom(jotaiSvgProps);
  const [namedExport, setNamedExport] = useAtom(jotaiNamedExport);
  const [prettierConfig, setPrettierConfig] = useAtom(jotaiPrettierConfig);
  const [configFile, setConfigFile] = useAtom(jotaiConfigFile);
  const [currentColor, setCurrentColor] = useAtom(currentColorAtom);

  useEffect(() => {
    const handleSetAttributeColor = () => {
      if (currentColor !== "currentColor") {
        setReplaceAttrValues(`{
  "currentColor": "${currentColor}"
}`);
      }
    };
    handleSetAttributeColor();
  }, [currentColor]);

  return (
    <Accordion
      type="single"
      className="w-full pb-10"
      defaultValue={"global"}
      onValueChange={(value) => console.log(value)}
    >
      <AccordionItem value="global">
        <AccordionTrigger>Global</AccordionTrigger>
        <AccordionContent className="m-2">
          <div className="space-y-2">
            {globalOptions.map(({ label, name }) => (
              <CheckboxOption key={label} label={label} text={name} />
            ))}
          </div>

          <div className="my-4">
            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-200">
              Expand Props
            </label>
          </div>
          <div className="space-y-2">
            <RadioGroupOption
              defaultValue="end"
              data={expandProps}
              configName="expandProps"
            />
          </div>

          <div className="my-4">
            <label
              htmlFor="attributeValue"
              className="text-sm font-bold text-zinc-700 dark:text-zinc-200"
            >
              Replace Attribute Value
            </label>
            <div className="relative">
              <div className="w-full h-14 rounded-lg border flex items-center gap-3 px-4 justify-between mt-2">
                <p>currentColor: {currentColor}</p>
                <label
                  style={{ background: currentColor }}
                  htmlFor="colorPicker"
                  className={cn(
                    "w-6 h-6 rounded-full cursor-pointer border top-3 right-3",
                    currentColor === "currentColor" && "bg-black dark:bg-white"
                  )}
                />
              </div>
              <Textarea
                id="attributeValue"
                className="h-20 mt-2"
                placeholder={`{
  "currentColor": '#000'
}`}
                value={replaceAttrValues}
                onChange={(e) => {
                  setReplaceAttrValues(e.target.value as any);
                }}
              />
              <Input
                id="colorPicker"
                type="color"
                className="hidden"
                onChange={(e) => setCurrentColor(e.target.value)}
              />
            </div>
          </div>

          <div className="my-4">
            <label
              htmlFor="svgProps"
              className="text-sm font-bold text-zinc-700 dark:text-zinc-200"
            >
              SVG Props
            </label>
            <Textarea
              id="svgProps"
              className="h-20 mt-2"
              value={svgProps}
              onChange={(e) => {
                setSvgProps(e.target.value);
              }}
              placeholder={`{
  "focusable": "{true}"
}`}
            />
          </div>

          <div className="my-4">
            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-200">
              Export Type
            </label>
          </div>
          <div className="space-y-2">
            <RadioGroupOption
              data={exportType}
              configName="exportType"
              defaultValue="default"
            />
          </div>

          <div className="my-4">
            <label
              htmlFor="namedExport"
              className="text-sm font-bold text-zinc-700 dark:text-zinc-200"
            >
              Named Export
            </label>
            <Textarea
              id="namedExport"
              className="h-20 mt-2"
              value={namedExport}
              onChange={(e) => setNamedExport(e.target.value)}
            />
          </div>

          <div className="my-4">
            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-200">
              JSX Runtime
            </label>
          </div>
          <div className="space-y-2">
            <RadioGroupOption
              data={JSXRuntime}
              defaultValue="classic"
              configName="jsxRuntime"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="svgo">
        <AccordionTrigger>SVGO</AccordionTrigger>
        <AccordionContent className="m-2">
          <CheckboxOption label="svgo" text="Enable" />

          <div className="my-4">
            <label htmlFor="config" className="text-sm font-bold">
              Config
            </label>
            <Textarea
              id="config"
              className="h-20 mt-2"
              value={configFile}
              onChange={(e) => setConfigFile(e.target.value)}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="prettier">
        <AccordionTrigger>Prettier</AccordionTrigger>
        <AccordionContent className="m-2">
          <CheckboxOption label="prettier" text="Enable" />

          <div className="my-4">
            <label
              htmlFor="prettierConfig"
              className="text-sm font-bold text-zinc-700 dark:text-zinc-200"
            >
              Config
            </label>
            <Textarea
              id="prettierConfig"
              className="h-20 mt-2"
              value={prettierConfig}
              onChange={(e) => setPrettierConfig(e.target.value)}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function SideMenu() {
  return (
    <ScrollArea className="w-[300px] h-dvh sm:border-r-2 sm:p-4 shrink-0">
      <OptionAccordion />
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}

export default SideMenu;
