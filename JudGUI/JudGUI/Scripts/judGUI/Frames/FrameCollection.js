
/*********************************************************************************************
      Engine Construct for Frames and States, since these two contain similar functionality.
*********************************************************************************************/

define(['jquery', 'Frames/Frame'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

        var FrameCollection = function (name, style) {
            if (!judgui.IsUndefined(name)) {  // if the name is missing, hold off on initializing it.
                this.initialize(name, style);
            }
        }

        var p = FrameCollection.prototype = new judgui.BackgroundContainer();

        p.bounds = null;

        p.Frames = null;
        p.isPaused = false;
        p.runningFrame = null;

        p.FrameCollection_init = p.initialize = function (name, style) {
            this.BackgroundContainer_init(style);

            this.name = name;
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
            if (judgui.IsUndefined(frame)) {
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

        // Empty function signature for overloading. 
        p.loadFrames = function () { }

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
                        $FC.removeChild(this);
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