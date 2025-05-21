declare module "vite-plugin-eslint" {
  import { Plugin } from "vite";
  interface Options {
    include?: string | string[];
    exclude?: string | string[];
    eslintPath?: string;
    cache?: boolean;
  }
  export default function eslint(options?: Options): Plugin;
}
