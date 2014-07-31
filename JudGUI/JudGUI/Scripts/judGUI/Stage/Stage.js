
define(['jquery'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

        judgui._JD_DEBUG_ = false;

        var Stage = function (height, width, target) {
            this.initialize(height, width, target);
        }

        var p = Stage.prototype;

        p.addChild = function (child) {
            this.stage.addChild(child);
        }

        p.initialize = function (height, width, target) {
            this.canvas = document.createElement(navigator.isCocoonJS ? 'screencanvas' : 'canvas');

            this.canvas.width = width;
            this.canvas.height = height;

            this.context = this.canvas.getContext("2d");

            if (target) {
                $(target).append(this.canvas);
            }
            else {
                document.body.appendChild(this.canvas);
            }

            this.stage = new createjs.Stage(this.canvas);
            this.stage.setBounds(0, 0, this.canvas.width, this.canvas.height);
            this.bounds = this.stage.getBounds();

            //if (judgui._JD_DEBUG_) {
            //    var debugBox = new createjs.Shape();
            //    debugBox.graphics.s("#0000ff").r(this.x, this.y, this.bounds.width, this.bounds.height);
            //    this.stage.addChild(debugBox);
            //}

            createjs.Ticker.setFPS(30);
            createjs.Ticker.addEventListener('tick', this.stage);

            this.on = function (eventLabel, listener) {
                this.stage.on(eventLabel, listener);
            }
        }

        judgui.Stage = Stage;
        scope.judgui = judgui;
    }(window));
});