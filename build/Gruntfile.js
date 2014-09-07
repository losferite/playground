module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	var MAIN_JS = '../app/js/main.js';
	var path = require('path'),
		root = path.resolve("../app");

	var uiCfg = {
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			scripts: {
				files: [root + '/js/source/*.js'],
				tasks: ['concat'],
				options: {
					interval: 1000
				}
			},
			less: {
				files: root + '/less/*.less',
				tasks: ['less'],
				options: {
					spawn: false,
					interval: 1000
				}
			}
		},
		less: {
			dev: {
				options: {
					paths: ["assets/css"]
				},
				files: {
					"../app/css/app.css": root + "/less/bootstrap.less"
				}
			}
		},
		concat: {
			dist: {
				src: [
					root + '/js/source/*.js'
				],
				dest: MAIN_JS
			}
		},
	};
	grunt.initConfig(uiCfg);

	grunt.registerTask('build', ['less', 'concat']);
	grunt.registerTask('watcher', ['build', 'watch']);

}