function NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLamTrongThang) {
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCoBan = Number(luongCoBan);
    this.chucVu = chucVu;
    this.gioLamTrongThang = Number(gioLamTrongThang);
    this.tongLuong = 0;
    this.loaiNV = "";

    this.tinhLuong = function () {
        var chucVuNV = this.chucVu;
        if (chucVu === "Sếp") {
            this.tongLuong = this.luongCoBan * 3;
        }
        else if (chucVuNV === "Trưởng phòng") {
            this.tongLuong = this.luongCoBan * 2;
        }
        else if (chucVuNV === "Nhân viên") {
            this.tongLuong = this.luongCoBan;
        }
    }
    this.xepLoaiNhanVien = function () {

    }
}