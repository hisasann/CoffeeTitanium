// npm instlal grunt
// grunt watch

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // ------------------------------------------------------------------------
    meta: {
      version: '0.1.0',
      banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://PROJECT_WEBSITE/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'hisasann; Licensed MIT */'
    },
    // ------------------------------------------------------------------------
    concat: {
      sample1: {
        src: ['<banner:meta.banner>', 'coffee/sample/sample1.js'],
        dest: 'coffee/sample/sample1.js'
      },
      sample2: {
        src: ['<banner:meta.banner>', 'coffee/sample/sample2.js'],
        dest: 'coffee/sample/sample2.js'
      },
      sampleall: {
        src: ['coffee/sample/*.js'],
        dest: 'coffee/sample/sample-all.js'
      }
    },
    // ------------------------------------------------------------------------
    min: {
      sample: {
        src: ['coffee/sample/sample-all.js'],
        dest: 'Resources/sample/sample-all.min.js'
      }
    },
    // ------------------------------------------------------------------------
    coffee: {
      app: {
        src : ['coffee/app.coffee'],
        dest : 'Resources/'
      },
      sample: {
        src : ['coffee/sample/*.coffee'],
        dest : 'coffee/sample/'
      },
      ui: {
        src : ['coffee/ui/*.coffee'],
        dest : 'Resources/ui/'
      }
    },
    // ------------------------------------------------------------------------
    watch:{
      coffee:{
        files:['coffee/**/*.coffee'],
        tasks:'coffee concat min'
      }
    },
    // ------------------------------------------------------------------------
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {}
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'coffee concat min');

  // --------------------------------------------------------------------------
  //
  // register custom tasks and helpers.
  //
  var exec = require('child_process').exec;

  grunt.registerHelper('exec', function (opts, done) {
    var command = opts.cmd + ' ' + opts.args.join(' ');
    exec(command, opts.opts, function (code, stdout, stderr) {
      if (!done) return;
      if (code === 0) {
        done(null, stdout, code);
      } else {
        done(code, stderr, code);
      }
    });
  });

  var handleResult = function handleResult(err, stdout, code, done) {
    if (err) {
      log.writeln(stdout);
      done(false);
    } else {
      done(true);
    }
  };

  // task: coffee
  (function (grunt) {
    grunt.registerHelper('coffeec', function (fromdir, dest, done) {
      var args = { cmd:'coffee', args:[ '--compile', '--output', dest, fromdir ] };
      grunt.helper('exec', args, function (err, stdout, code) {
        handleResult(err, stdout, code, done);
      });
    });

    grunt.registerMultiTask('coffee', 'compile CoffeeScript', function () {
      grunt.helper('coffeec', this.data.src, this.data.dest, this.async());
    });
  }(grunt));
};

