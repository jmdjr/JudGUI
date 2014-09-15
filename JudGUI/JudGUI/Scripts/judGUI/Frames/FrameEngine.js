
/*********************************************************************************************
        Engine Constructor
*********************************************************************************************/

define(['jquery', 'Frames/FrameCollection', 'Stage/Stage'], function ($) {
    (function (scope) {
        var judgui = scope.judgui || {};

        var FrameEngine = function (height, width, target, style) {
            this.initialize(height, width, target, style);
        }

        var p = FrameEngine.prototype = new judgui.BackgroundContainer();

        p.Stage = null;

        p._FrameCollections = null;
        p._RunningFrameCollections = null;
        p.bounds = null;

        p.initialize = function (height, width, target, style) {
            this.BackgroundContainer_init(style);

            this._FrameCollections = new judgui.HashTable();
            this._RunningFrameCollections = new judgui.HashTable();

            this.Stage = new judgui.Stage(height, width, target);
            this.setBounds(0, 0, this.Stage.bounds.width, this.Stage.bounds.height);
            this.bounds = this.getBounds();

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
            this.SetEngine(this);
            return this;
        }

        p.addFrameCollection = function (name, FC, autoStart) {

            var fc = null;
            if (name instanceof judgui.FrameCollection) {
                fc = name;
                name = fc.name;
                autoStart = FC;
            }
            else if (FC instanceof judgui.FrameCollection) {
                fc = FC;
            }

            this._FrameCollections.push(name, fc);
            this._FrameCollections[name].SetEngine(this);

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

        p.GetFrameCollection = function (name) {
            return this._FrameCollections[name];
        }

        p.GetFrameCollections = function () {
            return this._FrameCollections;
        }

        judgui.FrameEngine = FrameEngine;
        scope.judgui = judgui;
    }(window));
});