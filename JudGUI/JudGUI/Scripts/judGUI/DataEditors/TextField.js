
define(['jquery', 'Util/UtilityPieces', 'DataEditors/DataEditorObject'], function ($) {

    (function (scope) {
        var judgui = scope.judgui || {};
        /****************************************************************************/
        /********                        Text Field                     *************/
        /********                   still in development                *************/
        /****************************************************************************/
        // as far as I know, I am not going to be able to make the keyboard appear with
        // this process.  but one can be made from buttons easily enough.

        var TextField = function (text, style) {
            this.name = "TextField";
            this.initialize(text, style);
        }
        
        var p = TextField.prototype = new judgui.DataEditorObject();
        TextField.prototype.DataEditorObject_initialize = p.initialize;

        TextField._Spawner = function (initializerObject) {
            var o = initializerObject || {};
            return new TextField(o['text'], o['style']).position(o['x'], o['y']);
        }

        p._cursorInterval = null;
        p._Cursor = null;

        p.initialize = function (text, style) {
            if (this.DataEditorObject_initialize) this.DataEditorObject_initialize(text, style, true, true);

            this._Cursor = new createjs.Shape();
            this.addChild(this._Cursor);

            this._Cursor.graphics
                .mt(1, 0)
                .ss(1)
                .s(this._Style.color)
                .lt(1, this._Style.fontSize);

            this._Cursor.alpha = 0;
            this._draw();

            return this;
        }

        p.onFocus = function (e) {
            if (this._cursorInterval == null) {
                this._cursorInterval = setInterval(function (context) { context._toggleCursor(); }, 500, this);
            }

            this.removeAllEventListeners('focus.keypress');
            this.removeAllEventListeners('focus.keydown');

            this.on('focus.keypress', function (e) { this.keyPress(e); e.preventDefault(); }, this);
            this.on('focus.keydown', function (e) { this.keyDown(e); e.preventDefault(); }, this);
        };

        p.keyPress = function (e) {
            var keycode = e.rawEvent.keyCode;
            var text = this._Text.text;

            // future development, additional functions for other key codes.
            switch (keycode) {
                default:
                    text = this._addText(keycode, text);
                    break;
            }

            this.Text(text);
        }

        p.keyDown = function (e) {
            var keycode = e.rawEvent.keyCode;
            var text = this._Text.text;

            // future development, additional functions for other key codes.
            switch(keycode) {
                case 8: // delete key code
                    text = this._deleteText(text);
                    break;

                default:
                    break;
            }

            this.Text(text);
        }

        p.onBlur = function (e) {
            clearInterval(this._cursorInterval);
            this._cursorInterval = null;
            this._Cursor.alpha = 0;
            this._draw();
        };
        
        p._deleteText = function (text) {
            return text.length <= 1 ? '' : text.slice(0, text.length - 1);
        }

        p._addText = function (keycode, text) {
            return text + String.fromCharCode(keycode);
        }
        
        p._toggleCursor = function () {
            this._Cursor.alpha = (this._Cursor.alpha + 1) % 2;
            this._draw();
        };

        p._drawText = function (s, b) {
            var t = this._Text;
            this._Text.font = this.FontStyle();
            t.textAlign = 'left';
            t.textBaseline = 'middle';

            var Pos = {
                X: s.paddingLeft + s.borderWidth * 2,
                Y: s.height / 2 + s.borderWidth
            }

            var CursorPos = {
                X: s.paddingLeft + s.borderWidth * 2,
                Y: Pos.Y - s.fontSize / 2
            }

            var linewidth = s.width - (Pos.X + s.paddingRight + s.borderWidth);
            var textWidth = this._Text.getBounds();

            if (textWidth != null) {
                textWidth = textWidth.width;
            }

            if (textWidth > linewidth) {
                Pos.X += linewidth - textWidth;
                CursorPos.X += linewidth;
            }
            else {
                CursorPos.X += textWidth;
            }

            this._Text.x = Pos.X;
            this._Text.y = Pos.Y;
            t.color = s.color;

            this._Cursor.y = CursorPos.Y;
            this._Cursor.x = CursorPos.X;
        }

        judgui.TextField = TextField;
        scope.judgui = judgui;
    }(window));
});