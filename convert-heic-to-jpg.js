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
          var cmd = `mogrify -format jpg ${stat.name}`;
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
                console.log(stdout);
              }
              if (stderr) {
                console.error(stderr);
              }
              console.log('CONVERT', fullpath);
              next();
            }
          );
        } else {
          console.log('SKIP ALREADY CONVERTED', fullpath);
          next();
        }
      });
  } else {
    console.log('SKIP NOT HEIC', fullpath);
    next();
  }
});
