
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
        console.log(Find_cell_item(item))

        if (Generate_Mine.count === 0)
        { Generate_Mine(item) }

        Search_mine_number(item)

    }

    function Search_mine_number(item) {

        var ic = item.posi;
        var jc = item.posj

        var Indexes_i = getIndexes($scope.Field, ic)
        var Indexes_j = getIndexes($scope.Field[ic], jc)

        var thisArr = {
            topLeft: $scope.Field[Indexes_i.prev][Indexes_j.prev],
            top: $scope.Field[Indexes_i.prev][Indexes_j.curr],
            topRight: $scope.Field[Indexes_i.prev][Indexes_j.next],
            centerLeft: $scope.Field[Indexes_i.curr][Indexes_j.prev],
            center: $scope.Field[Indexes_i.curr][Indexes_j.curr],
            centerRight: $scope.Field[Indexes_i.curr][Indexes_j.next],
            bottomLeft: $scope.Field[Indexes_i.next][Indexes_j.prev],
            bottom: $scope.Field[Indexes_i.next][Indexes_j.curr],
            bottomRight: $scope.Field[Indexes_i.next][Indexes_j.next],
        }


        function getIndexes(Field, ic) {
            let prev = ic - 1;
            let next = ic + 1;
            if (ic == 0) {
                prev = $scope.Field.length - 1;
            } else if (ic == $scope.Field.length - 1) {
                next = 0;
            }

            return {
                prev: prev,
                curr: ic,
                next: next
            };
        }
        console.log(thisArr);
        for(var x in thisArr){
            if(thisArr[x].mine ===true)
            {item.mineNum++}
            
        console.log(thisArr[x],item.mineNum);
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
                find_cell.click = true;
                find_cell.mine = true;
                item = find_cell;
                console.log(item, p)
            }




        }
        Generate_Mine.count++;
    }
    Generate_Mine.count = 0;

    function Find_cell_item(item) {

        for (var n = 0; n < item.posi + 1; n++) {
            var find_cell_local = $scope.Field[n].find((e) => {
                return e.posi == item.posi && e.posj == item.posj;
            });
        }
        return find_cell_local;
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