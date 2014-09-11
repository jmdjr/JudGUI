
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
        p._Disabled = false;

        // The style of the button, 
        var DefaultStyle = {
            font: "Arial",
            fontSize: 15,
            color: "#000000",
            textAlign: "center",
            textBaseline: "middle",
            borderRadius: 0,
            borderWidth: 1,
            borderColor: "#000000",
            backgroundColor: "#FFFFFF",
            disabledBackgroundColor: "#888888",
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 5,
            paddingBottom: 5,
            height: 30,
            width: 125
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
                this._Text = new createjs.Text(this.FontStyle());
                this.addChild(this._Text);
                this._Text.text = text;
            }

            var borderOffset = s.borderWidth;
            this.setBounds(borderOffset, borderOffset, s.width + borderOffset * 2, s.height + borderOffset * 2);
            this.bounds = this.getBounds();

            this.on('click', function (e) {
                this.onFocus(e);
                this._preventBlur = true;
            }, this);

            this.on('blur', this._blur);
        }

        p.Text = function (text) {
            if (!judgui.IsUndefined(text)) {
                this._Text.text = text;
                this._draw();
            }

            return this._Text.text;
        }

        p.Style = function (style) {
            this._Style = $.extend(true, {}, this._Style, style);
            this._draw();
        }

        p.FontStyle = function () {
            return this._Style.fontSize + "px " + this._Style.font;
        }

        p.Disable = function () {
            this._Disabled = true;
            this._draw();
        }

        p.Enable = function () {
            this._Disabled = false;
            this._draw();
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
            var g = this._Graphic.graphics;

            if (s.backgroundColor != "none") {

                g.f(this._Disabled ? s.disabledBackgroundColor: s.backgroundColor);
            }

            if (s.borderWidth != 0) {
                g.ss(s.borderWidth);
                g.s(s.borderColor);
            }

            g.rr(b.x, b.y, s.width, s.height, s.borderRadius);
        }

        p._drawText = function (s, b) {
            var textBounds = this._Text.getBounds();
            var t = this._Text;
            t.textAlign = s.textAlign.toLowerCase();
            t.textBaseline = s.textBaseline.toLowerCase();

            var xPos = s.paddingLeft + s.borderWidth*2;
            var yPos = s.paddingTop + s.borderWidth*2;

            this._Text.lineWidth = s.width - (xPos + s.paddingRight + s.borderWidth*2);

            switch (t.textAlign) {
                case "left":
                    break;

                case "right":
                    xPos = s.width - (xPos + s.paddingRight + s.borderWidth*2);
                    break;

                case "center":
                    xPos = s.width / 2 + s.borderWidth;
                    break;
            }

            switch (t.textBaseline) {
                case "top":
                    break;

                case "middle":
                    yPos = s.height / 2 + s.borderWidth; //- yPos;
                    break;

                case "bottom":
                    yPos = s.height - s.borderWidth;
                    break;
            }

            this._Text.x = xPos;
            this._Text.y = yPos;
            this._Text.font = this.FontStyle();
            t.color = s.color;
        }

        judgui.DataEditorObject = DataEditorObject;
        scope.judgui = judgui;
    }(window));
});