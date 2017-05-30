
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
    $scope.show = function (item) {

        item.click = true;

        for (var n = 0; n < item.posi + 1; n++) {
            var find_cell = $scope.Field[n].find((e) => {
                return e.posi == item.posi && e.posj == item.posj;
            });
        }

        console.log(find_cell)
        var NumMimeCell = Math.floor(($scope.fieldSize.height * $scope.fieldSize.width) / 7)
        
        for (var p = 0; p < NumMimeCell; p++) {
            var Ran_i = Math.floor(Math.random() * $scope.fieldSize.height);
            var Ran_j = Math.floor(Math.random() * $scope.fieldSize.width);

            var find_cell = $scope.Field[Ran_i].find((e) => {
                return e.posi == Ran_i && e.posj == Ran_j;
            });
            debugger
            find_cell.mine = true;
            item = find_cell;
            console.log(item)

        }
    }
    function Cell(cPosI, cPosJ, cMine, cClick, cCheck, cMineNum) {
        this.posi = cPosI;
        this.posj = cPosJ;
        this.mine = !!cMine;
        this.click = !!cClick;
        this.check = !!cCheck;
        this.mineNum = cMineNum || 0;
        // this.ShowConsole = function (){
        //    console.log('i = ' + this.posi + ' j= ' + this.posj)}
    }

}])