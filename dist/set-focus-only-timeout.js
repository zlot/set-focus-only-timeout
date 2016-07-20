(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define(function() {
        return factory();
      });
    } else if (typeof exports === 'object') {
      return module.exports = factory();
    } else {
      return root.ifvisible = factory();
    }
  })(this, function() {
    var addEvent, customEvent, doc, fireEvent, hidden, idleStartedTime, idleTime, ie, ifvisible, init, initialized, status, trackIdleStatus, visibilityChange;
    ifvisible = {};
    doc = document;
    initialized = false;
    status = "active";
    idleTime = 60000;
    idleStartedTime = false;
    customEvent = (function() {
      var S4, addCustomEvent, cgid, fireCustomEvent, guid, listeners, removeCustomEvent;
      S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      guid = function() {
        return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
      };
      listeners = {};
      cgid = '__ceGUID';
      addCustomEvent = function(obj, event, callback) {
        obj[cgid] = undefined;
        if (!obj[cgid]) {
          obj[cgid] = "ifvisible.object.event.identifier";
        }
        if (!listeners[obj[cgid]]) {
          listeners[obj[cgid]] = {};
        }
        if (!listeners[obj[cgid]][event]) {
          listeners[obj[cgid]][event] = [];
        }
        return listeners[obj[cgid]][event].push(callback);
      };
      fireCustomEvent = function(obj, event, memo) {
        var ev, j, len, ref, results;
        if (obj[cgid] && listeners[obj[cgid]] && listeners[obj[cgid]][event]) {
          ref = listeners[obj[cgid]][event];
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            ev = ref[j];
            results.push(ev(memo || {}));
          }
          return results;
        }
      };
      removeCustomEvent = function(obj, event, callback) {
        var cl, i, j, len, ref;
        if (callback) {
          if (obj[cgid] && listeners[obj[cgid]] && listeners[obj[cgid]][event]) {
            ref = listeners[obj[cgid]][event];
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
              cl = ref[i];
              if (cl === callback) {
                listeners[obj[cgid]][event].splice(i, 1);
                return cl;
              }
            }
          }
        } else {
          if (obj[cgid] && listeners[obj[cgid]] && listeners[obj[cgid]][event]) {
            return delete listeners[obj[cgid]][event];
          }
        }
      };
      return {
        add: addCustomEvent,
        remove: removeCustomEvent,
        fire: fireCustomEvent
      };
    })();
    addEvent = (function() {
      var setListener;
      setListener = false;
      return function(el, ev, fn) {
        if (!setListener) {
          if (el.addEventListener) {
            setListener = function(el, ev, fn) {
              return el.addEventListener(ev, fn, false);
            };
          } else if (el.attachEvent) {
            setListener = function(el, ev, fn) {
              return el.attachEvent('on' + ev, fn, false);
            };
          } else {
            setListener = function(el, ev, fn) {
              return el['on' + ev] = fn;
            };
          }
        }
        return setListener(el, ev, fn);
      };
    })();
    fireEvent = function(element, event) {
      var evt;
      if (doc.createEventObject) {
        return element.fireEvent('on' + event, evt);
      } else {
        evt = doc.createEvent('HTMLEvents');
        evt.initEvent(event, true, true);
        return !element.dispatchEvent(evt);
      }
    };
    ie = (function() {
      var all, check, div, undef, v;
      undef = void 0;
      v = 3;
      div = doc.createElement("div");
      all = div.getElementsByTagName("i");
      check = function() {
        return (div.innerHTML = "<!--[if gt IE " + (++v) + "]><i></i><![endif]-->", all[0]);
      };
      while (check()) {
        continue;
      }
      if (v > 4) {
        return v;
      } else {
        return undef;
      }
    })();
    hidden = false;
    visibilityChange = void 0;
    if (typeof doc.hidden !== "undefined") {
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof doc.mozHidden !== "undefined") {
      hidden = "mozHidden";
      visibilityChange = "mozvisibilitychange";
    } else if (typeof doc.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof doc.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }
    trackIdleStatus = function() {
      var timer, wakeUp;
      timer = false;
      wakeUp = function() {
        clearTimeout(timer);
        if (status !== "active") {
          ifvisible.wakeup();
        }
        idleStartedTime = +(new Date());
        return timer = setTimeout(function() {
          if (status === "active") {
            return ifvisible.idle();
          }
        }, idleTime);
      };
      wakeUp();
      addEvent(doc, "mousemove", wakeUp);
      addEvent(doc, "keyup", wakeUp);
      addEvent(doc, "touchstart", wakeUp);
      addEvent(window, "scroll", wakeUp);
      ifvisible.focus(wakeUp);
      return ifvisible.wakeup(wakeUp);
    };
    init = function() {
      var blur;
      if (initialized) {
        return true;
      }
      if (hidden === false) {
        blur = "blur";
        if (ie < 9) {
          blur = "focusout";
        }
        addEvent(window, blur, function() {
          return ifvisible.blur();
        });
        addEvent(window, "focus", function() {
          return ifvisible.focus();
        });
      } else {
        addEvent(doc, visibilityChange, function() {
          if (doc[hidden]) {
            return ifvisible.blur();
          } else {
            return ifvisible.focus();
          }
        }, false);
      }
      initialized = true;
      return trackIdleStatus();
    };
    ifvisible = {
      setIdleDuration: function(seconds) {
        return idleTime = seconds * 1000;
      },
      getIdleDuration: function() {
        return idleTime;
      },
      getIdleInfo: function() {
        var now, res;
        now = +(new Date());
        res = {};
        if (status === "idle") {
          res.isIdle = true;
          res.idleFor = now - idleStartedTime;
          res.timeLeft = 0;
          res.timeLeftPer = 100;
        } else {
          res.isIdle = false;
          res.idleFor = now - idleStartedTime;
          res.timeLeft = (idleStartedTime + idleTime) - now;
          res.timeLeftPer = (100 - (res.timeLeft * 100 / idleTime)).toFixed(2);
        }
        return res;
      },
      focus: function(callback) {
        if (typeof callback === "function") {
          this.on("focus", callback);
        } else {
          status = "active";
          customEvent.fire(this, "focus");
          customEvent.fire(this, "wakeup");
          customEvent.fire(this, "statusChanged", {
            status: status
          });
        }
        return this;
      },
      blur: function(callback) {
        if (typeof callback === "function") {
          this.on("blur", callback);
        } else {
          status = "hidden";
          customEvent.fire(this, "blur");
          customEvent.fire(this, "idle");
          customEvent.fire(this, "statusChanged", {
            status: status
          });
        }
        return this;
      },
      idle: function(callback) {
        if (typeof callback === "function") {
          this.on("idle", callback);
        } else {
          status = "idle";
          customEvent.fire(this, "idle");
          customEvent.fire(this, "statusChanged", {
            status: status
          });
        }
        return this;
      },
      wakeup: function(callback) {
        if (typeof callback === "function") {
          this.on("wakeup", callback);
        } else {
          status = "active";
          customEvent.fire(this, "wakeup");
          customEvent.fire(this, "statusChanged", {
            status: status
          });
        }
        return this;
      },
      on: function(name, callback) {
        init();
        customEvent.add(this, name, callback);
        return this;
      },
      off: function(name, callback) {
        init();
        customEvent.remove(this, name, callback);
        return this;
      },
      onEvery: function(seconds, callback) {
        var paused, t;
        init();
        paused = false;
        if (callback) {
          t = setInterval(function() {
            if (status === "active" && paused === false) {
              return callback();
            }
          }, seconds * 1000);
        }
        return {
          stop: function() {
            return clearInterval(t);
          },
          pause: function() {
            return paused = true;
          },
          resume: function() {
            return paused = false;
          },
          code: t,
          callback: callback
        };
      },
      now: function(check) {
        init();
        return status === (check || "active");
      }
    };
    return ifvisible;
  });

}).call(this);



},{}],2:[function(require,module,exports){
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

},{"ifvisible.js":1}]},{},[2]);
