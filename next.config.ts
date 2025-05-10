import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import rehypePrettyCode, { Options } from "rehype-pretty-code";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
  transpilePackages: ["next-mdx-remote"],
};

const options: Options = {
  theme: "nord",
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
});
export default withMDX(nextConfig);
