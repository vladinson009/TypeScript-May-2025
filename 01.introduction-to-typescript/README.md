run the command below in the terminal to initialize `tsconfig.json` file with the neccesary settings

`tsc --init --target esnext --module esnext --outDir dist --sourceMap`

run the command below in the terminal and leave it working to watch for changes and transpile to `.js` in `dist` folder

`tsc -w` or `tsc -watch`

---

When deleted `.ts`files they are still existing in `dist` folder as `.js` files. To clean `dist` folder from these files simply run the command below

`tsc --build --clean`
