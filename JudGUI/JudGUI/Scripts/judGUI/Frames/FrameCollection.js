
/*********************************************************************************************
      Engine Construct for Frames and States, since these two contain similar functionality.
*********************************************************************************************/

define(['jquery', 'Util/Utils', 'Frames/Frame', 'Frames/Transitions'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

        var FrameCollection = function (name) {
            this.initialize(name);
        }

        var p = FrameCollection.prototype = new createjs.Container();
        FrameCollection.prototype.inherited_init = FrameCollection.initialize;

        p.bounds = null;

        // loads a Frame into the state hash, for safe keeping.
        p.add = function (name, frame) {

            if (judgui.IsUndefined(frame)) {
                debugger;
                $.error('JDGE: FrameCollection: Initialization error 0003 - New Frame added is undefined');
            }

            if (typeof frame === "function") {
                frame = new judgui.Frame(frame);
            }

            frame.Engine = this.Engine;

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

        p.Engine = null;
        p.Frames = null;
        p.isPaused = false;
        p.runningFrame = null;

        p.initialize = function (name) {
            if (this.inherited_init) this.inherited_init();

            this.Engine = null;
            this.Frames = new judgui.HashTable();
            this.isPaused = false;
            this.runningFrame = null;
            this.bounds = this.getBounds();

            // adds transition functionality.
            judgui.MakeTransitionable.call(this);

            return this;
        }

        judgui.FrameCollection = FrameCollection;
        scope.judgui = judgui;
    }(window));
});