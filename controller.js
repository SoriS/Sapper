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
                $scope.Field[i].push({i:i,j:j})
            }
        }
        console.log($scope.Field);
        $scope.game_start = true;
    }
    // cell = {
    //     pos: [$scope.formData.width, $scope.formData.height],
    //     mine: false,   //міна
    //     click: false,  //чи активована нажатієм
    //     check: false,  //чи встановлений флажок
    //     mineNum: 0     //кількість мін біля ячейки
    // }
    // function Cell(cPosH, cPosW, cMine, cClick, cCheck, cMineNum) {
    //     this.pos
    //     this.mine
    //     this.click
    //     this.check
    //     this.mineNum
    // }




}])