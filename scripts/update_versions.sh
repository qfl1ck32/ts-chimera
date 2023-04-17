#!/bin/bash

# Navigate to the packages directory
cd ../packages

# Loop through all directories in packages
for package_dir in */; do
  # Get the current package name and version
  package_name=$(jq -r '.name' "$package_dir/package.json")
  current_version=$(jq -r '.version' "$package_dir/package.json")

  # Find all package.json files in packages except the current one
  find . -mindepth 2 -maxdepth 2 -type f -name "package.json" -not -path "./${package_dir}*" | while read -r package_json; do
    # Check if the current package is a dependency in the package.json file
    if jq -e ".dependencies[\"${package_name}\"]" "$package_json" > /dev/null; then
      # Update the version of the current package in the dependencies section
      jq ".dependencies[\"${package_name}\"] |= \"^${current_version}\"" "$package_json" > "tmp.json" && mv "tmp.json" "$package_json"
    fi

    # Check if the current package is a devDependency in the package.json file
    if jq -e ".devDependencies[\"${package_name}\"]" "$package_json" > /dev/null; then
      # Update the version of the current package in the devDependencies section
      jq ".devDependencies[\"${package_name}\"] |= \"^${current_version}\"" "$package_json" > "tmp.json" && mv "tmp.json" "$package_json"
    fi
  done
done