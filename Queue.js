
//todo factory

var queue = function () {
    this._array = [];
}
queue.prototype.next = function () {
    var item = this._array[0];
    this._array = this._array.splice(0, 1); // remote item from array
    return item;
}

queue.prototype.addNew = function (item) {
    this._array.push(item);
}

queue.prototype.delete = function (item) {
    //todo find item and remove from queue
}


