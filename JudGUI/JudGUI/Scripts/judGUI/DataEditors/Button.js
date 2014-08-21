
define(['jquery', 'Util/Utils'], function ($) {

    (function (scope) {
        var judgui = scope.judgui || {};
    /****************************************************************************/
    /********               Buttons used on dialogue display        *************/
    /****************************************************************************/


        var Button = function (text, value, style, clickEvent) {
            this.initialize(text, value, style, clickEvent);
        }

        var p = Button.prototype = new createjs.Container();
        Button.prototype.inherited_init = p.initialize;

        p._Graphic = null;
        p._Text = null;
        p._Value = null;
        p._clickCallback = null;

        // The style of the button, 
        var DefaultStyle = {
            font: "15px Arial",
            color: "#000000",
            textAlign: "center",
            textBaseline: "middle",
            borderRadius: 0,
            borderWidth: 1,
            borderColor: "#000000",
            backgroundColor: "#FFFFFF",
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 5,
            paddingBottom: 5,
            height: 30,
            width: 125
        }

        p.Style = DefaultStyle;

        p.Text = function (text) {
            if (text) {
                this._Text.text = text;
                this._drawButton();
            }

            return this._Text.text;
        }

        // call this only when button NEEDS to be re-rendered, as in on initialize and style updates.
        p._drawButton = function () {

            var b = this.bounds = this.bounds || this.getBounds();
            var s = this.Style;
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

            var textBounds = this._Text.getBounds();
            var t = this._Text;
            t.textAlign = s.textAlign.toLowerCase();
            t.textBaseline = s.textBaseline.toLowerCase();

            var xPos = s.paddingLeft + s.borderWidth;
            var yPos = s.paddingTop + s.borderWidth;

            this._Text.lineWidth = s.width - (xPos + s.paddingRight + s.borderWidth);

            switch (t.textAlign) {
                case "left":
                    break;

                case "right":
                    xPos = s.width - (xPos + s.paddingRight + s.borderWidth);
                    break;

                case "center":
                    xPos = s.width / 2;
                    break;
            }

            switch (t.textBaseline) {
                case "top":
                    break;

                case "middle":
                    yPos = s.height / 2;
                    break;

                case "bottom":
                    yPos = s.height;
                    break;
            }

            this._Text.x = xPos;
            this._Text.y = yPos;
            this._Text.font = s.font;
            t.color = s.color;

            if (this.cacheCanvas == null) {
                // no cache active, initialze cache.
                this.cache(0, 0, b.width, b.height);
            }

        }

        p.position = function (x, y) {
            this.x = x;
            this.y = y;

            return this;
        }

        p.enableClick = function () {
        };

        p.initialize = function (text, value, style, clickEvent) {
            if (this.inherited_init) this.inherited_init();

            $.extend(true, this.Style, style);

            var s = this.Style;
            this._Value = value;
            this._clickCallback = clickEvent;

            this.setBounds(0, 0, s.width, s.height);
            this.bounds = this.getBounds();

            this._Graphic = new createjs.Shape();
            this.addChild(this._Graphic);

            this._Text = new createjs.Text(s.font);
            this.addChild(this._Text);

            this.on('click', function (e) {
                if (this._clickCallback && e.nativeEvent.button == 0) {
                    e.Button = this;
                    this._clickCallback(e);
                }
            }, this);

            // calls necessary rendering and caching functions.
            this.Text(text);
        }

        judgui.Button = Button;
        scope.judgui = judgui;
    }(window));
});