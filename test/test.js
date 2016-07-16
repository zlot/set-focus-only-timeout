'use strict';

var assert = chai.assert;

describe('setFocusOnlyTimeout', function() {
    this.timeout(10000);

    it('should return a timeout id', function() {
        var intervalId = window.setFocusOnlyTimeout(function() {
        }, 500);
        assert.typeOf(intervalId, 'number');
    });

    it('will run callback function when timeout has elapsed', function(done) {
        window.setFocusOnlyTimeout(function() {
            done();
        }, 300);
    });

    it('can handle multiple timeouts going at once', function(done) {
        var p1 = new Promise(function(resolve) {
            window.setFocusOnlyTimeout(function() {
                resolve();
            }, 300);
        });
        var p2 = new Promise(function(resolve) {
            window.setFocusOnlyTimeout(function() {
                resolve();
            }, 1000);
        });
        var p3 = new Promise(function(resolve) {
            window.setFocusOnlyTimeout(function() {
                resolve();
            }, 1500);
        });

        Promise.all([p1, p2, p3]).then(function() {
            done();
        });

    })

});

describe('Edge cases', function() {
    this.timeout(100);

    it('will call callback function at correct time, when timeout is set to < 100', function(done) {
        window.setFocusOnlyTimeout(function() {
            done();
        }, 40);
    })
    it('will call callback function at correct time, when timeout is set to 1', function(done) {
        window.setFocusOnlyTimeout(function() {
            done();
        }, 1);
    })
    it('will call callback function at correct time, when timeout is set to 0', function(done) {
        window.setFocusOnlyTimeout(function() {
            done();
        }, 0);
    })
})
