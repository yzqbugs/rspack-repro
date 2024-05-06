import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/index.ts",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  // externalsType: "window",
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  module: {
    rules: [
      isRunningWebpack
        ? {
            test: /\.tsx?$/,
            exclude: /(node_modules)/,
            use: {
              loader: "swc-loader",
              options: {
                jsc: {
                  parser: {
                    syntax: "typescript",
                  },
                },
              },
            },
          }
        : {
            test: /\.(jsx?|tsx?)$/,
            use: [
              {
                loader: "builtin:swc-loader",
                options: {
                  sourceMap: true,
                  jsc: {
                    parser: {
                      syntax: "typescript",
                      tsx: true,
                    },
                    transform: {
                      react: {
                        runtime: "automatic",
                        development: false,
                        refresh: false,
                      },
                    },
                  },
                  env: {
                    targets: [
                      "chrome >= 87",
                      "edge >= 88",
                      "firefox >= 78",
                      "safari >= 14",
                    ],
                  },
                },
              },
            ],
          },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
  experiments: {
    css: false,
  },
};

export default config;
