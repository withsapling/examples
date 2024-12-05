import { defineConfig } from "unocss";
import { presetUno } from "unocss/preset-uno";
import { presetTypography } from "unocss/preset-typography";

export const config = defineConfig({
  presets: [presetUno(), presetTypography()],
});