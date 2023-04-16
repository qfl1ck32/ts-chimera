# @ts-phoenix

> Rise from the ashes, code with elegance.

`@ts-phoenix` is a versatile monorepo for TypeScript packages, suitable for both front-end and back-end web development. It is designed to streamline your development process by providing you with a wide array of tools and packages, all in one place.

## Getting Started

To contribute to @ts-phoenix, clone the repository and set up the development environment using Lerna:

```sh
git clone https://github.com/qfl1ck32/ts-phoenix.git
cd ts-phoenix
npm i
npm i -g lerna
lerna bootstrap
lerna run compile
```

## Scripts

The `scripts` folder contains useful utilities for managing the monorepo:

- `create-new-package.sh`: Creates a new package using the template from `templates/package`. To use it, run `./scripts/create-new-package.sh <package-name>`, replacing `<package-name>` with the desired name for your new package.
- `link-package.sh`: Facilitates local testing of modified packages. To use this script, follow these steps:
  1. Update the `PACKAGES_PATH` variable in the script to match your local path.
  2. Run `ln -s /path/to/your/repo/scripts/link-package.sh /usr/local/bin/link-package` to create a symlink to the script in `/usr/local/bin`.
  3. After modifying a package, run `link-package @ts-phoenix/some-package` to point your local project to the package in your cloned repository instead of the one published on NPM.

## Usage

Each package within the monorepo is designed to work independently or together, depending on your needs. Explore the package directories to find the right tools for your project and learn how to use them through their documentation.

## Contributing

We welcome contributions from the community! If you'd like to report a bug, request a feature, or submit a pull request, please follow these steps:

1. Check if there's an existing issue or pull request for your concern.
2. If not, create a new issue or fork the repository and submit a pull request.
3. Please follow our coding guidelines and ensure your changes are well-documented and tested.
4. If you need help or have any questions, feel free to reach out to the maintainers.

## License

@ts-phoenix is licensed under the [GNU General Public License v3.0](LICENSE).
