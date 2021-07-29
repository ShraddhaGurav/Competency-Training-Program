var webpackConfig = require('./webpack.config');
module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'test/**/*Spec.js'
		],
		exclude: [
		],
		preprocessors: {
			'test/**/*Spec.js': ['webpack']
		},
		reporters: ['progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false,
		concurrency: Infinity,
		webpack: webpackConfig
	});
};
