const path = require("path");

module.exports = {
	mode: "development",
	entry: "./app/app.jsx",
	output: {
		path: path.resolve(__dirname, "./public"),
		publicPath: "/public/",
		filename: "bundle.js"
	},
	devServer: {
		historyApiFallback: true,
		static: {
			directory: path.join(__dirname, "/public"),
		},
		port: 3000,
		open: true
	},
	module: {
		rules: [
			{ 
				test: /\.css$/, 
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				options: {
					sourceType: "unambiguous",
					presets:["@babel/preset-react"]
				}
			}
		]
	},
	resolve: {
    	extensions: ['.js', '.jsx']
  	}
}