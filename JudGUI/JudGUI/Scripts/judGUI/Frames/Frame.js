
/*********************************************************************************************
        Frame Constructor
*********************************************************************************************/

define(['jquery', 'Util/Utils', 'Frames/Transitions', 'Frames/BackgroundContainer'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

        var Frame = function (style, initializer) {
            this.initialize(style, initializer);
        }

        var p = Frame.prototype = new judgui.BackgroundContainer();

        p.bounds = null;

        p.Frame_init = p.initialize = function (style, initializer) {
            this.BackgroundContainer_init(style);

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
                return this.addChild(name);
            } else if (!judgui.IsUndefined(judgui[name]) && !judgui.IsUndefined(judgui[name]._Spawner)) {
                return this.addChild(new judgui[name]._Spawner(initialize));
            }

            return null;
        }

        p.FrameCollection = function () {
            return this.parent;
        }

        judgui.Frame = Frame;
        scope.judgui = judgui;
    }(window));
});