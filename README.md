# Create React App Specific
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

You must run yarn install before trying to run de app.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Code Project Specific

## Dependencies notes

### pdfmake module
The instructions to install pdfMake form its own web is weird: It recommends to install  pdfkMake like client-version **$ bower install pdfmake**
The problem: when you try to install a dependency with bower, the console recommends to use yarn or other tech instead.
When going to the pdfmke npm page, https://www.npmjs.com/package/pdfmake, the installation process recommends to clone the pdfMake, install its dependencies and build the project in order to get the bundles files (inside the build folder)
Digging deeper, some repos were found and use the pdfmake as a normal dependency `https://github.com/vspedr/react-pdfmake-example`, listed in the `package.json` file as `{ dependencies: pdfkMake } `.
This was the approach taken, so the command `$ npm install pdfmake` was run.

## Module Resolution
When importing module pdfmake `import pdfmake from 'pdfmake'` typescript complains with the following error `Could not find a declaration file for module 'pdfmake'.`
During the compiling process, when we use a module [.js] inside a [.ts], typescript will search for that module declaration.
The search algorythm used can be 'node' or 'classic'.

From the official docs:

At the moment typescript see somehting like this `import { a } from moduleA` the compiler will ask itself “what’s the shape of moduleA
The compiler first will try to find the file that represents the imported module. As mentioned above, it can be done with 2 different search algorythms 
classic and node.
This methods tells the compiler WHERE to look for that module and in which ORDER
Classic or node search methods will be defined inside the tsconfig.json under the key --moduleResolution: '*[node] in this case*'

### Classic
(assume you are inside root/src)
  Relative path : will only search in the directory you are in
    /root/src/folder/moduleB.ts
    /root/src/folder/moduleB.d.ts
  Non-relative path : will start looking inside the directory you are in and then going up in the project
    /root/src/folder/moduleB.ts
    /root/src/folder/moduleB.d.ts
    /root/src/moduleB.ts
    /root/src/moduleB.d.ts
    /root/moduleB.ts
    /root/moduleB.d.ts
    /moduleB.ts
    /moduleB.d.ts

### Node
(assume you are inside root/src)
  Relative path
    /root/src/moduleB.js
    /root/src/moduleB/package.json -> Search for a "main" key and attach the absolute path insdie that key to the current path
      { main === 'lib/moduleB' } ? /root/src/moduleB/lib/moduleB : 3rd option
    /root/src/index.js
      Search for the index as it will be considered main file

  Non-relative path : will search for the module inside node_modules/** folders acrosss all the project structure (look for .js, package.json, index file also)
    /root/src/node_modules/moduleB.js
    /root/src/node_modules/moduleB/package.json (if it specifies a "main" property)
    /root/src/node_modules/moduleB/index.js

    /root/node_modules/moduleB.js
    /root/node_modules/moduleB/package.json (if it specifies a "main" property)
    /root/node_modules/moduleB/index.js

    /node_modules/moduleB.js
    /node_modules/moduleB/package.json (if it specifies a "main" property)
    /node_modules/moduleB/index.js

Typescript takes this node's search algorythm and overrides some behaviours [extensions, and main prop in package json fo rexample]
Resulting in this search order
  Relative path
    /root/src/moduleB.ts
    /root/src/moduleB.tsx
    /root/src/moduleB.d.ts
    /root/src/moduleB/package.json (if it specifies a "types" property)
    /root/src/moduleB/index.ts
    /root/src/moduleB/index.tsx
    /root/src/moduleB/index.d.ts

  Non-relative path
    /root/src/node_modules/moduleB.ts
    /root/src/node_modules/moduleB.tsx
    /root/src/node_modules/moduleB.d.ts
    /root/src/node_modules/moduleB/package.json (if it specifies a "types" property)
    /root/src/node_modules/@types/moduleB.d.ts
    /root/src/node_modules/moduleB/index.ts
    /root/src/node_modules/moduleB/index.tsx
    /root/src/node_modules/moduleB/index.d.ts

    /root/node_modules/moduleB.ts
    /root/node_modules/moduleB.tsx
    /root/node_modules/moduleB.d.ts
    /root/node_modules/moduleB/package.json (if it specifies a "types" property)
    /root/node_modules/@types/moduleB.d.ts
    /root/node_modules/moduleB/index.ts
    /root/node_modules/moduleB/index.tsx
    /root/node_modules/moduleB/index.d.ts

    /node_modules/moduleB.ts
    /node_modules/moduleB.tsx
    /node_modules/moduleB.d.ts
    /node_modules/moduleB/package.json (if it specifies a "types" property)
    /node_modules/@types/moduleB.d.ts
    /node_modules/moduleB/index.ts
    /node_modules/moduleB/index.tsx
    /node_modules/moduleB/index.d.ts

Taking into account this, import pdfmake from 'pdfMake'

Will look for that module inside:
    /root/node_modules/moduleB.ts                                                                       (DO NOT exist)
    /root/node_modules/moduleB.tsx                                                                      (DO NOT exist)
    /root/node_modules/moduleB.d.ts                                                                     (DO NOT exist)
    /root/node_modules/moduleB/package.json (if it specifies a "types" property)                        (DO NOT exist)
    /root/node_modules/@types/moduleB.d.ts (Confirm it also looks for index.ts and index.d.ts here too) (DO NOT exist)
    /root/node_modules/moduleB/index.ts                                                                 (DO NOT exist)
    /root/node_modules/moduleB/index.tsx                                                                (DO NOT exist)
    /root/node_modules/moduleB/index.d.ts                                                               (DO NOT exist)

As no one exists, then it throws the error mentioned.
This is the reason why we installed @types/pdfmake.
After the installation (see dependencies inside package.json) typescript compiler will find
    /root/node_modules/@types/moduleB/index.d.ts

As soon as we do this it will stop crashing but, when we try to use methods define inside that module
/*
 *
  import pdfmake from 'pdfMake'
  pdfmake.createPdf()
 *
 */

Will crash again. This is because that method is not definee inside the file index.d.ts. Which is right (you can go to that file and check for yourself)
All this is to explain why the import of the module pdfMake installed is imported as 'pdfmake/build/pdfmake'
When using the module like that, it will go and fetch types inside @types/pdfmake/build/pdfmake/pdfmake.d.ts and here it is defined that method being used.
