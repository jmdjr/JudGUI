
/*********************************************************************************************
        Engine Constructor
*********************************************************************************************/

define(['jquery', 'Util/Hash'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

        var Engine = function (height, width, target) {
            this.initialize(height, width, target);
        }

        var p = Engine.prototype = new createjs.Container();
        Engine.prototype.inherited_init = Engine.initialize;

        p.Stage = new judgui.Stage(height, width, target);

        p._FrameCollections = new judgui.HashTable();
        p._RunningFrameCollections = new judgui.HashTable();

        p.NewFrameCollection = function (name, autoStart) {
            var fc = new judgui.FrameCollection(name);

            this._FrameCollections.push(name, fc);

            if (this._FrameCollections.indexOf(name) == -1) {
                return null;
            }

            this._FrameCollections[name].Engine = this;

            if (autoStart) {
                return this._RunningFrameCollections.push(name, fc);
            }

            return null;
        }

        p.RunFrameCollection = function (name) {

            if (this._FrameCollections.indexOf(name) != -1) {

                var fc = this._FrameCollections[name];
                this.addChild(fc);

                fc.enter();
                fc.transitionIn().call(function (fc) {
                    this._RunningFrameCollections.push(name, fc);
                }, this, fc);

                return fc;
            }

            return null;
        }

        p.HaultFrameCollection = function (name) {
            var fci = this._RunningFrameCollections.indexOf(name);

            if (fci != -1) {

                var fc = this._RunningFrameCollections.slice(fci, 1);
                fc.isPaused = true;

                fc.transitionOut().call(function (fc) {
                    this.exit();
                    this.removeChild(fc);
                }, this, fc);

                return fc;
            }
        }

        p.initialize = function (height, width, target) {

            this.setBounds(0, 0, this.Stage.bounds.width, this.Stage.bounds.height);
            this.bounds = this.getBounds();

            if (this.inherited_init) this.inherited_init();

            this.on('tick', function () {
                this._RunningFrameCollections.forEach(function (item) {
                    this._RunningFrameCollections[item].update();
                }, this);
            }, this);

            this.Stage.addChild(this);
            this.super_addchild = this.addChild;

            return this;
        }

        judgui.Engine = Engine;
    }(window));
});