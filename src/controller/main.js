// Quản lý danh sách nhân viên
const dsnv = new DSNV();
const validation = new Validation();

getLocalStorage();

$$("btnThemNV").onclick = function () {
    var newNV = layThongTinNV(true);
    if (newNV) {
        dsnv.themNV(newNV);
        renderDSNV(dsnv.arr); //Render table
        $$("btnDong").click(); //Đóng modal
        setLocalStorage();
    }
}

$$("btnCapNhat").onclick = function () {
    var nvNew = layThongTinNV(false);
    if (nvNew) {
        for (var i = 0; i < dsnv.arr.length; i++) {
            if (dsnv.arr[i].taiKhoan === nvNew.taiKhoan) {
                dsnv.arr[i] = nvNew;
                break;
            }
        }
        $$("btnDong").click();
        renderDSNV(dsnv.arr);
        setLocalStorage();
    }
}

$$("btnThem").onclick = function () {
    resetForm();
    $$("tknv").readOnly = false;
    $$("btnCapNhat").disabled = true;
    $$("btnThemNV").disabled = false;
}

$$("btnTimNV").onclick = function () {
    var keySearch = $$("searchName").value;
    var filterNV = dsnv.timKiemNhanVien(keySearch);
    renderDSNV(filterNV);
}

$$("searchName").onkeyup = function () {
    console.log("keyup");
    var keyword = $$("searchName").value;
    var filterNV = dsnv.timKiemNhanVien(keyword);
    renderDSNV(filterNV);
};

// Hàm DOM by id
function $$(id) {
    return document.getElementById(id);
}

function layThongTinNV(isNew) {
    var tknv = $$("tknv").value;
    var name = $$("name").value;
    var email = $$("email").value;
    var password = $$("password").value;
    var datepicker = $$("datepicker").value;
    var luongCB = $$("luongCB").value;
    var chucvu = $$("chucvu").value;
    var gioLam = $$("gioLam").value;

    let isValid = true;

    if (isNew) {
        isValid &= validation.kiemTraRong(tknv, "tbTKNV", "(*) Vui lòng nhập tên tài khoản.") && validation.kiemTraDoDaiKiTu(tknv, "tbTKNV", "(*) Vui lòng nhập từ 4 - 6 kí số.", 4, 6) && validation.kiemTraMaNVTrung(tknv, "tbTKNV", "(*) Tài khoản đã tồn tại.", dsnv.arr);
    }

    isValid &= validation.kiemTraRong(name, "tbTen", "(*) Vui lòng nhập họ tên.") && validation.kiemTraChuoiKiTu(name, "tbTen", "(*) Tên nhân viên phải là chữ.");

    console.log(name);

    isValid &= validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập email.") && validation.kiemTraEmail(email, "tbEmail", "(*) Email chưa đúng định dạng.");

    isValid &= validation.kiemTraRong(password, "tbMatKhau", "(*) Vui lòng nhập password.") && validation.kiemTraMatKhau(password, "tbMatKhau", "(*) Mật khẩu phải từ 6 - 10 kí tự (chứa ít nhất 1 kí số, 1 kí tự in hoa, 1 kí tự đặt biệt).");

    isValid &= validation.kiemTraRong(datepicker, "tbNgay", "(*) Vui lòng chọn ngày làm.");

    isValid &= validation.kiemTraRong(luongCB, "tbLuongCB", "(*) Vui lòng nhập lương cơ bản.") && validation.kiemTraKhoangGiaTri(luongCB, "tbLuongCB", "(*) Lương cơ bản từ 1,000,000 - 20,000,000.", 1000000, 20000000);

    isValid &= validation.kiemTraRong(chucvu, "tbChucVu", "(*) Vui lòng chọn chức vụ hợp lệ (Giám đốc, Trưởng phòng, Nhân viên).");

    isValid &= validation.kiemTraRong(gioLam, "tbGiolam", "(*) Vui lòng nhập giờ làm.") && validation.kiemTraKhoangGiaTri(gioLam, "tbGiolam", "(*) Số giờ làm trong tháng từ 80 - 200 giờ.", 80, 200);

    if (isValid) {
        var newNV = new NhanVien(tknv, name, email, password, datepicker, luongCB, chucvu, gioLam);
        newNV.tinhLuong();
        newNV.xepLoaiNhanVien();

        return newNV;
    }

    return null;
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

    $$("tbTKNV").style.display = "none";
    $$("tbTen").style.display = "none";
    $$("tbEmail").style.display = "none";
    $$("tbMatKhau").style.display = "none";
    $$("tbChucVu").style.display = "none";
    $$("tbLuongCB").style.display = "none";
    $$("tbNgay").style.display = "none";
    $$("tbGiolam").style.display = "none";
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
    setLocalStorage();
}

function handleEditNV(taiKhoan) {
    resetForm();
    $("#myModal").modal();
    $$("tknv").readOnly = true;
    var nv = dsnv.arr.filter(i => i.taiKhoan == taiKhoan)?.[0];
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




function setLocalStorage() {
    var dataString = JSON.stringify(dsnv.arr);
    localStorage.setItem("dsnv", dataString);
}

function getLocalStorage() {
    if (localStorage.getItem("dsnv")) {
        var dataString = localStorage.getItem("dsnv");
        dsnv.arr = JSON.parse(dataString);
        renderDSNV(dsnv.arr);
    }
}


