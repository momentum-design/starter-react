# FAQ

[Why does this exist?](#why-does-this-exist)

[What do the scripts in package.json do?](#what-do-the-scripts-in-packagejson-do)

[Can you explain the folder structure?](#can-you-explain-the-folder-structure)

[Where are the files being served from when I run `npm start`?](#where-are-the-files-being-served-from-when-i-run-npm-start)

[Where is index.html?](#where-is-indexhtml)

[How is Sass being converted into CSS and landing in the browser?](#how-is-sass-being-converted-into-css-and-landing-in-the-browser)

[How do I deploy this?](#how-do-i-deploy-this)

[Why are test files placed alongside the file under test (instead of centralized)?](#why-are-test-files-placed-alongside-the-file-under-test-instead-of-centralized)

[How do I debug?](#how-do-i-debug)

[Debugging in Visual Studio Code](#debugging-in-visual-studio-code)

[How do I handle images?](#how-do-i-handle-images)

[I'm getting an error when running npm install: Failed to locate "CL.exe"](#im-getting-an-error-when-running-npm-install-failed-to-locate-clexe)

[I can't access the external URL for Browsersync](#i-cant-access-the-external-url-for-browsersync)

[What about the Redux Devtools?](#what-about-the-redux-devtools)

[Hot reloading isn't working!](#hot-reloading-isnt-working)

---

## Why does this exist?

This starter kit implements best practices like testing, minification, bundling, and so on. It codifies a long list of decisions that you no longer have to make to get rolling. It saves you from the long, painful process of wiring it all together into an automated dev environment and build process. It's also useful as inspiration for ideas you might want to integrate into your current development environment or build process.

## What do the scripts in package.json do?

Unfortunately, scripts in package.json can't be commented inline because the JSON spec doesn't support comments, so I'm providing info on what each script in package.json does here.

| **Script**        | **Description**                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| prestart          | Runs automatically before start to display a message.                                                                                                      |
| start             | Runs tests, lints, starts dev webserver, and opens the app in your default browser.                                                                        |
| clean-dist        | Removes everything from the dist folder.                                                                                                                   |
| remove-dist       | Deletes the dist folder.                                                                                                                                   |
| create-dist       | Creates the dist folder and the necessary subfolders.                                                                                                      |
| prebuild          | Runs automatically before build script (due to naming convention). Cleans dist folder, builds html, and builds sass.                                       |
| build             | Bundles all JavaScript using webpack and writes it to /dist.                                                                                               |
| test              | Runs tests (files ending in .spec.js or .test.js) using Jest and outputs results to the command line. Watches all files so tests are re-run upon save.     |
| test:cover        | Runs tests as described above. Generates a HTML coverage report to ./coverage/index.html                                                                   |
| analyze-bundle    | Analyzes webpack bundles for production and gives you a breakdown of where modules are used and their sizes via a convenient interactive zoomable treemap. |

## Can you explain the folder structure?

```bash
.
├── .editorconfig             # Configures editor rules
├── .gitignore                # Tells git which files to ignore
├── .istanbul.yml             # Configure istanbul code coverage
├── README.md                 # This file.
├── dist                      # Folder where the build script places the built app. Use this in prod.
├── package.json              # Package configuration. The list of 3rd party libraries and utilities
├── src                       # Source code
│   ├── components            # React components
│   ├── constants             # Application constants including constants for Redux
│   ├── index.ejs             # Template for homepage
│   ├── index.js              # Entry point for your app
│   ├── store                 # Redux store configuration
│   ├── styles                # CSS Styles, typically written in Sass
├── tools                     # Node scripts that run build related tools
│   └── analyzeBundle.js      # Analyzes the webpack bundle
│   ├── assetsTransformer.js  # Fix for jest handling static assets like imported images
│   ├── build.js              # Runs the production build
│   ├── chalkConfig.js        # Centralized configuration for chalk (adds color to console statements)
│   ├── distServer.js         # Starts webserver and opens final built app that's in dist in your default browser
│   ├── nodeVersionCheck.js   # Confirm supported Node version is installed
│   ├── srcServer.js          # Starts dev webserver with hot reloading and opens your app in your default browser
│   ├── startMessage.js       # Display message when development build starts
│   ├── testCi.js             # Configure Jest to run on a CI server
├── webpack.config.dev.js     # Configures webpack for development builds
└── webpack.config.prod.js    # Configures webpack for production builds
```

## Where are the files being served from when I run `npm start`?

Webpack serves your app in memory when you run `npm start`. No physical files are written. However, the web root is /src, so you can reference files under /src in index.html. When the app is built using `npm run build`, physical files are written to /dist and the app is served from /dist.

## Where is index.html?

It's generated by webpack using htmlWebpackPlugin. This plugin dynamically generates index.html based on the configuration in webpack.config. It also adds references to the JS and CSS bundles using hash-based filenames to bust cache. Separate bundles for vendor and application code are created and referencing within the generated index.html file so that vendor libraries and app code can be cached separately by the browser. The bundle filenames are based on the file's hash, so the filenames only change when the file contents change. For more information on this, read [Long-term caching of static assets with Webpack](https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.4aeatmtfz) and [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)

## How is Sass being converted into CSS and landing in the browser?

Magic! Okay, more specifically, we're handling it differently in dev (`npm start`) vs prod (`npm run build`)

When you run `npm start`:

1.  The sass-loader compiles Sass into CSS
2.  Webpack bundles the compiled CSS into bundle.js. Sounds odd, but it works!
3.  bundle.js contains code that loads styles into the &lt;head&gt; of index.html via JavaScript. This is why you don't see a stylesheet reference in index.html. In fact, if you disable JavaScript in your browser, you'll see the styles don't load either.

The approach above supports hot reloading, which is great for development. However, it also creates a flash of unstyled content on load because you have to wait for the JavaScript to parse and load styles before they're applied. So for the production build, we use a different approach:

When you run `npm run build`:

1.  The sass-loader compiles Sass into CSS
2.  The [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin) extracts the compiled Sass into styles.css
3.  Webpack adds a reference to the stylesheet to the head of index.html.

For both of the above methods, a separate sourcemap is generated for debugging Sass in [compatible browsers](http://thesassway.com/intermediate/using-source-maps-with-sass).

## How do I deploy this?

`npm run build`. This will build the project for production. It does the following:

* Minifies all JS
* Sets NODE_ENV to prod so that React is built in production mode
* Places the resulting built project files into /dist. (This is the folder you'll expose to the world).

If the app destination is different from the server root (`/`) you need to reconfigure `output.publicPath` in `webpack.config.prod.js` before building the app. See [webpack docs](https://webpack.js.org/configuration/output/#output-publicpath) for more information.

Check out this [blog post](www.latrovacommits.com/en/2017/12/14/how-publish-dist-folder-heroku/) showing two ways of deploying to Heroku.

## Why are test files placed alongside the file under test (instead of centralized)?

Streamlined automated testing is a core feature of this starter kit. All tests are placed in files that end in .spec.js. Spec files are placed in the same directory as the file under test. Why?

* The existence of tests is highly visible. If a corresponding .spec file hasn't been created, it's obvious.
* Easy to open since they're in the same folder as the file being tested.
* Easy to create new test files when creating new source files.
* Short import paths are easy to type and less brittle.
* As files are moved, it's easy to move tests alongside.

That said, you can of course place your tests under **test** instead. Then Jest will simply look in /test to find your spec files.

## How do I debug?

Since browsers don't currently support ES6, we're using Babel to compile our ES6 down to ES5. This means the code that runs in the browser looks different than what we wrote. But good news, a [sourcemap](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) is generated to enable easy debugging. This means your original JS source will be displayed in your browser's dev console.
_Note:_ When you run `npm start`, no JS is minified. Why? Because minifying slows the build. So JS is only minified when you run the `npm run build` script. See [more on building for production above](https://github.com/momentum-design/starter-react/blob/master/docs/FAQ.md#how-do-i-deploy-this).

Also note that no actual physical files are written to the filesystem during the dev build. **For performance, all files exist in memory when served from the webpack server.**. Physical files are only written when you run `npm run build`.

**Tips for debugging via sourcemaps:**

1.  Browsers vary in the way they allow you to view the original source. Chrome automatically shows the original source if a sourcemap is available. Safari, in contrast, will display the minified source and you'll [have to cmd+click on a given line to be taken to the original source](http://stackoverflow.com/questions/19550060/how-do-i-toggle-source-mapping-in-safari-7).
2.  Do **not** enable serving files from your filesystem in Chrome dev tools. If you do, Chrome (and perhaps other browsers) may not show you the latest version of your code after you make a source code change. Instead **you must close the source view tab you were using and reopen it to see the updated source code**. It appears Chrome clings to the old sourcemap until you close and reopen the source view tab. To clarify, you don't have to close the actual tab that is displaying the app, just the tab in the console that's displaying the source file that you just changed.
3.  If the latest source isn't displaying the console, force a refresh. Sometimes Chrome seems to hold onto a previous version of the sourcemap which will cause you to see stale code.

## Debugging in Visual Studio Code:

* Install the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension.
* Follow the instructions on how to [configure debugging in Visual Studio code](https://github.com/Microsoft/vscode-chrome-debug/blob/master/README.md#using-the-debugger).

Don't see your favorite code editor debugging configuration here? Submit a PR and we'll be glad to add it to the FAQ.md.

## How do I handle images?

Via [Webpack's file loader](https://github.com/webpack/file-loader). Example:

```html
<img src={require('./src/images/myImage.jpg')} />
```

Webpack will then intelligently handle your image for you. For the production build, it will copy the physical file to /dist, give it a unique filename, and insert the appropriate path in your image tag.

## I'm getting an error when running npm install: Failed to locate "CL.exe"

On Windows, you need to install extra dependencies for browser-sync to build and install successfully. Follow the getting started steps above to assure you have the necessary dependencies on your machine.

## I can't access the external URL for Browsersync

To hit the external URL, all devices must be on the same LAN. So this may mean your dev machine needs to be on the same Wifi as the mobile devices you're testing. Alternatively, you can use a tool like [localtunnel](https://localtunnel.github.io/www/) or [ngrok](https://ngrok.com) to expose your app via a public URL. This way, you can interact with the Browsersync hosted app on any device.

## What about the Redux Devtools?

Install the [Redux devtools extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) in Chrome Developer Tools. If you're interested in running Redux dev tools cross-browser, Barry Staes created a [branch with the devtools incorporated](https://github.com/momentum-design/starter-react/pull/27).

## Hot reloading isn't working!

Hot reloading doesn't always play nicely with stateless functional components at this time. [This is a known limitation that is currently being worked](https://github.com/gaearon/babel-plugin-react-transform/issues/57). To avoid issues with hot reloading for now, use a traditional class-based React component at the top of your component hierarchy.
