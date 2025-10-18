// Button Status 
const buttonsStatus = document.querySelectorAll("[button-status]"); //thuộc tính tự định nghĩa thêm []
// console.log(buttonsStatus); 3 mảng
// Kiểm tra xem danh sách các nút trạng thái có tồn tại hay không
if (buttonsStatus.length > 0) {

    // Lấy đường dẫn URL hiện tại của trang (ví dụ: http://localhost:3000/products)
    // window.location.href trả về URL đầy đủ của trang hiện tại
    // let url = window.location.href;

    // Tạo một đối tượng URL mới từ chuỗi đường dẫn trên
    // Đối tượng này cho phép thao tác dễ dàng với từng phần của URL (search params, pathname, host, v.v.)
    let url = new URL(window.location.href);

    // Lặp qua tất cả các nút trong danh sách buttonsStatus
    // Mỗi button là một nút lọc (ví dụ: Tất cả / Hoạt động / Dừng hoạt động)
    buttonsStatus.forEach(button => {

        // (debug) Có thể in ra từng button để xem thử trong console
        // console.log(button);

        // Gắn sự kiện click cho từng button
        button.addEventListener("click", () => {

            // Lấy giá trị trong thuộc tính button-status của button
            // Ví dụ: <button button-status="active">Hoạt động</button> → status = "active"
            const status = button.getAttribute("button-status");

            // Nếu status tồn tại (không phải null hay undefined)
            if (status) {
                url.searchParams.set("status", status);
                url.searchParams.set("page", 1); // khi click vào thì cho page về vị trí 1
            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.toString();
        });
    });
}
// Button Status 



// Form Search 
const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault(); // ngăn sự kiện mặc định -> k load dc lại trang
        console.log(e.target.elements.keyword.value); // lấy ra name khi mình nhập vào
        // Nếu status tồn tại (không phải null hay undefined)
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
            url.searchParams.set("page", 1); // khi click vào thì cho page về vị trí 1
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.toString();
    });
}
//END Form Search 


// Start Pagination : Phân trang 
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
    let page = 1;
    let url = new URL(window.location.href);
    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        });
    });
}
// End Pagination : Phân trang 

//Start Checkbox Multi 
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name=checkall]");
    const inputsId = checkboxMulti.querySelectorAll("input[name=id]")

    // nếu click vào mục tất cả thì tất cả các mục nhỏ sẽ checked theo  
    inputCheckAll.addEventListener("click", () => {
        inputsId.forEach((input) => {
            input.checked = inputCheckAll.checked;
        });
    });

    inputsId.forEach((input) => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name=id]:checked").length;
            if (countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        });
    });

}
//End Checkbox Multi 



//Start Form change Multi 
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault(); // ngăn ngừa hành động mặc định : không cho gửi
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name=id]:checked");

        const typeChange = e.target.elements.type.value;
        if (typeChange == "delete-all") {
            const isconfirm = confirm("Bạn có chắc muốn xóa không?");
            if (!isconfirm) {
                return;
            }
        }

        if (inputsChecked.length > 0) {
            // let ids = Array.from(inputsChecked).map(input => input.value);
            // console.log(ids);
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name=ids]"); //pt input text

            inputsChecked.forEach(
                input => {

                    if (typeChange == "change-position") {
                        const position = input.closest("tr").querySelector("input[name='position']").value;
                        ids.push(`${input.value}-${position}`);
                    } else {
                        ids.push(input.value)
                    }
                }
            );
            inputIds.value = ids.join(", ");

            formChangeMulti.submit();
        } else {
            alert("Vui lòng chọn ít nhất 1 bản ghi");
        }
    });
}
//End Form change Multi 


//Thùng rác
const thungrac = document.querySelector("[thungrac]");
if (thungrac) {
    // console.log("ok");
    const formThungrac = document.querySelector("#form-thungrac");
    thungrac.addEventListener("click", () => {
        formThungrac.action = formThungrac.getAttribute("data-path");
        formThungrac.submit();
    });
}
//Thùng rác


// show-alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const timeEnd = showAlert.getAttribute("data-time");
    const closeAlert = showAlert.querySelector("[close-alert]");
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, parseInt(timeEnd));
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    });
}

// END show-alert


// Upload IMG  tối ưu img
const uploadImage = document.querySelector(["[upload-image]"]);
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    const fakeFile = document.querySelector("[fake-file]");
    const cancelBtn = document.querySelector('[upload-image-cancel]');
    if (fakeFile) {
        fakeFile.addEventListener("click",
            () => {
                uploadImageInput.click();
            }
        );
    }
    uploadImageInput.addEventListener("change", (e) => {
        console.log(e);
        // const file = e.target.files[0].name; // lấy ra tên ảnh
        const file = e.target.files[0]; // file ảnh

        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
            cancelBtn.style.display = 'inline-block';
        }
        console.log(file);

    });

    // Khi nhấn nút huỷ
    cancelBtn.addEventListener('click', () => {
        // console.log(uploadImageInput.value); //C:\fakepath\WIN_20250711_16_28_40_Pro.jpg
        uploadImageInput.value = ''; // giá trị rỗng
        uploadImagePreview.src = "";
        // uploadImagePreview.style.display = 'none'; css có rồi
        cancelBtn.style.display = 'none';
    });
}

// Upload IMG 
//  const imageURL = URL.createObjectURL(file);
// URL.createObjectURL(file) để tạo một URL tạm thời từ file đó.





//SORT
const sort = document.querySelector("[sort]");
if (sort) {
    let url = new URL(window.location.href);
    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");
    //Sắp xếp
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            const value = e.target.value;
            const [sortKey, sortValue] = value.split("-");

            url.searchParams.set("sortKey", sortKey);
            url.searchParams.set("sortValue", sortValue);
            
            window.location.href = url;
        });
    }
    //Xóa sắp xếp
    if (sortClear) {
        sortClear.addEventListener("click", () => {
            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortValue");
            window.location.href = url;
        });
    }
}


//SORT