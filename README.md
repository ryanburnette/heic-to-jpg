# @ryanburnette/convert-heic-to-jpg

Script for walking a directory and converting and `.heic` images to `.jpg`.

This spawns a `mogrify` command, so it requires ImageMagick.

## Command

```bash
LOGGING=true @ryanburnette/convert-heic-to-jpg [dir]
```

The default directory is the current. Set `proces.env.LOGGING` to true for
testing.
