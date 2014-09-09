
/*********************************************************************************************
      Engine Construct for Frames and States, since these two contain similar functionality.
*********************************************************************************************/

define(['jquery', 'Util/Utils', 'Frames/Frame', 'Frames/Transitions'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

        var FrameCollection = function (style, name) {
            this.initialize(style, name);
        }

        var p = FrameCollection.prototype = new judgui.BackgroundContainer();
        p.BackgroundContainer_initialize = p.initialize;

        p.bounds = null;

        p.Frames = null;
        p.isPaused = false;
        p.runningFrame = null;

        p.initialize = function (style, name) {
            if (this.BackgroundContainer_initialize) this.BackgroundContainer_initialize(style);

            this.Frames = new judgui.HashTable();
            this.isPaused = false;
            this.runningFrame = null;
            this.bounds = this.getBounds();

            // adds transition functionality.
            judgui.MakeTransitionable.call(this);

            return this;
        }

        // loads a Frame into the state hash, for safe keeping.
        p.add = function (name, frame) {

            if (typeof name !== 'string') {
                throw Error('JDGE: FrameCollection: Initialization error 0001 - New Frame name is not a string.');
            }
            
            if ( judgui.IsUndefined(frame)) {
                // creates a dummy frame and returns it.
                frame = new judgui.Frame();
            }
            else if (typeof frame === "function") {
                frame = new judgui.Frame(frame);
            }

            frame.SetEngine(this.Engine);

            this.Frames.push(name, frame);

            // this frame is its first...
            if (this.Frames.length == 1) {
                this.goto(name);
            }
        }

        p._nextFrameEnter = function (nextFrame) {
            this.addChild(nextFrame);
            var $FC = this;
            nextFrame.enterIn(function () {
                $FC.runningFrame = this;
                $FC.isPaused = false;
            });
        }

        // moves the currently running state to the one being named.
        p.goto = function (frameName, wait4RunningFrame) {

            if (this.Frames.indexOf(frameName) == -1) {
                debugger;
                $.error("JDGE: FrameCollection: 0000 - Goto: 'frameName' not found.");
            }

            var nextFrame = this.Frames[frameName];

            if (!(nextFrame instanceof judgui.Frame)) {
                debugger;
                $.error("JDGE: FrameCollection: 0001 - Goto: Frame failed to be retrieved.");
            }
            if (!judgui.IsUndefined(this.runningFrame)) {
                this.isPaused = true;
                var $FC = this;
                if (wait4RunningFrame) {

                    this.runningFrame.exitOut(function () {
                        $FC.removeChild(Frame);
                        $FC._nextFrameEnter(nextFrame);
                    });
                }
                else {
                    this.isPaused = true;
                    this.runningFrame.exitOut(function () {
                        $FC.removeChild(this);
                    });

                    this._nextFrameEnter(nextFrame);
                }
            }
            else {
                this._nextFrameEnter(nextFrame);
            }
        }

        p.update = function () {
            if (!this.isPaused && !judgui.IsUndefined(this.runningFrame)) {
                this.runningFrame.update();
            }
        }

        p.position = function(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }

        judgui.FrameCollection = FrameCollection;
        scope.judgui = judgui;
    }(window));
});