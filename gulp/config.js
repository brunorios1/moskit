var paths = {
  styles: ['src/core/**/*.scss', 'src/custom/**/*.scss'],
  scripts: ['src/core/**/*.js', 'src/custom/**/*.js'],
  html: '*.html',
  tmp: 'tmp',
  dist: 'dist',
};

module.exports = {
  clean: {
    dev: {
      src: paths.tmp
    },
    live: {
      src: paths.dist
    }
  },

  sass: {
    dev: {
      src: paths.styles,
      dest: paths.tmp + '/css'
    },

    live: {
      src: paths.styles,
      dest: paths.tmp + '/css'
    }
  },

  scripts: {
    src: paths.scripts
  },

  watch: {
    styles: paths.styles,
    scripts: paths.scripts,
    html: paths.html,
  },

  html: {
    src: paths.html,
    dist: paths.dist
  }
};
