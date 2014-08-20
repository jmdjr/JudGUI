
define(['jquery', 'Util/Utils'], function ($) {

    (function (scope) {
        var judgui = scope.judgui || {};
    /****************************************************************************/
    /********               Buttons used on dialogue display        *************/
    /****************************************************************************/


        var Button = function (text, value, style, clickEvent) {
            this.initialize(text, value, style, clickEvent);
        }

        var p = Button.prototype = new createjs.Container();
        Button.prototype.inherited_init = p.initialize;

        p._Graphic = null;
        p._Text = null;
        p._Value = null;
        p._clickCallback = null;

        // The style of the button, 
        var DefaultStyle = {
            font: "12px Arial",
            color: "#000000",
            textAlign: "",
            borderRadius: 0,
            borderWidth: 1,
            borderColor: "#000000",
            backgroundColor: "#FFFFFF",
            height: 30,
            width: 125
        }

        p.Style = DefaultStyle;

        p.Text = function (text) {
            if (text) {
                this._Text.text = text;
                this._drawButton();
            }

            return this._Text.text;
        }

        // call this only when button NEEDS to be re-rendered, as in on initialize and style updates.
        p._drawButton = function () {
            var b = this.bounds = this.bounds || this.getBounds();
            var s = this.Style;

            this._Graphic.graphics
            .s(s.borderColor)
            .f(s.backgroundColor)
            .rr(b.x, b.y, s.width, s.height, s.borderRadius);

            var textBounds = this._Text.getBounds();
            var t = this._Text;
            t.textAlign = s.textAlign;
            t.color = s.color;

            if (this.cacheCanvas == null) {
                // no cache active, initialze cache.
            }

        }

        p.position = function (x, y) {
            this.x = x;
            this.y = y;

            return this;
        }

        p.enableClick = function () {
            this.on('click', function (e) {
                if (this._clickCallback) {
                    e.Button = this;
                    this._clickCallback(e);
                }
            }, this);
        };
        
        p.disableClick = function () {
            this.off('click');
        };

        p.initialize = function (text, value, style, clickEvent) {
            if (this.inherited_init) this.inherited_init();

            $.extend(true, this.Style, style);

            var s = this.Style;
            this._Value = value;
            this._clickCallback = clickEvent;

            this.setBounds(0, 0, s.width, s.height);
            this.bounds = this.getBounds();

            this._Graphic = new createjs.Shape();
            this.addChild(this._Graphic);

            this._Text = new createjs.Text();
            this.addChild(this._Text);
            this.enableClick();

            // calls necessary rendering and caching functions.
            this.Text(text);

            //this.reuseButton = function (text, value, fontcolor, fillcolor, strokecolor) {
            //    var b = $this.bounds = $this.bounds || $this.getBounds();
            //    fillcolor = fillcolor || "silver";
            //    strokecolor = strokecolor || "black";
            //    fontcolor = fontcolor || "black";
            //    value = value || 0;
            //    text = text || "";

            //    $this.value = value;

            //    if ($this.buttonGraphic) {
            //        $this.buttonGraphic.graphics
			//		    .s(strokecolor)
			//		    .f(fillcolor)
			//		    .rr(b.x, b.y, b.width, b.height, 15);
            //    }

            //    if ($this.buttonText) {
            //        $this.buttonText.text = text;
            //        var tb = $this.buttonText.getBounds();
            //        $this.buttonText.y = b.height / 2 - tb.height * 2 / 3;
            //        $this.buttonText.x = b.width / 2;
            //        $this.buttonText.textAlign = "center";
            //        $this.buttonText.lineWidth = b.width - 10;
            //        $this.buttonText.color = fontcolor;
            //    }
            //}

            // this.reuseButton(buttonText, buttonValue);
        }

        judgui.Button = Button;
        scope.judgui = judgui;
    }(window));
});