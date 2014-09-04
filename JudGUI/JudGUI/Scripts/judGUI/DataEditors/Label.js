
define(['jquery', 'Util/UtilityPieces'], function ($) {

    (function (scope) {
        var judgui = scope.judgui || {};

        /****************************************************************************/
        /********               Buttons used on dialogue display        *************/
        /****************************************************************************/

        var Label = function () {
            //this.initialize(); // not necessary
        }

        var p = Label.prototype = new createjs.Container();
        Label.prototype.Container_init = p.initialize;

        p.initialize = function () {
            if (this.Container_init) this.Container_init();
        }

        judgui.Label = Label;
        scope.judgui = judgui;
    }(window));
});