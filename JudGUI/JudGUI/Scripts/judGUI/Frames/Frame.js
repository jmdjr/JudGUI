
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

        p.initialize = function (initializer) {
            if (this.inherited_init) this.inherited_init();

            judgui.MakeTransitionable.call(this);

            if (typeof initializer === 'function') {
                initializer.call(this);
            }
            return this;
        }

        judgui.Frame = Frame;
        scope.judgui = judgui;
    }(window));
});