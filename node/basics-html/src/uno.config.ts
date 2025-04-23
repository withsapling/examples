import { defineConfig } from "unocss";
import { presetWind3 } from "unocss/preset-wind3";
import { presetTypography } from "unocss/preset-typography";

export const config = defineConfig({
  presets: [presetWind3(), presetTypography()],
});
