
define(['jquery'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

        // the default design of Frames.  the design is either a single shape element which will match
        // the properties defined, or its an image URL which will be attached as a Bitmap.
        var background = {
            imageURL: '',     //if defined, attempts to create a bitmap using this url.
            height: null,     //if set to null, will set to dimension of engine.
            width: null,      //if set to null, will set to dimension of engine.
            borderWidth: 3,
            borderColor: '#000000',
            backgroundColor: '#00FF00',
            borderRadius: 0
        };

        // adds functions and variables related to establishing backgrounds for containers.
        var MakeFramingBackground = function () {

            this.Engine = null;
            this._Style = background;
            this._Graphic = new createjs.Shape();
            this.addChild(this._Graphic);

            this._extendStyle = function (style) {
                $.extend(true, this._Style, style);

            }

            this._drawBackground = function () {
                var b = this.bounds = this.bounds || this.getBounds();
                var s = this._Style;

                if (s.borderWidth == 0) {
                    this._Graphic.graphics
                    .f(s.backgroundColor)
                    .rr(b.x, b.y, s.width, s.height, s.borderRadius);
                }
                else {
                    this._Graphic.graphics
                    .ss(s.borderWidth)
                    .s(s.borderColor)
                    .f(s.backgroundColor)
                    .rr(b.x, b.y, s.width, s.height, s.borderRadius);
                }
            }

            this.SetEngine = function (engine) {
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
        }

        judgui.MakeFramingBackground = MakeFramingBackground;
        scope.judgui = judgui;
    }(window));
});