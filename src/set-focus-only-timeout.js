(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['ifvisible.js'], function (ifvisible) {
            return (root.returnExportsGlobal = factory(ifvisible));
        });
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('ifvisible.js'));
    } else {
        // Browser globals (root is window)
        root.returnExportsGlobal = factory(root.ifvisible);
    }

}(this, function (ifvisible) {
    'use strict';

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
    };

    // place setFocusOnlyTimeout on window.
    window.setFocusOnlyTimeout = focusOnlyTimeout;

    // Return a value to define the module export.
    return focusOnlyTimeout;
}));
