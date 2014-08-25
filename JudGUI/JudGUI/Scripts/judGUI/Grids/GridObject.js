//
// This script defines a generic grid parsing object, which accepts an array of arrays, forming a 2D matrix, and allows for simple
//  random and relative access using special GridTileObjects.  
//
if (define) {
    define(['jquery', 'Grids/GridTile'], function ($) {
        (function (scope) {
            var judgui = scope.judgui || {};

            var GridObject = function (grid, mapper) {
                this.initialize(grid, mapper);
            }

            var p = GridObject.prototype;

            p.printHtml = function () {
                var divTable = '<div class="JDGEGrid-table">';
                var columnHeaders = '<div class="JDGEGrid-row JDGEGrid-column-header-row"><div class="JDGEGrid-row-header JDGEGrid-cell"></div>';
                var row = '';
                var w = h = 0;
                while (h < this.height) {
                    w = 0;
                    row += '<div class="JDGEGrid-row"> <div class="JDGEGrid-row-header JDGEGrid-cell">' + (h + 1) + '</div>';
                    while (w < this.width) {
                        row += '<div class="JDGEGrid-column JDGEGrid-cell">' + $this.Tiles[h][w].toString() + '</div>';

                        if (h == 0) {
                            columnHeaders += '<div class="JDGEGrid-column JDGEGrid-cell">' + (w + 1) + '</div>';
                        }
                        ++w;
                    }

                    if (h == 0) {
                        columnHeaders += '</div> <div style="clear:both;"></div>';
                    }

                    row += '</div> <div style="clear:both;"></div>';
                    ++h;
                }
                divTable += columnHeaders + row + '</div>';

                $('body').append(divTable);
            }

            p.isTile = function (object) {
                return object instanceof judgui.GridTile;
            }

            p.getTileAt = function (w, h) {
                var tracer = this.Tiles[h];
                if (tracer) {
                    tracer = tracer[w];

                    if (tracer) {
                        return tracer;
                    }
                    else {
                        return jdge._NULL_TILE_;
                    }
                } else {
                    return jdge._NULL_TILE_;
                }
            }

            p.getTileAtOffset = function (tile, xoffset, yoffset) {
                if (!this.isTile(tile) || typeof tile.coords === 'undefined') {
                    return null;
                }

                var tracer = this.Tiles[tile.coords.y + yoffset];
                if (tracer) {
                    tracer = tracer[tile.coords.x + xoffset];

                    if (tracer) {
                        return tracer;
                    }
                    else {
                        return judgui._NULL_TILE_;
                    }
                } else {
                    return judgui._NULL_TILE_;
                }
            }

            p.n = p.north = function (tile) {
                return this.getTileAtOffset(tile, 0, -1);
            }

            p.nw = p.northeast = function (tile) {
                return this.getTileAtOffset(tile, 1, -1);
            }

            p.e = p.east = function (tile) {
                return this.getTileAtOffset(tile, 1, 0);
            }

            p.se = p.southeast = function (tile) {
                return this.getTileAtOffset(tile, 1, 1);
            }

            p.s = p.south = function (tile) {
                return this.getTileAtOffset(tile, 0, 1);
            }

            p.sw = p.southwest = function (tile) {
                return this.getTileAtOffset(tile, -1, 1);
            }

            p.w = p.west = function (tile) {
                return this.getTileAtOffset(tile, -1, 0);
            }

            p.nw = p.northwest = function (tile) {
                return this.getTileAtOffset(tile, -1, -1);
            }

            // initializes the simple grid object.
            //  grid is an array of objects, containing references to objects. 
            // if a mapper function is provided, the values provided in the grid will be mapped using the mapper function.
            // Mapper function must accept at least one input (Value to be stored), and return desired object.

            // maps data to a 2d grid, allowing for random access, and traversing via navigation based functions:
            // The following functions accept only a tile object.
            //    north(n), south(s), east(e), west(w), northeast(ne), southeast(se), northwest(nw) and southwest(sw):
            //         returns tile in the direction of the provided tile object.

            p.initialize = function (grid, mapper) {
                if (!$.isArray(grid)) {
                    $.error('JDGE: SimpleGridObject: Initialization error 0000 - Grid is not formatted properly or does not exist.');
                }

                if (!$.isArray(grid[0])) {
                    $.error('JDGE: SimpleGridObject: Initialization error 0001 - First Row not formatted properly or does not exist.');
                }

                this.width = grid[0].length;
                this.height = grid.length;

                this.Tiles = [];

                // writing mapper function to appropriate TileGeneration function

                if (!mapper) {
                    mapper = function (tileValue, x, y) { return new jdge.SimpleGridTileObject(tileValue, x, y); };
                }
                else {
                    var t_mapper = mapper;
                    mapper = function (tileValue, x, y) { return new jdge.SimpleGridTileObject(t_mapper(tileValue), x, y); };
                }

                var w = h = 0;
                while (h < this.height) {
                    if (!$.isArray(grid[h])) {
                        $.error('JDGE: SimpleGridObject: Initialization error 0002 - Grid Row ' + h + ' is not formatted properly');
                        break;
                    }

                    this.Tiles.push([]);
                    w = 0;

                    while (w < this.width) {
                        this.Tiles[h].push(mapper(grid[h][w], w, h));
                        ++w;
                    }

                    ++h;
                }
            }

            judgui.GridObject = GridObject;
            scope.judgui = judgui;
        }(window));
    });
}