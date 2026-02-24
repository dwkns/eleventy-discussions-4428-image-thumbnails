import EleventyPluginTailwindCSS from "eleventy-plugin-tailwindcss-4";

/** @param {import("@11ty/eleventy/UserConfig").default} eleventyConfig */
export default (eleventyConfig) => {

  eleventyConfig.addPlugin(EleventyPluginTailwindCSS, {
    input: "input.css"
  });

  eleventyConfig.addCollection("posts", (collection) => {
    return collection.getFilteredByGlob("src/posts/*.md").reverse();
  });

  eleventyConfig.addShortcode("myImage", (image, css, alt ) => {
    // do you actual image processing here, and return whatever HTML you want. This is just a placeholder.
    return `<img src="${image}" class="${css}" alt="${alt}">`;
  });
    


  eleventyConfig.addPassthroughCopy("src/img");

}

export const config = {
  dir: {
    input: "src",
    output: "dist",
  },
};