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
          fontSrc: pathFromStyles + iconfontName,
          aliases: readAliasesFromFile(),
          iconList: generateIconList
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

function generateIconList(glyphs, aliases, classPrefix, codepoints) {
  var str = ``;

  for (var i = 0; i < glyphs.length; i++) {
    var glyph = glyphs[i],
        alias = aliases[glyph];

    str += `.${classPrefix}${glyph}:before`;

    if (alias) {
      alias.forEach(function(glyphAlias) {
        str += `,
.${classPrefix}${glyphAlias}:before`;
      });
    }

    str += ` {
  content: "\\${codepoints[i]}"
}

`;

  }

  return str;
}

function readCodepointsFromFile(codepointsFile) {
  if (!fs.existsSync(codepointsFile)){
    console.log('Codepoints file not found');
    return {};
  }

  var buffer = fs.readFileSync(codepointsFile);
  return JSON.parse(buffer.toString());
}

function readAliasesFromFile() {
  if (!fs.existsSync('./src/aliases.js')){
    console.log('Aliases file not found');
    return {};
  }

  var buffer = fs.readFileSync('./src/aliases.js');
  return JSON.parse(buffer.toString());
}
