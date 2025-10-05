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
            }
            else{
                url.searchParams.delete("status");               
            }
             window.location.href = url.toString();
        });
    });
}

// Button Status 