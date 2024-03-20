const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
const zlib = require('zlib')

const production = process.env.NODE_ENV === 'production'

module.exports = {
	entry: path.resolve(__dirname, './src/index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: production ? '[name].[contenthash].js' : '[name].js',
		assetModuleFilename: path.join(
			'public',
			production ? '[name].[contenthash][ext]' : '[name][ext]'
		),
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: '/node_modules/',
				use: ['babel-loader'],
			},
			{
				test: /\.(scss|css|sass)$/,
				exclude: '/node_modules/',
				use: [
					production ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							sourceMap: !production,
						},
					},
					{
						loader: `postcss-loader`,
						options: {
							sourceMap: !production,
						},
					},
					{
						loader: `sass-loader`,
						options: {
							sourceMap: !production,
						},
					},
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				exclude: '/node_modules/',
				type: 'asset/resource',
				generator: {
					filename: path.join(
						'public/assets/images',
						production ? '[name].[contenthash][ext]' : '[name][ext]'
					),
				},
			},
			{
				test: /\.svg$/,
				exclude: '/node_modules/',
				type: 'asset/resource',
				generator: {
					filename: path.join(
						'public/assets/icons',
						production ? '[name].[contenthash][ext]' : '[name][ext]'
					),
				},
			},
			{
				test: /\.(ttf|otf|eot|woff|woff2)$/,
				exclude: '/node_modules/',
				type: 'asset/resource',
				generator: {
					filename: path.join(
						'public/assets/fonts',
						production ? '[name].[contenthash][ext]' : '[name][ext]'
					),
				},
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.scss', '.sass', '.css'],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'InCase',
			template: './public/index.html',
			favicon: './public/favicon.ico',
			inject: 'body',
		}),
		new MiniCssExtractPlugin({
			filename: production ? '[name].[contenthash].css' : '[name].css',
			ignoreOrder: true,
		}),
		new CompressionPlugin({
			filename: '[path][base].gz',
			algorithm: 'gzip',
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.8,
		}),
		new CompressionPlugin({
			filename: '[path][base].br',
			algorithm: 'brotliCompress',
			test: /\.(js|css|html|svg)$/,
			compressionOptions: {
				params: {
					[zlib.constants.BROTLI_PARAM_QUALITY]: 11,
				},
			},
			threshold: 10240,
			minRatio: 0.8,
		}),
	],
	optimization: {
		splitChunks: production
			? {
					chunks: 'all',
					minSize: 20000,
					minRemainingSize: 0,
					minChunks: 1,
					maxAsyncRequests: 30,
					maxInitialRequests: 30,
					enforceSizeThreshold: 50000,
					cacheGroups: {
						defaultVendors: {
							test: /[\\/]node_modules[\\/]/,
							priority: -10,
							reuseExistingChunk: true,
						},
						default: {
							minChunks: 2,
							priority: -20,
							reuseExistingChunk: true,
						},
					},
				}
			: {},
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		compress: true,
		port: 3000,
	},
	mode: production ? 'production' : 'development',
	devtool: production ? false : 'inline-source-map',
}
