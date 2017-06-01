
app.controller('SnapCont', ['$scope', function ($scope) {
    $scope.formData = {
        height: 16,
        width: 16,
    }

    $scope.fieldSize = {
        height: 0,
        width: 0,
    }

    $scope.Field = [];
    $scope.submit = function () {


        $scope.fieldSize.height = $scope.formData.height;
        $scope.fieldSize.width = $scope.formData.width;
        $scope.formData.height = 0;
        $scope.formData.width = 0;
        for (var i = 0; i < $scope.fieldSize.height; i++) {
            $scope.Field.push([])

            for (var j = 0; j < $scope.fieldSize.width; j++) {
                $scope.Field[i].push(new Cell(i, j))

            }
        }
        console.log($scope.Field);
        $scope.game_start = true;
        console.log($scope.fieldSize.height, $scope.fieldSize.width)

    }

    $scope.clickByCell = function (item) {
        item.click = true;
        if (Generate_Mine.count === 0) {
            $scope.show(item); // generate field
            Search_mine_number(item); // search mines
            return
        }

        if (item.mine === true) {
            console.log("End_Game")
            //need to show all mins and end the game
        }
        else {

            if (item.mineNum === 0) {
                Search_mine_number(item);

            }
            console.log(Find_cell_item(item))
            // recursion call
            //and show number of mins
        }
    }

    $scope.show = function (item) {
        console.log(Find_cell_item(item))
        if (Generate_Mine.count === 0) {
            Generate_Mine(item)
        }
    }

    function Search_mine_number(item) {

        var ic = item.posi;
        var jc = item.posj

        var Indexes_i = getIndexes($scope.Field, ic)
        var Indexes_j = getIndexes($scope.Field[ic], jc)

        var results = [];
        console.log("Element:")


        var thisArr = [
            [Indexes_i.prev, Indexes_j.prev],
            [Indexes_i.prev, Indexes_j.curr],
            [Indexes_i.prev, Indexes_j.next],
            [Indexes_i.curr, Indexes_j.prev],
            [Indexes_i.curr, Indexes_j.curr],
            [Indexes_i.curr, Indexes_j.next],
            [Indexes_i.next, Indexes_j.prev],
            [Indexes_i.next, Indexes_j.curr],
            [Indexes_i.next, Indexes_j.next]

        ]

        console.log(thisArr.length)
        console.log(thisArr[4])
        // var thisArr = [
        //     { topLeft: $scope.Field[Indexes_i.prev][Indexes_j.prev] },
        //     { top: $scope.Field[Indexes_i.prev][Indexes_j.curr] },
        //     { topRight: $scope.Field[Indexes_i.prev][Indexes_j.next] },
        //     { centerLeft: $scope.Field[Indexes_i.curr][Indexes_j.prev] },
        //     { center: $scope.Field[Indexes_i.curr][Indexes_j.curr] },
        //     { centerRight: $scope.Field[Indexes_i.curr][Indexes_j.next] },
        //     { bottomLeft: $scope.Field[Indexes_i.next][Indexes_j.prev] },
        //     { bottom: $scope.Field[Indexes_i.next][Indexes_j.curr] },
        //     { bottomRight: $scope.Field[Indexes_i.next][Indexes_j.next] }
        // ]


        function getIndexes(Field, ic) {
            let prev = ic - 1;
            let next = ic + 1;
            if (ic == 0) {
                prev = $scope.Field.length;
            } else if (ic == $scope.Field.length - 1) {
                next = $scope.Field.length;
            }

            return {
                prev: prev,
                curr: ic,
                next: next
            };
        }



       thisArr = thisArr.filter(c=>c[0]!=$scope.fieldSize.width && c[1] != $scope.fieldSize.height);// thisArr.filter(filterByPos, thisArr)
        debugger

        for (var i = 0; i < thisArr.length; i++) {
            
            // @ts-ignore
            var tmp = $scope.Field[thisArr[i][0]]
            item = tmp.find((e) => {
                return e.posj == thisArr[i][1];
            });
            console.log(item)
            if(!item){
                debugger
            }
            if (item.mine === true) {
                $scope.Field[Indexes_i.curr][Indexes_j.curr].mineNum++;
            }
        }


    }

    function Generate_Mine(item) {

        var NumMimeCell = Math.floor(($scope.fieldSize.height * $scope.fieldSize.width) / 7)

        for (var p = 0; p < NumMimeCell; p++) {
            var Ran_i = Math.floor(Math.random() * $scope.fieldSize.height);
            var Ran_j = Math.floor(Math.random() * $scope.fieldSize.width);

            var find_cell = $scope.Field[Ran_i].find((e) => {
                return e.posi == Ran_i && e.posj == Ran_j;
            });


            if (find_cell.click === true) {
                p--;
            }
            else {
                find_cell.click = false;
                find_cell.mine = true;
                item = find_cell;
                console.log(item, p)
            }
        }
        Generate_Mine.count++;
    }
    Generate_Mine.count = 0;

    function Find_cell_item(item) {


        var find_cell_local = $scope.Field[item.posi].find((e) => {
            return e.posi == item.posi && e.posj == item.posj;
        });

        return find_cell_local;
    }
    function filterByPos(obj, thisArr) {
        for (var i = 0; i < thisArr.length; i++) {
            if (obj.thisArr[i][0] >= $scope.Field.length && obj.thisArr[i][1] >= $scope.Field.length) {
                return false;
            }
            else {
                return true;

            }
        }
    }

    function Cell(cPosI, cPosJ, cMine, cClick, cCheck, cMineNum) {
        this.posi = cPosI;
        this.posj = cPosJ;
        this.mine = !!cMine;
        this.click = !!cClick;
        this.check = !!cCheck;
        this.mineNum = cMineNum || 0;
    }

}])