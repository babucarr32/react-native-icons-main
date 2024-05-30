"use server";
import jsx from "@svgr/plugin-jsx";
import svgo from "@svgr/plugin-svgo";
import prettier from "@svgr/plugin-prettier";
import { Config, transform } from "@svgr/core";

export const ConvertSVGToReact = async (
  svgString: string,
  options?: Config
) => {
  const jsCode = await transform(
    svgString,
    {
      plugins: [svgo, jsx, prettier],
      ...options,
    },
    {
      componentName:
        options?.exportType == "named" ? options?.namedExport : "MyComponents",
    }
  );
  return jsCode;
};

export const ConvertSVGToReactNative = async (
  svgString: string,
  options?: Config
) => {
  const jsCode = await transform(
    svgString,
    {
      plugins: [svgo, jsx, prettier],
      native: true,
      ...options,
    },
    {
      componentName:
        options?.exportType == "named" ? options?.namedExport : "MyComponents",
    }
  );
  return jsCode;
};
