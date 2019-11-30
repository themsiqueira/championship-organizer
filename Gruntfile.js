module.exports = function(grunt) {

  grunt.initConfig({
    apidoc: {
      mypp: {
        src: "app/",
        dest: "apidoc/",
        options: {
          debug: true,
          includeFilters: [ ".*\\.js$" ],
          excludeFilters: [ "node_modules/" ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-apidoc');
};
