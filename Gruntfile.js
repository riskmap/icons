var fs = require('fs');

module.exports = function(grunt) {

  // Setup paths

  function srcPath(path) { return './src/' + path; }

  // Config Object

  var config = {};

  // Iconfonts

  var iconfontName = 'riskmapicons',
      prefix = 'ri',
      pathFromStyles = './',
      codepointsFile = './src/map.js';

  config.webfont = {
    icons: {
      src: srcPath('svgs/*.svg'),
      dest: './dist',
      options: {
        font: iconfontName,
        template: srcPath('style.css'),
        templateOptions: {
          fontFamilyName: iconfontName,
          baseClass: iconfontName + '-icon',
          classPrefix: prefix + '-',
          mixinPrefix: prefix + '-',
          extraStyles: true,
          fontSrc: pathFromStyles + iconfontName
        },
        codepointsFile: codepointsFile
      }
    }
  };

  config.watch = {
    iconfont: {
      files: ['src/svg/*.svg'],
      tasks: ['webfont:icons']
    }
  };

  // Register individual tasks
  grunt.registerTask('icons', [ 'webfont:icons' ]);
  grunt.registerTask('watch', [ 'watch' ]);

  // Register build task
  grunt.registerTask('build', [
    'icons', 'watch'
  ]);

  // Initialize configuration
  grunt.initConfig(config);

  // Load npm tasks
  grunt.loadNpmTasks('grunt-webfont');

};
