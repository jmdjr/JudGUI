
/*********************************************************************************************
        Frame Constructor
*********************************************************************************************/

define(['jquery', 'Util/Utils', 'Frames/Transitions'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

        var Frame = function (initializer) {
            this.initialize(initializer);
        }

        var p = Frame.prototype = new createjs.Container();
        Frame.prototype.inherited_init = p.initialize;

        p.Engine = null;
        p.bounds = null;

        p.initialize = function (initializer) {
            if (this.inherited_init) this.inherited_init();

            judgui.MakeTransitionable.call(this);
            this.bounds = this.getBounds();

            if (typeof initializer === 'function') {
                initializer.call(this);
            }

            return this;
        }

        // adds a new element to this frame based on name, accepts multiple arguments for initializing the element
        p.add = function (name, initialize) {
            if (name instanceof createjs.DisplayObject) {
                this.addChild(name);
            } else if (!(!(judgui[name]) || !(judgui[name]._Spawner))) {
                this.addChild(new judgui[name]._Spawner(initialize));
            }
        }

        judgui.Frame = Frame;
        scope.judgui = judgui;
    }(window));
});