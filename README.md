setFocusOnlyTimeout acts just like setTimeout, except it will countdown only when the browser window is visible.

Please note that this might have behaviour a bit different to what you expect. It uses the [ifvisible](https://github.com/serkanyersen/ifvisible.js/) 
library by [serkanyersen](https://github.com/serkanyersen) for browser compatibility, which in turn relies on the Page Visibility API. 
See [ifvisible](https://github.com/serkanyersen/ifvisible.js/) for more info about the nuances of when a page is considered "visible".

