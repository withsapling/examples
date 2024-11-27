import { defineConfig } from "npm:unocss@0.64.0/config";
import { presetUno } from "npm:unocss@0.64.0/preset-uno";
import { presetTypography } from "unocss/preset-typography";

export const config = defineConfig({
  presets: [presetUno(), presetTypography()],
});