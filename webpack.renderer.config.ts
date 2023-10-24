import type { Configuration } from "webpack"

import { rules } from "./webpack.rules"
import { plugins } from "./webpack.plugins"

rules.push(
    /** CSS modules */
    {
        test: /\.css$/,
        use: [
            {
                loader: "style-loader",
                options: {
                    injectType: "styleTag",
                },
            },
            {
                loader: "css-loader",
                options: {
                    modules: true,
                },
            },
        ],
    },
    /** Images assets */
    {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset",
        generator: {
            filename: "img/[name].[hash][ext][query]",
        },
    },
    /** Fonts assets */
    {
        test: /\.(eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset/resource",
        generator: {
            filename: "fnt/[name].[hash][ext][query]",
        },
    }
)

export const rendererConfig: Configuration = {
    devServer: {
        port: 3002,
    },
    module: { rules },
    plugins,
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    },
}
