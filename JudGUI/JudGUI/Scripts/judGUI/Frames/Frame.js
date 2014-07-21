
/*********************************************************************************************
        Frame Constructor
*********************************************************************************************/

define(['jquery'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

var Frame = function (initializer) {
    this.initialize(initializer);
}

var p = Frame.prototype = new createjs.Container();

Frame.prototype.inherited_init = p.initialize;

Frame.prototype.initialize = function (initializer) {
    if (this.inherited_init) this.inherited_init();
    this.Engine = null;

    jdge.MakeTransitionable.call(this);

    if (typeof initializer === 'function') {
        initializer.call(this);
    }

    return $this;
}

judgui.Frame = Frame;
    }(window));
});