const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Plugin to simplify creation of HTML files
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // Plugin to visualize size of webpack output files

module.exports = {
    // Set the mode to development for better debugging and readable output
    mode: "development",

    // Entry point for the application
    entry: {
        bundle: path.resolve(__dirname, "src/index.js"),
    },

    // Output configuration
    output: {
        // Directory to output the bundled files
        path: path.resolve(__dirname, "dist"),
        // Output filename pattern, using content hash for cache busting
        filename: "[name][contenthash].js",
        // Clean the output directory before each build
        clean: true,
        // Custom filename pattern for asset modules
        assetModuleFilename: "[name][ext]"
    },

    // Source map configuration for debugging
    devtool: "source-map",

    // Development server configuration
    devServer: {
        // Directory to serve static files from
        static: {
            directory: path.resolve(__dirname, "dist")
        },
        // Port to run the development server
        port: 3000,
        // Automatically open the browser after server starts
        open: true,
        // Enable hot module replacement
        hot: true,
        // Enable gzip compression
        compress: true,
        // Fallback to index.html for single page applications
        historyApiFallback: true,
    },

    // Module rules for different file types
    module: {
        rules: [
            {
                // Rule for processing SCSS files
                test: /\.scss$/,
                use: [
                    "style-loader", // Injects CSS into the DOM
                    "css-loader", // Translates CSS into CommonJS
                    "sass-loader", // Compiles Sass to CSS
                ]
            },
            {
                // Rule for processing JavaScript files
                test: /\.js$/,
                exclude: /node_modules/, // Exclude node_modules directory
                use: {
                    loader: "babel-loader", // Transpiles ES6+ code to ES5
                    options: {
                        presets: ["@babel/preset-env"], // Preset for modern JavaScript
                    }
                }
            },
            {
                // Rule for processing image files
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource", // Emits a separate file and exports the URL
            }
        ]
    },

    // Plugins configuration
    plugins: [
        new HtmlWebpackPlugin({
            // HTML file title
            title: "Webpack App",
            // Output filename
            filename: "index.html",
            // Template file to use
            template: "src/template.html"
        }),
        new BundleAnalyzerPlugin(), // Visualizes size of webpack output files
    ]
}
