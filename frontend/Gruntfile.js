module.exports = function(grunt) {
	
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	clean: ["build/"],
	concat: {
		options: {
			separator: ';'
		},
		dist: {
			src: ['src/assets/javascripts/**/*.js'],
			dest: 'build/assets/javascripts/main.js'
		}
	},
	uglify: {
		options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
		},
		dist: {
			files: {
				'build/assets/javascripts/main.min.js': ['<%= concat.dist.dest %>']
			}
		}
	},
	jshint: {
		files: ['Gruntfile.js', 'src/assets/javascripts/**/*.js', 'test/assets/javascripts/**/*.js'],
		options: {
			globals: {
				jQuery: true,
				console: true,
				module: true,
				document: true
			}
		}
	},
	sass: {
		dev: {
			files: [{
				expand: true,
				cwd: 'src/assets/stylesheets',
				src: ['*.css.scss'],
				dest: 'build/assets/stylesheets',
				ext: '.css'
			}]
		},
		prod: {	
		    options: {
				style: 'nested'
			},
			files: { 'build/assets/stylesheets/main.css': 'src/assets/stylesheets/main.css.scss' }
		}
	},
	copy: {
		dev: {
			files: [
				{ expand: true, cwd: 'src/views', src: '**', dest: 'build/views' },
				{ src: 'src/index.html', dest: 'build/index.html' },
				{ expand: true, cwd: 'src/assets/javascripts', src: '**', dest: 'build/assets/javascripts'}
			]
		},
		prod: {
			files: [
				{ expand: true, cwd: 'src/views', src: '**', dest: 'build/views' },
				{ src: 'src/index.html', dest: 'build/index.html'}
			]				
		},
		apache: {
			files: [{ expand: true, cwd: 'build', src: '**', dest: '/srv/http/angular' }]
		}
	},
	includeSource: {
		options: {
			templates: {
				html: {
					js: '<script src="{filePath}"></script>',
					css: '<link rel="stylesheet" type="text/css" href="{filePath}" />'
				},
				basePath: 'build/',
				baseUrl: '/'
			},
			basePath: 'build'
		},
		dev: {
			files: {
				'build/index.html': 'build/index.html'
			}
		},
		prod: {
			files: {
				'build/index.html': 'build/index.html'
			}
		}
	},
	connect: {
		serve: {
			options: {
				port: 9000,
				base: 'build',
				keepalive: true
			}
		}
	}
});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-include-source');
grunt.loadNpmTasks('grunt-contrib-connect');

grunt.registerTask('default', ['build:dev']);

grunt.registerTask('build:dev', ['clean', 'jshint', 'sass:dev', 'copy:dev', 'includeSource:dev']);
grunt.registerTask('build:prod', ['clean', 'jshint', 'sass:prod', 'concat', 'uglify', 'copy:prod','includeSource:prod']);
grunt.registerTask('build:apache', ['build:prod', 'copy:apache']);

grunt.registerTask('s', ['serve']);
grunt.registerTask('serve', ['serve:dev']);
grunt.registerTask('serve:dev', ['build:dev', 'connect:serve']);
grunt.registerTask('serve:prod', ['build:prod', 'connect:serve']);


};
