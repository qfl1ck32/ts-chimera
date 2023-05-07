#!/bin/bash

# Usage: ./link-package.sh source_package

SOURCE_PACKAGE=$1
PACKAGES_PATH=/Users/qfl1ck32/Stuff/ts-phoenix/packages

if [ -z "$SOURCE_PACKAGE" ]; then
  echo "Usage: $0 source_package"
  exit 1
fi

SOURCE_PACKAGE_PATH=$(cd "$PACKAGES_PATH"; cd $(basename "$SOURCE_PACKAGE"); pwd)

# Get the current working directory
TARGET_DIRECTORY=$(pwd)

NODE_MODULES_DIRECTORY="$TARGET_DIRECTORY/node_modules/$(dirname $SOURCE_PACKAGE)"

# Create the target node_modules folder if it doesn't exist
mkdir -p "$NODE_MODULES_DIRECTORY"

# Create the symlink
ln -sf "$SOURCE_PACKAGE_PATH" "$NODE_MODULES_DIRECTORY"
