
/*********************************************************************************************
        Engine Constructor
*********************************************************************************************/

define(['jquery', 'Util/Utils', 'Frames/FrameCollection', 'Stage/Stage', 'Frames/Transitions'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

        var FrameEngine = function (height, width, target) {
            this.initialize(height, width, target);
        }

        var p = FrameEngine.prototype = new createjs.Container();
        FrameEngine.prototype.inherited_init = FrameEngine.initialize;

        p.Stage = null;

        p._FrameCollections = null;
        p._RunningFrameCollections = null;
        p.bounds = null;

        p.NewFrameCollection = function (name, autoStart) {
            var fc = new judgui.FrameCollection(name);

            this._FrameCollections.push(name, fc);

            if (this._FrameCollections.indexOf(name) == -1) {
                return null;
            }

            this._FrameCollections[name].Engine = this;

            if (autoStart) {
                this._RunningFrameCollections.push(name, fc);
            }

            return this._FrameCollections[name];
        }

        p.RunFrameCollection = function (name) {

            if (this._FrameCollections.indexOf(name) != -1) {

                var fc = this._FrameCollections[name];
                this.addChild(fc);

                fc.enterIn(function (fc) {
                    this._RunningFrameCollections.push(name, fc);
                });

                return fc;
            }

            return this._FrameCollections[name];
        }

        p.HaultFrameCollection = function (name) {
            var fci = this._RunningFrameCollections.indexOf(name);

            if (fci != -1) {

                var fc = this._RunningFrameCollections.slice(fci, 1);
                fc.isPaused = true;

                fc.exitOut(function (fc) {
                    this.removeChild(fc);
                });

                return fc;
            }

            return null;
        }

        p.initialize = function (height, width, target) {

            this._FrameCollections = new judgui.HashTable();
            this._RunningFrameCollections = new judgui.HashTable();

            this.Stage = new judgui.Stage(height, width, target);
            this.setBounds(0, 0, this.Stage.bounds.width, this.Stage.bounds.height);
            this.bounds = this.getBounds();

            if (this.inherited_init) this.inherited_init();

            this.on('tick', function () {
                this._RunningFrameCollections.forEach(function (item) {
                    item = this._RunningFrameCollections[item];

                    if (!this.contains(item)) {
                        this.addChild(item);
                    }

                    item.update();
                }, this);
            }, this);

            this.Stage.addChild(this);
            this.super_addchild = this.addChild;

            return this;
        }

        judgui.FrameEngine = FrameEngine;
        scope.judgui = judgui;
    }(window));
});