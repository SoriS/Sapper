angular.module('AppModule')
    .factory('generator', function () {


        var generator = function () {
            let _count = 0;
           

            return {
                addCount: function () {
                    _count++;
                },
                getCount: function () {
                    return _count;
                },
                setCount: function (value) {
                    if (value < 0)
                        _count = 0;
                    else {
                        _count = value;
                    }
                },
                generateMines: function (item, fieldSize,Field) {
                    var NumMimeCell = Math.floor((fieldSize.height * fieldSize.width) / 16)
                    for (var p = 0; p < NumMimeCell; p++) {
                        var Ran_i = Math.floor(Math.random() * fieldSize.height);
                        var Ran_j = Math.floor(Math.random() * fieldSize.width);

                        var find_cell = Field[Ran_i].find((e) => {
                            return e.posi == Ran_i && e.posj == Ran_j;
                        });
                        if (find_cell.click === true) {
                            p--;
                        }
                        else {
                            find_cell.click = false;
                            find_cell.mine = true;
                            item = find_cell;
                        }
                    }
                }
            }

        }

        return generator;
    })