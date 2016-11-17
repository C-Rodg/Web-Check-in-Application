var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry : [
		path.join(__dirname, 'src/index.js')
	],
	output : {
		path : path.join(__dirname, '/dist/'),
		filename : '[name].min.js',
		publicPath : ''
	},
	plugins : [
		new webpack.optimize.OccurenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.tp1.html',
			inject : 'body',
			filename : 'Launch.html'
		}),
		new ExtractTextPlugin('[name].min.css'),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings : false,
				screw_ie8 : true
			}
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV' : JSON.stringify('production')
		})
	],
	module : {
		loaders : [
			{
				test : /\.js?$/,
				exclude : /node_modules/,
				loader : 'babel'
			},
			{
				test : /\.json?$/,
				loader : 'json'
			},
			{
				test : /\.scss$/,
				loader : ExtractTextPlugin.extract('style', 'css!postcss!sass')
			},
			{
				test : /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
				loader : 'url?limit=10000&mimetype=application/font-woff'
			},
			{
				test : /\.(ttf|eot|svg|png|jpg)(\?[a-z0-9#=&.]+)?$/,
				loader : 'file'
			}
		]
	},
	postcss : [
		require('autoprefixer')
	]
};