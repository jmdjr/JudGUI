
/*********************************************************************************************
      Engine Construct for Frames and States, since these two contain similar functionality.
*********************************************************************************************/

define(['jquery'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

jdge.FrameCollection = function (name) {
    this.initialize(name);
}

var p = jdge.FrameCollection.prototype = new createjs.Container();
jdge.FrameCollection.prototype.inherited_init = jdge.FrameCollection.initialize;

p.initialize = function (name) {
    if (this.inherited_init) this.inherited_init();

    var $this = this;
    this.Engine = null;
    this.Frames = [];

    this.level = 0;

    this.isPaused = false;
    this.runningFrame = null;

    // adds transition functionality.
    jdge.MakeTransitionable.call(this);

    // loads a Frame into the state hash, for safe keeping.
    this.add = function (name, frame) {
        var newFrame = null;

        if (jdge.IsUndefined(frame)) {
            $.error('JDGE: FrameCollection: Initialization error 0003 - New Frame added is undefined');
        }

        if (frame instanceof jdge.Frame) {
            newFrame = jdge.Frame;
        }
        else if (typeof frame === "function") {
            newFrame = new jdge.Frame(frame);
        }

        newFrame.Engine = $this.Engine;
        var frames = jdge.hashPush($this.Frames, name, newFrame);

        // this frame is its first...
        if (frames.length == 1) {
            this.goto(name);
        }
    }

    // moves the currently running state to the one being named.
    this.goto = function (frameName, wait4RunningFrame) {

        if ($this.Frames.indexOf(frameName) == -1) {
            $.error("JDGE: FrameCollection: 0000 - Goto: 'frameName' not found.");
        }

        var nextFrame = $this.Frames[frameName];

        if (!(nextFrame instanceof jdge.Frame)) {
            $.error("JDGE: FrameCollection: 0001 - Goto: Frame failed to be retrieved.");
        }

        var nextFrameEnter = function () {
            $this.addChild(nextFrame);
            nextFrame.enterIn(function (Frame) {
                $this.runningFrame = Frame;
            });
        }

        if (!jdge.IsUndefined($this.runningFrame)) {
            $this.isPaused = true;
            if (wait4RunningFrame) {
                $this.runningFrame.exitOut(function (Frame) {
                    $this.removeChild(Frame);
                    nextFrameEnter();
                    $this.isPaused = false;
                });
            }
            else {
                $this.runningFrame.exitOut(function (Frame) {
                    $this.removeChild(Frame);
                    $this.isPaused = false;
                });
                nextFrameEnter();
            }
        }
        else {
            nextFrameEnter();
        }
    }

    this.update = function () {
        if (!$this.isPaused && !jdge.IsUndefined($this.runningFrame)) {
            $this.runningFrame.update();
        }
    }

    this.enter = function () { }
    this.exit = function () { }
    return $this;
}

judgui.Stage = Stage;
    }(window));
});