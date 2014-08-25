
define(['jquery', 'Util/Utils'], function ($) {

    (function (scope) {
        var judgui = scope.judgui || {};

        /*******************************************************************************************************************************/
        // a single tile in the Simple grid.  
        // contains a value and its coords in the grid, for reference. 
        var GridTile = function (value, x, y) {
            this.value = value;

            if (typeof x !== 'undefined' & typeof y !== 'undefined') {
                this.coords = { x: x, y: y };
            }
        }

        var p = GridTile.prototype;

        p.toString = function () {
            if (typeof $this.value !== 'undefined' && $this.value != null) {
                return $this.value.toString();
            }
            return 'NDF';
        };

        p.removeValue = function () {
            var o = this.value;
            this.value = null;
            return o;
        }

        p.addValue = function (value) {
            this.value = value;
        }

        judgui._NULL_TILE_ = new judgui.GridTile(null, -1, -1);
        judgui.Button = Button;
        scope.judgui = judgui;
    }(window));
});