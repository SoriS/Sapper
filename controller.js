
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
    var s = 0;
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
            //console.log(Find_cell_item(item))
            // recursion call
            //and show number of mins
        }
    }

    $scope.show = function (item) {
        // console.log(Find_cell_item(item))
        if (Generate_Mine.count === 0) {
            Generate_Mine(item)
        }
    }


    function Search_mine(item) {

        if (item.mine == true) {
            return true;
        }
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

        debugger
        for (var i = prevI; i <= nextI; i++) {

            for (var j = prevJ; j <= nextJ; j++) {

                var cellLock = $scope.Field[i][j];
                if (cellLock.mine == true) {
                    item.mineNum++;
                    console.log("item", cellLock, cellLock.mineNum)
                }
                
            }
        }

        if (item.mineNum > 0) {
            return false;
        }
        else {
            item.click = true
            for (var i = prevI; i <= nextI; i++) {
                for (var j = prevJ; j <= nextJ; j++) {
                    var cellLock = $scope.Field[i][j];
                    var result = Search_mine(cellLock);
                }
            }

        }
    }


    function Generate_Mine(item) {

        var NumMimeCell = Math.floor(($scope.fieldSize.height * $scope.fieldSize.width) / 16)

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
                // console.log(item, p)
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

    function Cell(cPosI, cPosJ, cMine, cClick, cCheck, cMineNum) {
        this.posi = cPosI;
        this.posj = cPosJ;
        this.mine = !!cMine;
        this.click = !!cClick;
        this.check = !!cCheck;
        this.mineNum = cMineNum || 0;
    }

}])