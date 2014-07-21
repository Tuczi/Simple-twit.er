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
		files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
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
		dist: {
		    options: {
				style: 'nested'
			},
			files: {
				'build/assets/stylesheets/style.css': 'src/assets/stylesheets/main.css.scss'
			}
		}
	},
	copy: {
		main: {
			files: [
				{ expand: true, cwd: 'src', src: '**', dest: 'build/' },
				{ src: 'src/index.html', dest: 'build/index.html' } 
			]
		}
	}
});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');

grunt.registerTask('default', ['clean', 'jshint', 'sass', 'concat', 'uglify', 'copy']);

grunt.registerTask('build:dev', ['clean', 'jshint', 'sass', 'concat', 'uglify', 'copy']);//TODO do not concat and uglify
grunt.registerTask('build:production', ['clean', 'jshint', 'sass', 'concat', 'uglify', 'copy']);

};
