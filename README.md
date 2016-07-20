setFocusOnlyTimeout acts just like setTimeout, except it will countdown only when the browser window is visible.

Please note that the browsers definition of "visible" might be a tad different to what you expect, so test it out! 
It uses the [ifvisible](https://github.com/serkanyersen/ifvisible.js/) library by [serkanyersen](https://github.com/serkanyersen) 
for browser compatibility, which in turn relies on the Page Visibility API. See [ifvisible](https://github.com/serkanyersen/ifvisible.js/) 
for more info about the nuances of when a page is considered "visible".

## Usage

Include in a script tag the `set-focus-only-timeout.min.js` file found in `dist/`. Then:

    window.setFocusOnlyTimeout(action, delay);

## Install via npm and Browserify for use

    npm install set-focus-only-timeout

Then: 

    var setFocusOnlyTimeout = require('set-focus-only-timeout');

*Note:*: This is a client-side-specific package, so it only makes sense when bundled up via Browserify or some other manager 
for use in a browser. See the `Gruntfile` for how the `dist/` files have been browserified.


## Run unit tests

    npm test

## Run the Nightwatch.js end-to-end test

This is to simulate tab-switching in a browser.

First have a look at `nightwatch.json` config and change as required.

Specifically, you'll have to grab a selenium-server-standalone `jar` to run the selenium server. 
You can find one [here](http://selenium-release.storage.googleapis.com/index.html). Best to place this in `test/bin/`.

You will also have to run `test/end-to-end/test.html` via a static server for `test/end-to-end/example.js`
to use. `npm install http-server` and run in root folder for ease.

For indepth detail about nightwatch see the [Nightwatch.js Developer Guide](http://nightwatchjs.org/guide).

    node ./node_modules/nightwatch/bin/nightwatch
