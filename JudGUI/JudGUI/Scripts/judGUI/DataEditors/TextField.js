﻿
define(['jquery', 'Util/UtilityPieces', 'DataEditors/DataEditorObject'], function ($) {

    (function (scope) {
        var judgui = scope.judgui || {};
        /****************************************************************************/
        /********                        Text Field                     *************/
        /********                   still in development                *************/
        /****************************************************************************/
        // as far as I know, I am not going to be able to make the keyboard appear with
        // this process.

        var TextField = function () {
            this.initialize();
        }
        
        var p = TextField.prototype = new judgui.DataEditorObject();
        TextField.prototype.DataEditorObject_initialize = p.initialize;

        TextField._Spawner = function (initializerObject) {
            var o = initializerObject || {};
            return new TextField(o['text'], o['style']).position(o['x'], o['y']);
        }

        p._cursorInterval = null;
        p._Text = null;
        p._Graphic = null;
        p._Cursor = null;
        p._Text = null;
        p.Style = null;

        p.onFocus = function (e) {
            if (this._cursorInterval == null) {
                this._cursorInterval = setInterval(function (context) { context._toggleCursor(); }, 500, this);
            }

            this.removeAllEventListeners('focus.keypress');
            this.on('focus.keypress', function (e) { this.updateText(e); }, this);
            this.removeAllEventListeners('focus.keydown');
            this.on('focus.keydown', function (e) { this.deleteText(e); }, this);
        };

        p.updateText = function (e) {
            var keycode = e.rawEvent.keyCode;
            var text = this._Text.text;
            text += String.fromCharCode(keycode);
            this.Text(text);
        }

        p.deleteText = function (e) {
            var keycode = e.rawEvent.keyCode;
            var text = this._Text.text;

            if (keycode == 8) {
                if (text.length == 1) {
                    text = '';
                }
                else {
                    text = text.slice(0, text.length - 1);
                }
            }

            this.Text(text);
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
            width: 250
        }

        p.Text = function (text) {
            if (text != null) {
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
                Y: s.paddingBottom + s.borderWidth + 2
            }

            var linewidth = s.width - (Pos.X + s.paddingRight + s.borderWidth);

            var textWidth = this._Text.getBounds();

            if (textWidth != null) {
                textWidth = textWidth.width;
            }

            if (textWidth > linewidth) {
                Pos.X += linewidth - textWidth;
                CursorPos.X = linewidth;
            }
            else {
                CursorPos.X = textWidth;
            }

            this._Text.x = Pos.X;
            this._Text.y = Pos.Y;
            this._Text.font = s.font;
            t.color = s.color;

            if (!this._Cursor.isDrawn) {
                this._Cursor.isDrawn = true;
                this._Cursor.y = CursorPos.Y;
                this._Cursor.graphics
                    .mt(s.paddingLeft + 3, 0)
                    .ss(1)
                    .s(s.color)
                    .lt(s.paddingLeft + 3, s.fontSize);

                this._Cursor.isDrawn = true;
            }

            this._Cursor.x = CursorPos.X;
        }

        p.initialize = function (text, style) {
            if (this.DataEditorObject_initialize) this.DataEditorObject_initialize();
            this.Style = $.extend(true, {}, DefaultStyle, style);
            text = text || "";

            var s = this.Style;

            this.setBounds(0, 0, s.width, s.height);
            this.bounds = this.getBounds();

            this._Graphic = new createjs.Shape();
            this.addChild(this._Graphic);

            p._Cursor = new createjs.Shape();
            this.addChild(this._Cursor);

            this._Text = new createjs.Text(s.font);
            this.addChild(this._Text);

            this._Text.text = text;
            this._Cursor.alpha = 0;
            this._Cursor.isDrawn = false;
            this._draw();

            return this;
        }

        judgui.TextField = TextField;
        scope.judgui = judgui;
    }(window));
});