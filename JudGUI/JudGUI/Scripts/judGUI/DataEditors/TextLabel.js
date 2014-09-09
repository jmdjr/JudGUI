
define(['jquery', 'Util/UtilityPieces', 'DataEditors/DataEditorObject'], function ($) {

    (function (scope) {
        var judgui = scope.judgui || {};
        /****************************************************************************/
        /********                        Text Label                     *************/
        /********                   still in development                *************/
        /****************************************************************************/

        var TextLabel = function (text, style) {
            this.initialize(text, style);
        }

        var p = TextLabel.prototype = new judgui.DataEditorObject();
        TextLabel.prototype.DataEditorObject_initialize = p.initialize;

        TextLabel._Spawner = function (initializerObject) {
            var o = initializerObject || {};
            return new TextLabel(o['text'], o['style']).position(o['x'], o['y']);
        }

        p.onFocus = function (e) {
            // do nothing.
        };

        p.initialize = function (text, style) {

            var labelDefaults = {
                backgroundColor: "none",
                borderWidth: 0
            };

            style = $.extend(true, labelDefaults, style);

            if (this.DataEditorObject_initialize) this.DataEditorObject_initialize(text, style, true, true);

            this._draw();
        }

        judgui.TextLabel = TextLabel;
        scope.judgui = judgui;
    }(window));
});