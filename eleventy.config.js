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

	eleventyConfig.addShortcode("myImage", async function (src, options = {}) {

		let {
			css,
			alt,
			widths = [300, 600], // can set sensible defaults 
			sizes = "(max-width: 600px) 100vw, 600px", 
			srcDir = "./src",
			outputDir = this.page.url
		} = options;
		console.log("page: ", alt)
		let sourceImagePath = `${srcDir}${src}`;

		let metadata = await Image(sourceImagePath, {
			widths: widths,
			formats: ["jpeg", "png"],
			outputDir: `dist${outputDir}`,
			urlPath: ""
		});

		let data = metadata.jpeg[metadata.jpeg.length - 1];

		return `<img src="${outputDir}${data.url}" width="${data.width}" height="${data.height}" alt="${alt}" loading="lazy" decoding="async" class="${css}">`;
	});

}

export const config = {
	dir: {
		input: "src",
		output: "dist",
	},
};