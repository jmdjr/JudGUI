
define(['jquery'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

        var BackgroundContainer = function () {
        }

        var p = BackgroundContainer.prototype = new createjs.Container();
        p.Container_init = p.initialize;

        // The style of the button, 
        var DefaultStyle = {
            borderRadius: 0,
            borderWidth: 1,
            borderColor: "#000000",
            backgroundColor: "#00FF00",
            height: null,
            width: null
        }

        p._Engine = null;
        p._Style = null;
        p._Graphic = null;

        // adds functions and variables related to establishing backgrounds for containers.
        p.initialize = function (style) {
            if (this.Container_init) this.Container_init();

            this._Style = $.extend(true, {}, DefaultStyle, style);

            this._Graphic = new createjs.Shape();
            this.addChild(this._Graphic);

        }

        p.ExtendStyle = function (style) {
            $.extend(true, this._Style, style);
        }

        p._drawBackground = function () {
            var b = this.bounds = this.bounds || this.getBounds();
            var s = this._Style;

            var g = this._Graphic.graphics;

            if (s.backgroundColor != "none") {
                g.f(s.backgroundColor);
            }

            if (s.borderWidth != 0) {
                g.ss(s.borderWidth);
                g.s(s.borderColor);
            }

            g.rr(b.x, b.y, s.width, s.height, s.borderRadius);
        }

        p.SetEngine = function (engine) {
            this.Engine = engine;
            var s = this._Style;
            this.setBounds(0, 0, this.Engine.bounds.width, this.Engine.bounds.height);

            if (s.height == null) {
                s.height = this.Engine.bounds.height;
            }

            if (s.width === null) {
                s.width = this.Engine.bounds.width;
            }

            this._drawBackground();
        }

        judgui.BackgroundContainer = BackgroundContainer;
        scope.judgui = judgui;
    }(window));
});