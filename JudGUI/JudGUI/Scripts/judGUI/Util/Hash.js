

define(function ($) {
    (function (scope) {
        "use strict";

        var judgui = scope.judgui || {};

        var HashTable = function () {
            this.initialize();
        }

        var p = HashTable.prototype = [];

        /**
         * override from array
         * @property _push
         * @type function
         * @readonly
        */
        p._push = p.push;


        /**
         * override from array
         * @property name
         * @type function
         * @readonly
        */
        p.push = function (name, value) {
            this._push(name);
            this[name] = value;
            return this.length;
        }

        /**
         * override from array
         * @type _pop
         * @readonly
        */
        p._pop = p.pop;


        /**
         * override from array
         * @type function
         * @readonly
        */
        p.pop = function () {
            var name = this._pop();
            delete this[name];
            return name;
        }

        /**
         * override from array
         * @type _pop
         * @readonly
        */
        p._unshift = p.unshift;


        /**
         * override from array
         * @type function
         * @readonly
        */
        p.unshift = function (name, value) {
            this._shift(name);
            this[name] = val;
            return this.length;
        }

        /**
         * override from array
         * @type _pop
         * @readonly
        */
        p._shift = p.shift;

        /**
         * override from array
         * @type function
         * @readonly
        */
        p.shift = function () {
            var name = this._shift();
            delete this[name];
            return name;
        }

        p.initialize = function () {

        }

        judgui.HashTable = HashTable;
        scope.judgui = judgui;
    }(window));
});