import EleventyPluginTailwindCSS from "eleventy-plugin-tailwindcss-4";
import Image from "@11ty/eleventy-img";

/** @param {import("@11ty/eleventy/UserConfig").default} eleventyConfig */
export default (eleventyConfig) => {

	eleventyConfig.addPlugin(EleventyPluginTailwindCSS, {
		input: "input.css"
	});

	eleventyConfig.addCollection("posts", (collection) => {
		return collection.getFilteredByGlob("src/posts/*.md").reverse();
	});


	eleventyConfig.addShortcode("myImage", async function (src, css, alt, widths = [300, 600], sizes = "") {
		let metadata = await Image(src, {
			widths: widths,
			formats: ["jpeg", "png"],
			outputDir: "dist/img/",
		});

		let data = metadata.jpeg[metadata.jpeg.length - 1];

		return `<img src="${data.url}" width="${data.width}" height="${data.height}" alt="${alt}" loading="lazy" decoding="async" class="${css}">`;
	});








	// eleventyConfig.addPassthroughCopy("src/img");

}

export const config = {
	dir: {
		input: "src",
		output: "dist",
	},
};