'use strict';

var path = require('path');
var walk = require('walk');
var fs = require('fs');
var { exec } = require('child_process');

var dir = process.argv[2] || path.resolve(__dirname);

var walker = walk.walk(dir, {});

walker.on('file', function (root, stat, next) {
  var extname = path.extname(stat.name);
  var basename = path.basename(stat.name, extname);
  var fullpath = path.join(root, stat.name);
  var jpgpath = path.join(root, basename + '.jpg');
  if (extname.toLowerCase() === '.heic') {
    fs.promises
      .stat(jpgpath)
      .catch(function (err) {
        return false;
      })
      .then(function (exists) {
        if (!exists) {
          var cmd = `mogrify -format jpg "${stat.name}"`;
          exec(
            cmd,
            {
              cwd: root
            },
            function (error, stdout, stderr) {
              if (error) {
                console.error(error);
              }
              if (stdout) {
                if (process.env.LOGGING) {
                  console.log(stdout);
                }
              }
              if (stderr) {
                if (process.env.LOGGING) {
                  console.error(stderr);
                }
              }
              if (process.env.LOGGING) {
                console.log('CONVERT', fullpath);
              }
              next();
            }
          );
        } else {
          if (process.env.LOGGING) {
            console.log('SKIP ALREADY CONVERTED', fullpath);
          }
          next();
        }
      });
  } else {
    if (process.env.LOGGING) {
      console.log('SKIP NOT HEIC', fullpath);
    }
    next();
  }
});
