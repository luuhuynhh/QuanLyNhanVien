// Quản lý danh sách nhân viên
const dsnv = new DSNV();

$("btnThemNV").onclick = function () {
    var newNV = layThongTinNV();
    dsnv.themNV(newNV);
    renderDSNV(dsnv.arr); //Render table
    $("btnDong").click(); //Đóng modal
}

$("btnCapNhat").onclick = function () {

}

// Hàm DOM by id
function $(id) {
    return document.getElementById(id);
}

function layThongTinNV() {
    var tknv = $("tknv").value;
    var name = $("name").value;
    var email = $("email").value;
    var password = $("password").value;
    var datepicker = $("datepicker").value;
    var luongCB = $("luongCB").value;
    var chucvu = $("chucvu").value;
    var gioLam = $("gioLam").value;

    var newNV = new NhanVien(tknv, name, email, password, datepicker, luongCB, chucvu, gioLam);
    newNV.tinhLuong();

    return newNV;
}

function renderDSNV(arr) {
    var tableDanhSach = $("tableDanhSach");
    tableDanhSach.innerHTML = "";
    arr.forEach(nv => {
        tableDanhSach.innerHTML +=
            `<tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.loaiNV}</td>
            </tr>`
    });
}




