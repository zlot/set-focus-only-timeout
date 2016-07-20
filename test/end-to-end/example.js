// best to run a simple webserver like http-server on npm! Defaults to serving on port 8080.
var testHtml = 'http://localhost:8080/test/end-to-end/test.html'
var successText = 'setFocusOnlyTimeout ran its callback.';

module.exports = {
    'setFocusOnlyTimeout will run its callback': function(browser) {
        browser
            .url(testHtml)
            .pause(1500)
            .assert.elementPresent('#success')
            .end();
    },

    'setFocusOnlyTimeout will count down timer only when focused': function(browser) {
        browser
            .url(testHtml)
            .pause(400)
            .sendKeys('body', browser.Keys.COMMAND + 't')
            .pause(3000)
            .sendKeys('body', browser.Keys.CONTROL + browser.Keys.TAB)
            .pause(4000)
            .assert.containsText('body', successText)
            .end();
    },

    'setFocusOnlyTimeout will not reach timeout when page is not focused': function(browser) {
        browser
            .url(testHtml)
            .pause(800)
            .sendKeys('body', browser.Keys.COMMAND + 't')
            .pause(3000)
            .assert.elementNotPresent('#success')
            .end();
    }
};
