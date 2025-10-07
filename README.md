# HEIC to JPG Converter

A POSIX-compliant shell script to convert HEIC/HEIF image files to JPG format
using ImageMagick's `mogrify` command. The script supports processing files in a
specified directory, performing a dry run, and optionally deleting original HEIC
files.

## Prerequisites

The script requires ImageMagick, which provides the `mogrify` command. Below are
instructions to install ImageMagick on different operating systems.

### macOS

Install ImageMagick using Homebrew:

```bash
brew install imagemagick
```

### Ubuntu

Install ImageMagick using apt:

```bash
sudo apt update
sudo apt install imagemagick
```

### Arch Linux

Install ImageMagick using pacman:

```bash
sudo pacman -S imagemagick
```

## Installation

1. Save the `convert-heic.sh` script to a directory in your PATH, such as `/usr/local/bin/`:

   ```bash
   sudo mv convert-heic.sh /usr/local/bin/
   ```

2. Make the script executable:

   ```bash
   chmod +x /usr/local/bin/convert-heic.sh
   ```

## Usage

Run the script to convert HEIC/HEIF files to JPG in a specified directory (or
the current directory if none is provided). The script supports options for a
dry run and deleting original files.

### Basic Usage

Convert all HEIC/HEIF files in the current directory to JPG:

```bash
convert-heic.sh
```

Convert all HEIC/HEIF files in a specific directory:

```bash
convert-heic.sh /path/to/directory
```

### Options

- `-r`: Perform a dry run (shows what would happen without converting or
  deleting files).
- `-d`: Delete original HEIC/HEIF files after successful conversion.
- Combine options: `-r -d` (e.g., preview conversions and deletions

