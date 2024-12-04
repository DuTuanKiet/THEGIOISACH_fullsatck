// Kiểm tra số điện thoại hợp lệ
function isValidPhoneNumber(phoneNumber) {
    const regex = /^(03|05|07|08|09)[0-9]{8}$/;
    return regex.test(phoneNumber);
}

// Chuyển từ bước 1 sang bước 2
function goToStep2() {
    const phoneNumber = document.getElementById("phoneNumber").value;

    if (!isValidPhoneNumber(phoneNumber)) {
        alert("Vui lòng nhập số điện thoại hợp lệ!");
        return;
    }

    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step2").classList.remove("hidden");
    document.getElementById("display-phone").innerText = phoneNumber;
}

// Xử lý logic đăng ký
function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!name || !email || !password || !confirmPassword) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }

    alert(`Đăng ký thành công, ${name}! Bạn có thể đăng nhập ngay.`);
    document.getElementById("step1").classList.remove("hidden");
    document.getElementById("step2").classList.add("hidden");
    document.getElementById("phoneNumber").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirm-password").value = "";
}
