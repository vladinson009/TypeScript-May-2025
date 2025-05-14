run the command below in the terminal to initialize `tsconfig.json` file with the neccessary settings

`tsc --init --target esnext --module esnext --outDir dist --sourceMap`

run the command below in the terminal and leave it working to watch for changes and transpile to `.js` in `dist` folder

`tsc -w` or `tsc -watch`

---

When deleted `.ts`files they are still existing in `dist` folder as `.js` files. To clean `dist` folder from these files simply run the command below

`tsc --build --clean`

---

Here is a launch config. I recommend you to put it in global settings.json file so you dont have to create new one for each project

Launch configuration:

```json
"launch": {
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-node",
            "request": "launch",
            "name": "GlobalTS",
            "program": "${file}",
            "skipFiles": ["<node_internals>/**"],
            "cwd": "${workspaceRoot}",
            "outputCapture": "std"
        }
    ]
}
```

Now you can run debugger with CTRL+F5 in current file :))
