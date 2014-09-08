
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
        p._Cursor = null;

        p.onFocus = function (e) {
            if (this._cursorInterval == null) {
                this._cursorInterval = setInterval(function (context) { context._toggleCursor(); }, 500, this);
            }

            this.removeAllEventListeners('focus.keypress');
            this.removeAllEventListeners('focus.keydown');

            this.on('focus.keypress', function (e) { this.updateText(e); }, this);
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

        p._drawText = function (s, b) {
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
            debugger;
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
            if (this.DataEditorObject_initialize) this.DataEditorObject_initialize(text, style, true, true);

            this._Cursor = new createjs.Shape();
            this.addChild(this._Cursor);

            this._Cursor.alpha = 0;
            this._Cursor.isDrawn = false;
            this._draw();

            return this;
        }

        judgui.TextField = TextField;
        scope.judgui = judgui;
    }(window));
});