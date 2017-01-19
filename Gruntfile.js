module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';\n',
      },
      dist: {
        src: ['public/client/**/*.js', 'public/lib/**/*.js'],
        dest: 'public/dist/built.js',
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      'my_target': {
        files: {
          'public/dist/built.min.js': ['public/dist/built.js']
        }
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
      ]
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public',
          src: ['style.css', '!*.min.css'],
          dest: 'public/dist',
          ext: '.min.css'
        }]
      }      
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },

    gitpush: {
      'your_target': {
        options: {
          remote: 'live'
        }
      }
    },

    // sshexec: {
    //   connect: {
    //     command: ['sh -c "cd /shortly-deploy; ls"'],
    //     //
    //     options: {
    //       host: 'xxx.xxx.xxx.xx',
    //       username: 'xxxx',
    //       password: 'xXxXxXx'
    //     }
    //   }
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-git');

  // grunt.loadNpmTasks('grunt-ssh');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////
  // grunt.registerTask('nodemon', [
  //   'nodemon'
  // ]);

  // grunt.registerTask('concat', [
  //   'concat'
  // ]);

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
    'concat',
    'uglify',
    'cssmin',
    'gitpush',
  ]);


};
