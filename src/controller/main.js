// Quản lý danh sách nhân viên
const dsnv = new DSNV();

$$("btnThemNV").onclick = function () {
    var newNV = layThongTinNV();
    dsnv.themNV(newNV);
    renderDSNV(dsnv.arr); //Render table
    $$("btnDong").click(); //Đóng modal
}

$$("btnCapNhat").onclick = function () {
    var nvNew = layThongTinNV();
    for (var i = 0; i < dsnv.arr.length; i++) {
        if (dsnv.arr[i].taiKhoan === nvNew.taiKhoan) {
            dsnv.arr[i] = nvNew;
            break;
        }
    }
    $$("btnDong").click();
    renderDSNV(dsnv.arr);
}

$$("btnThem").onclick = function () {
    resetForm();
    $$("tknv").readOnly = false;
    $$("btnCapNhat").disabled = true;
    $$("btnThemNV").disabled = false;
}

$$("btnTimNV").onclick = function () {
    var keySearch = $$("searchName").value;
    if (keySearch) {
        var filterNV = dsnv.arr.filter(nv => nv.loaiNV.toLowerCase().includes(keySearch.toLowerCase()));
        renderDSNV(filterNV);
    } else {
        renderDSNV(dsnv.arr);
    }
}

// Hàm DOM by id
function $$(id) {
    return document.getElementById(id);
}

function layThongTinNV() {
    var tknv = $$("tknv").value;
    var name = $$("name").value;
    var email = $$("email").value;
    var password = $$("password").value;
    var datepicker = $$("datepicker").value;
    var luongCB = $$("luongCB").value;
    var chucvu = $$("chucvu").value;
    var gioLam = $$("gioLam").value;

    var newNV = new NhanVien(tknv, name, email, password, datepicker, luongCB, chucvu, gioLam);
    newNV.tinhLuong();
    newNV.xepLoaiNhanVien();

    return newNV;
}

function resetForm() {
    var tknv = $$("tknv").value = "";
    var name = $$("name").value = "";
    var email = $$("email").value = ""
    var password = $$("password").value = "";
    var datepicker = $$("datepicker").value = "";
    var luongCB = $$("luongCB").value = "";
    var chucvu = $$("chucvu").value = "";
    var gioLam = $$("gioLam").value = "";
}

function renderDSNV(arr) {
    var tableDanhSach = $$("tableDanhSach");
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
                <td>
                    <button onclick="handleEditNV(${nv.taiKhoan})" class="btn btn-primary">Edit</button>
                    <button onclick="handleDeleteNV(${nv.taiKhoan})" class="btn btn-danger">Delete</button>
                </td>
            </tr>`
    });
}

function handleDeleteNV(taiKhoan) {
    const newArr = dsnv.arr.filter(nv => nv.taiKhoan != taiKhoan);
    dsnv.arr = newArr;
    renderDSNV(newArr);
}

function handleEditNV(taiKhoan) {
    $("#myModal").modal();
    $$("tknv").readOnly = true;
    var nv = dsnv.arr.filter(i => i.taiKhoan === taiKhoan)?.[0];
    if (nv) {
        var tknv = $$("tknv").value = nv.taiKhoan;
        var name = $$("name").value = nv.hoTen;
        var email = $$("email").value = nv.email;
        var password = $$("password").value = nv.matKhau;
        var datepicker = $$("datepicker").value = nv.ngayLam;
        var luongCB = $$("luongCB").value = nv.luongCoBan;
        var chucvu = $$("chucvu").value = nv.chucVu;
        var gioLam = $$("gioLam").value = nv.gioLamTrongThang;
    }
    $$("btnCapNhat").disabled = false;
    $$("btnThemNV").disabled = true;
}


