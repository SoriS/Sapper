
app.controller('SnapCont', ['$scope', 'generator', function ($scope, generator) {
    $scope.formData = {
        height: 16,
        width: 16,
    }

    $scope.fieldSize = {
        height: 0,
        width: 0,
    }

    var adjacentArr = [];
    var visitionArr = [];
    var T = new generator();
    console.log(T);
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
    oncontextmenu = function (eventData) {
        event.preventDefault()
        if (eventData.button === 2) {
            $scope.showFon=true;
        }
    }

    $scope.clickByCell = function (item) {


        item.click = true;
        if (T.getCount() === 0) {
            T.addCount()
            T.generateMines(item, $scope.fieldSize, $scope.Field);
            // generate field
            Search_mine(item); // search mines
            return
        }

        if (item.mine === true) {
            console.log("End_Game")
            //need to show all mins and end the game
        }
        else {

            if (item.mineNum === 0) {

                Search_mine(item);
                console.log(item.mineNum)
            }
        }
    }

    //new algorithm
    function Search_mine(item) {
        var s = 0

        var currentI = item.posi;
        var currentJ = item.posj
        if (currentI >= $scope.fieldSize.width - 1) {////////////next I
            var nextI = currentI;
        }
        else {
            var nextI = currentI + 1;
        }

        if (currentJ + 1 >= $scope.fieldSize.height) {////////////next J
            var nextJ = currentJ;
        }
        else {
            var nextJ = currentJ + 1;
        }

        if (currentI == 0) {/////////////////////////////////////////prev J
            var prevI = currentI
        }
        else {
            // @ts-ignore
            var prevI = currentI - 1;
        }

        if (currentJ == 0) {/////////////////////////////////////////prev J
            var prevJ = currentJ
        }
        else {
            // @ts-ignore
            var prevJ = currentJ - 1;
        }
        var countMines = 0;
        for (var i = prevI; i <= nextI; i++) {
            for (var j = prevJ; j <= nextJ; j++) {
                var cellLock = $scope.Field[i][j];
                if ((i == currentI && j == currentJ)) {
                    continue;
                }
                else if (cellLock.mine == true) {
                    countMines++;
                    console.log("item", cellLock, cellLock.mineNum)
                }
                else if (cellLock.mine == false && cellLock.click === false && cellLock.mineNum == 0) {
                    s++

                    adjacentArr.push(cellLock)
                }
            }
        }
        item.click = true
        item.mineNum = countMines;
        if (item.mineNum > 0) {
            for (i = 0; i < s; i++) {
                adjacentArr.pop();
            }
            s = 0;
            return;
        }

        while (adjacentArr.length) {
            var item = adjacentArr.shift();
            Search_mine(item)
        }
    }

    //move into another file.


    function Find_cell_item(item) {

        var find_cell_local = $scope.Field[item.posi].find((e) => {
            return e.posi == item.posi && e.posj == item.posj;
        });

        return find_cell_local;
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