#!/bin/bash

# TODO: make this work on Ubuntu too, not just macos. Issue comes from "sed"

# To fix it, we need to use the -i flag with an empty string as the extension

# Usage: ./create-new-package.sh package_name

# Set the locale to UTF-8
export LC_ALL=C.UTF-8
export LANG=C.UTF-8

PACKAGE_NAME=$1

if [ -z "$PACKAGE_NAME" ]; then
  echo "Please provide a package name."
  exit 1
fi

PACKAGE_PATH="../packages/$PACKAGE_NAME"

mkdir $PACKAGE_PATH

PACKAGE_TEMPLATE_NAME="my-package-template"

rsync -r --exclude=node_modules ../templates/package/ $PACKAGE_PATH

find "$PACKAGE_PATH" -type f -exec sed -i '' "s/$PACKAGE_TEMPLATE_NAME/$PACKAGE_NAME/g" {} +
find "$PACKAGE_PATH" -type f -name "*$PACKAGE_TEMPLATE_NAME*" -exec bash -c 'mv "$0" "${0//'"$PACKAGE_TEMPLATE_NAME"'/'"$PACKAGE_NAME"'}";' {} \;

npm i

echo "Created new package $PACKAGE_NAME"