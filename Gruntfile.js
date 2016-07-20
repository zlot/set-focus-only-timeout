module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            all: {
                src: 'set-focus-only-timeout.js',
                dest: 'dist/set-focus-only-timeout.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dist/set-focus-only-timeout.min.js': ['dist/set-focus-only-timeout.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('dist', ['browserify', 'uglify']);
};
