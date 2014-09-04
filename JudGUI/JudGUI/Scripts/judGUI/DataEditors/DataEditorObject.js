
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

        p.initialize = function () {
            if (this.Container_init) this.Container_init();

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

        judgui.DataEditorObject = DataEditorObject;
        scope.judgui = judgui;
    }(window));
});