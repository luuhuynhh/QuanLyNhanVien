function DSNV() {
    this.arr = [];
    this.themNV = function (nv) {
        this.arr.push(nv);
    }
    this.timKiemNhanVien = function (keySearch) {
        if (keySearch) {
            var filterNV = this.arr.filter(nv => nv.loaiNV.toLowerCase().includes(keySearch.toLowerCase()));
            return filterNV;
        } else {
            return this.arr;
        }
    }
}