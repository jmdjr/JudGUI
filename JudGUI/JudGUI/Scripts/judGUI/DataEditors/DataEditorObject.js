
define(['jquery', 'Util/UtilityPieces'], function ($) {

    (function (scope) {
        var judgui = scope.judgui || {};
        /****************************************************************************/
        /********               Buttons used on dialogue display        *************/
        /****************************************************************************/
        var DataEditorObject = function () {
        }

        var p = DataEditorObject.prototype = new createjs.Container();
        DataEditorObject.prototype.Container_init = p.initialize;

        p._preventBlur = false;

        p._Graphic = null;
        p._Text = null;
        p._TextIncluded = true;
        p._GraphicIncluded = true;

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

        p.Text = function (text) {
            if (text) {
                this._Text.text = text;
                this._draw();
            }

            return this._Text.text;
        }

        p.Style = function (style) {
            this._Style = $.extend(true, this._Style, style);
            this._draw();
        }

        p.initialize = function (text, style, addText, addGraphic) {
            if (this.Container_init) this.Container_init();

            this._Style = $.extend(true, {}, DefaultStyle, style);
            text = text || "Default";

            var s = this._Style;
            this._GraphicIncluded = addGraphic;
            this._TextIncluded = addText;

            if (this._GraphicIncluded) {
                this._Graphic = new createjs.Shape();
                this.addChild(this._Graphic);
            }

            if (this._TextIncluded) {
                this._Text = new createjs.Text(s.font);
                this.addChild(this._Text);
                this._Text.text = text;
            }

            this.setBounds(0, 0, s.width, s.height);
            this.bounds = this.getBounds();

            this.on('click', function (e) {
                this.onFocus(e);
                this._preventBlur = true;
            }, this);

            this.on('blur', this._blur);
        }

        p.position = function (x, y) {
            this.x = x;
            this.y = y;

            return this;
        }

        p.onFocus = function (e) { }

        p.onBlur = function (e) { }

        p._blur = function (e) {
            if (this._preventBlur) {
                this._preventBlur = false;
                return;
            }
            this.removeAllEventListeners('focus.keydown');
            this.removeAllEventListeners('focus.keyup');
            this.removeAllEventListeners('focus.keypress');

            this.onBlur(e);
        }

        // call this only when button NEEDS to be re-rendered, as in on initialize and style updates.
        p._draw = function () {
            var b = this.bounds = this.bounds || this.getBounds();
            var s = this._Style;
            
            if (this._GraphicIncluded) {
                this._drawGraphic(s, b);
            }

            if (this._TextIncluded) {
                this._drawText(s, b);
            }

            if (this.cacheCanvas == null) {
                // no cache active, initialze cache.
                this.cache(0, 0, b.width, b.height);
            }
            else {
                this.updateCache();
            }
        }

        p._drawGraphic = function (s, b) {
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

        p._drawText = function (s, b) {
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
                    yPos = s.height / 2; //- yPos;
                    break;

                case "bottom":
                    yPos = s.height;
                    break;
            }

            this._Text.x = xPos;
            this._Text.y = yPos;
            this._Text.font = s.font;
            t.color = s.color;
        }

        judgui.DataEditorObject = DataEditorObject;
        scope.judgui = judgui;
    }(window));
});