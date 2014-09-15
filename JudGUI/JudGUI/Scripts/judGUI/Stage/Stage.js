
define(['jquery', 'DataEditors/DataEditorObject'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

        var Stage = function (height, width, target) {
            this.initialize(height, width, target);
        }

        var p = Stage.prototype;

        p.addChild = function (child) {
            this._Stage.addChild(child);
        }

        p.on = function (eventLabel, listener) {
            this._Stage.on(eventLabel, listener);
        }

        p._Stage = null;
        p._Canvas = null;
        p._Context = null;

        p._dispatchEvent = function (e, target) {

            if (judgui.IsUndefined(target.children)) {
                target.dispatchEvent(e);
                return;
            }

            var i = 0;

            while (i < target.children.length) {
                this._dispatchEvent(e, target.children[i++]);
            }

            if (!(target instanceof judgui.Stage)) {
                target.dispatchEvent(e);
            }
        }

        p.initialize = function (height, width, target) {
            this._Canvas = document.createElement(navigator.isCocoonJS ? 'screencanvas' : 'canvas');

            this._Canvas.width = width;
            this._Canvas.height = height;
            
            this._Context = this._Canvas.getContext("2d");

            if (target) {
                $(target).append(this._Canvas);
            }
            else {
                document.body.appendChild(this._Canvas);
            }

            // Makes the canvas focusable for text fields.
            this._Canvas.tabIndex = 1000;
            $(this._Canvas).css('outline', 'none');

            this._Stage = new createjs.Stage(this._Canvas);
            this._Stage.setBounds(0, 0, this._Canvas.width, this._Canvas.height);
            this.bounds = this._Stage.getBounds();

            this._Stage.enableMouseOver(20);

            createjs.Ticker.setFPS(60);
            createjs.Ticker.addEventListener('tick', this._Stage);

            var $_Stage = this._Stage;
            var $_this = this;

            this._Canvas.onclick = function (e) {
                $_this._dispatchEvent('blur', $_Stage);
            }

            this._Canvas.onkeydown = function (e) {
                var event = new createjs.Event('focus.keydown');
                event.rawEvent = e;
                $_this._dispatchEvent(event, $_Stage);
            }

            this._Canvas.onkeypress = function (e) {
                var event = new createjs.Event('focus.keypress');
                event.rawEvent = e;
                $_this._dispatchEvent(event, $_Stage);
            }

            this._Canvas.onkeyup = function (e) {
                var event = new createjs.Event('focus.keyup');
                event.rawEvent = e;
                $_this._dispatchEvent(event, $_Stage);
            }
        }

        judgui.Stage = Stage;
        scope.judgui = judgui;
    }(window));
});