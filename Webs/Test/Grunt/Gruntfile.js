/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
   grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },        
    stylus: {
      compile: {       
        files: {          
          '<%= styloutpath %>\\app.css': ['<%= stylinpath %>\\*.stylus'] // compile and concat into single file
        }
      }
    },
    watch: {
      files:  ['<%= stylinpath %>\\*.stylus'],
      tasks:  ['stylus']
    },    
    styloutpath:'..\\CSS',
    stylinpath:'..\\STYLUS'
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task.
  grunt.registerTask('default', ['watch']);
 

};
