import * as sass from "sass"; // Changed from 'import sass'
import path from "path";

export default function (eleventyConfig) {
  eleventyConfig.addTemplateFormats("scss");

  eleventyConfig.addExtension("scss", {
      outputFileExtension: "css",
      compile: async function(inputContent, inputPath) {
        let parsed = path.parse(inputPath);
        
        // Skip files that start with an underscore (like _variables.scss)
        if (parsed.name.startsWith("_")) return;

        // Use sass.compile for better dependency tracking
        return async (data) => {
          let result = sass.compile(inputPath, {
            loadPaths: [parsed.dir || "."],
            style: "expanded"
          });
          return result.css;
        };
      }
    });

  // Watchers (Everything Eleventy should keep an eye on)
  eleventyConfig.addWatchTarget("./src/_data/");
  eleventyConfig.addWatchTarget("./src/scss/");

  // Passthroughs (Moving static assets)
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/favicon.svg");
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/apple-touch-icon.png");

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
}