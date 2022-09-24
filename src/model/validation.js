function Validation() {
    this.kiemTraRong = function (value, idErr, mess) {
        if (value.trim() === "") {
            $$(idErr).innerHTML = mess;
            $$(idErr).style.display = "block";
            return false;
        }

        $$(idErr).style.display = "none";
        return true;
    }

    this.kiemTraChucVu = function (idSelect, idErr, mess) {
        if ($$(idSelect).selectedIndex !== 0) {
            $$(idErr).innerHTML = mess;
            $$(idErr).style.display = "block";
            return false;
        }

        $$(idErr).style.display = "none";
        return true;
    }

    this.kiemTraDoDaiKiTu = function (value, idErr, mess, min, max) {
        if (value.length < min || value.length > max) {
            $$(idErr).innerHTML = mess;
            $$(idErr).style.display = "block";
            return false;
        }

        $$(idErr).style.display = "none";
        return true;
    }

    this.kiemTraChuoiKiTu = function (value, idErr, mess) {
        var letter =
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

        if (value.match(letter)) {
            $$(idErr).style.display = "none";
            return true;
        }

        $$(idErr).innerHTML = mess;
        $$(idErr).style.display = "block";
        return false;
    };

    this.kiemTraEmail = function (value, idErr, mess) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            $$(idErr).style.display = "none";
            return true;
        }

        $$(idErr).innerHTML = mess;
        $$(idErr).style.display = "block";
        return false;
    }

    this.kiemTraMatKhau = function (value, idErr, mess) {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{6,10}$/;

        if (re.test(value)) {
            $$(idErr).style.display = "none";
            return true;
        }

        $$(idErr).innerHTML = mess;
        $$(idErr).style.display = "block";
        return false;
    }

    this.kiemTraKhoangGiaTri = function (value, idErr, mess, min, max) {
        if (Number(value) < min || Number(value) > max) {
            $$(idErr).innerHTML = mess;
            $$(idErr).style.display = "block";
            return false;
        }

        $$(idErr).style.display = "none";
        return true;
    }
}