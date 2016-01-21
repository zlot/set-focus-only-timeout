/**
 * Idea originally from @Šime Vidas: http://stackoverflow.com/questions/5766263/run-settimeout-only-when-tab-is-active
 * Acts just like window.setTimeout except that it counts down only when the window is in focus.
 */
(function(window) {

    window.setFocusOnlyTimeout = function(cb, timeout) {
        return focusOnlyTimeout(cb, timeout);
    };

    // private
    function focusOnlyTimeout(cb, timeout) {
        var delta = 100;

        var blurred;

        function setStateToBlurred() {
            blurred = true;
        }
        function setStateToFocus() {
            blurred = false;
        }

        window.addEventListener('blur', setStateToBlurred);
        window.addEventListener('focus', setStateToFocus);

        var intervalId = window.setInterval(function() {
            if(blurred) {
                return;
            }
            timeout -= delta;
            console.log(timeout);
            if(timeout <= 0) {
                window.clearInterval(intervalId);
                window.removeEventListener('blur', setStateToBlurred);
                window.removeEventListener('focus', setStateToFocus);
                cb();
            }
        }, delta);

        return intervalId;
    }

})(window);
