
define(['jquery'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

        // transitions used by any Transitionable object.  
        // a 'transitionable' object is any object that calls 'MakeTransitionable' function below.
        var FrameTransitions = {

            // Transitions meant for making Frames appear
            in: {
                Fade: function () {
                    this.alpha = 0;
                    return this._Tween().to({ alpha: 1 }, this.transitionInDuration);
                }
            },

            // Transitions meant for making Frames disappear
            out: {
                Fade: function () {
                    this.alpha = 1;
                    return this._Tween().to({ alpha: 0 }, this.transitionOutDuration);
                }
            }
        }

        // adds functions and variables related to transitionable container.
        var MakeTransitionable = function () {

            this._Tween = function () { return createjs.Tween.get(this); };

            this.transitionIn = FrameTransitions.in.Fade;
            this.transitionInDuration = 1000;

            this.transitionOut = FrameTransitions.out.Fade;
            this.transitionOutDuration = 1000;


            //Called immidiately before running enterTansition
            this.enter = this.enter || function () { };

            //Called on every tick
            this.update = this.update || function () { };

            //Called immidiately after running exitTransition
            this.exit = this.exit || function () { };

            // combines the enter and transitionIn funcitonality 
            this.enterIn = function (enterCall) {
                this.mouseChildren = false;

                this.enter();
                if (typeof this.transitionIn === "function") {

                    this.transitionIn().call(function () {
                        this.mouseChildren = true;
                        if (typeof enterCall === "function") {
                            enterCall(this);
                        }
                    });
                }
            };

            // combines the exit and transitionOut functionality
            this.exitOut = function (exitCall) {

                this.mouseChildren = false;
                if (typeof this.transitionOut === "function") {

                    this.transitionOut().call(function () {
                        this.exit();
                        this.mouseChildren = true;
                        if (typeof exitCall === "function") {
                            exitCall(this);
                        }
                    }, null, this);
                }
            };
        }

        judgui.MakeTransitionable = MakeTransitionable;
        judgui.FrameTransitions = FrameTransitions;
        scope.judgui = judgui;
    }(window));
});