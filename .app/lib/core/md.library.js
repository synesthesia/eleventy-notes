const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItTaskCheckbox = require("markdown-it-task-checkbox");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItWikilinks = require("./../modules/wikilinks").markdownPlugin;
const markdownItCopyCode = require("./../modules/notes/copy-code.md-plugin");
const mathjax3 = require('markdown-it-mathjax3');  
const emoji = require('markdown-it-emoji');

/**
 * Creates a markdown-it instance.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns The configured markdown library.
 */
module.exports = (eleventyConfig) => {
  const lib = markdownIt({
    html: true,
    linkify: true,
  })
    .use(markdownItTaskCheckbox)
    .use(markdownItFootnote)
    .use(markdownItCopyCode)
    .use(markdownItWikilinks, {
      collections: "_notes",
      slugify: eleventyConfig.getFilter("slugifyPath"),
    })
    .use(markdownItAnchor, {
      slugify: eleventyConfig.getFilter("slug"),
      level: [1, 2, 3, 4],
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "anchor-link",
        symbol: `<svg width="0.8em" height="0.8em"><use xlink:href="#icon-anchor-link"></use></svg>`,
      }),
    })
    .use(mathjax3)
    .use(emoji);

  return lib;
};
