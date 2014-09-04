
define(['jquery', 'Util/UtilityPieces', 'DataEditors/DataEditorObject'], function ($) {

    (function (scope) {
        var judgui = scope.judgui || {};
        /****************************************************************************/
        /********               Buttons used on dialogue display        *************/
        /****************************************************************************/
        var TextField = function () {
            this.initialize();
        }
        
        var p = TextField.prototype = new judgui.DataEditorObject();
        TextField.prototype.DataEditorObject_initialize = p.initialize;

        TextField._Spawner = function (initializerObject) {
            var o = initializerObject || {};
            return new TextField(o['text'], o['style']).position(o['x'], o['y']);
        }

        p._Text = null;
        p._cursorInterval = null;

        p.onFocus = function (e) {
            if (this._cursorInterval == null) {
                this._cursorInterval = setInterval(function (context) { context._toggleCursor(); }, 500, this);
            }

            this.on('focus.keydown', function (e) { this.updateText(e); }, this);
        };

        p.updateText = function (e) {
            debugger;
        }


        p.onBlur = function (e) {
            clearInterval(this._cursorInterval);
            this._cursorInterval = null;
            this._Cursor.alpha = 0;
            this._draw();
        };
        
        p._toggleCursor = function () {
            this._Cursor.alpha = (this._Cursor.alpha + 1) % 2;
            this._draw();
        };

        p._Graphic = null;
        p._Cursor = null;
        p._Text = null;

        // The style of the button, 
        var DefaultStyle = {
            font: "15px Arial",
            fontSize: 15,
            color: "#000000",
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

        p.Style = $.extend(true, {}, DefaultStyle);

        p.Text = function (text) {
            if (text) {
                this._Text.text = text;
                this._draw();
            }

            return this._Text.text;
        }

        p.UpdateStyle = function (style) {
            $.extend(true, this.Style, style);
            this._draw();
        }

        // call this only when button NEEDS to be re-rendered, as in on initialize and style updates.
        p._draw = function () {
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

            this._drawTextAndCursor(s, b);

            if (this.cacheCanvas == null) {
                // no cache active, initialze cache.
                this.cache(0, 0, b.width, b.height);
            }
            else {
                this.updateCache();
            }
        }

        p._drawTextAndCursor = function (s, b) {

            var textBounds = this._Text.getBounds();
            var t = this._Text;
            t.textAlign = 'left';
            t.textBaseline = 'middle';

            var Pos = {
                X: s.paddingLeft + s.borderWidth,
                Y: s.height / 2
            }

            var CursorPos = {
                X: s.paddingLeft + s.borderWidth,
                Y: s.paddingBottom + s.borderWidth
            }

            var linewidth = s.width - (Pos.X + s.paddingRight + s.borderWidth);

            var textWidth = this._Text.getMeasuredWidth();

            if (textWidth > linewidth) {
                Pos.X += linewidth - textWidth - s.paddingRight - s.borderWidth - 1;
                CursorPos.X = linewidth;
            }
            else {
                CursorPos.X += textWidth + Pos.X;
            }

            this._Text.x = Pos.X;
            this._Text.y = Pos.Y;
            this._Text.font = s.font;
            t.color = s.color;

            this._Cursor.graphics
                .mt(CursorPos.X, CursorPos.Y)
                .ss(1)
                .s(s.color)
                .lt(CursorPos.X, CursorPos.Y + s.fontSize);
        }

        p.initialize = function (text, style) {
            if (this.DataEditorObject_initialize) this.DataEditorObject_initialize();

            $.extend(true, this.Style, style);
            text = text || "Testing";

            var s = this.Style;

            this.setBounds(0, 0, s.width, s.height);
            this.bounds = this.getBounds();

            this._Graphic = new createjs.Shape();
            this.addChild(this._Graphic);

            p._Cursor = new createjs.Shape();
            this.addChild(this._Cursor);

            this._Text = new createjs.Text(s.font);
            this.addChild(this._Text);

            // calls necessary rendering and caching functions.
            this.Text(text);

            this._Cursor.alpha = 0;
            this._draw();

            return this;
        }

        judgui.TextField = TextField;
        scope.judgui = judgui;
    }(window));
});