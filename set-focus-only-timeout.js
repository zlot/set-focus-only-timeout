'use strict';

(function(window) {

    function focusOnlyTimeout(cb, timeout) {

        var started = new Date();
        var remaining = timeout;

        function start() {
            return window.setTimeout(function() {
                cb();
                ifvisible.off('blur');
                ifvisible.off('focus');
            }, remaining);
        }

        ifvisible.on('blur', hasBlurred);
        ifvisible.on('focus', hasFocused);
        var timeoutId = start();

        function hasBlurred() {
            clearTimeout(timeoutId);
            remaining -= new Date() - started;
        }
        function hasFocused() {
            started = new Date();
            timeoutId = start();
        }
        return timeoutId;
    }

    window.setFocusOnlyTimeout = focusOnlyTimeout;

})(window);
