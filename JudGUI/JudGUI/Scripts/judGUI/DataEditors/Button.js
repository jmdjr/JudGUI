
define(['jquery', 'DataEditors/DataEditorObject'], function ($) {

    (function (scope) {
        var judgui = scope.judgui || {};
    /****************************************************************************/
    /********               Buttons used on dialogue display        *************/
    /****************************************************************************/

        var Button = function (text, value, style, clickEvent) {
            this.initialize(text, value, style, clickEvent);
        }

        var p = Button.prototype = new judgui.DataEditorObject();
        Button.prototype.DataEditorObject_initialize = p.initialize;

        Button._Spawner = function (initializerObject) {
            var o = initializerObject || {};
            return new Button(o['text'], o['value'], o['style'], o['clickEvent']).position(o['x'], o['y']);
        }

        p._Value = null;
        p._clickCallback = null;

        p.onFocus = function (e) {
            if (this._clickCallback && e.nativeEvent.button == 0) {
                e.Button = this;
                this._clickCallback(e);
            }
        }

        p.initialize = function (text, value, style, clickEvent) {
            if (this.DataEditorObject_initialize) this.DataEditorObject_initialize(text, style, true, true);

            this._Value = value || 0;
            this._clickCallback = clickEvent || function () { };

            this._draw();
            return this;
        }

        judgui.Button = Button;
        scope.judgui = judgui;
    }(window));
});