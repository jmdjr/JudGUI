
/*********************************************************************************************
        Frame Constructor
*********************************************************************************************/

define(['jquery', 'Util/Utils', 'Frames/Transitions', 'Frames/Backgrounds'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

        var Frame = function (style, initializer) {
            this.initialize(style, initializer);
        }

        var p = Frame.prototype = new judgui.BackgroundContainer();
        p.BackgroundContainer_initialize = p.initialize;

        p.bounds = null;

        p.initialize = function (style, initializer) {
            if (this.BackgroundContainer_initialize) this.BackgroundContainer_initialize(style);

            judgui.MakeTransitionable.call(this);

            this.bounds = this.getBounds();

            if (typeof design === 'object') {
                this._extendStyle(design);

                if (typeof initializer === 'function') {
                    initializer.call(this);
                }

            } else if (typeof design === 'function') {
                design.call(this);
            }

            return this;
        }

        // adds a new element to this frame based on name, accepts multiple arguments for initializing the element
        // returns whether or not adding the element was attempted.
        p.add = function (name, initialize) {
            if (name instanceof createjs.DisplayObject) {
                this.addChild(name);
                return true;
            } else if (!judgui.IsUndefined(judgui[name]) && !judgui.IsUndefined(judgui[name]._Spawner)) {
                this.addChild(new judgui[name]._Spawner(initialize));
                return true;
            }
            return false;
        }

        p.FrameCollection = function () {
            return this.parent;
        }

        judgui.Frame = Frame;
        scope.judgui = judgui;
    }(window));
});