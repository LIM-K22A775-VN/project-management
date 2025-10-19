
//Start Change Status 
const buttonChangeStatusCategory = document.querySelectorAll("[button-change-status-category]");
if (buttonChangeStatusCategory.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status-category");
    const path = formChangeStatus.getAttribute("data-path");

    buttonChangeStatusCategory.forEach((button) => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            let statusChange = statusCurrent == "active" ? "inactive" : "active";        
            const action = path + `/${statusChange}/${id}?_method=PATCH`;        
            formChangeStatus.action = action;
            formChangeStatus.submit();
        });
    });
}
//End Change Status 



//Start Delete san pham 
const buttonsDelete = document.querySelectorAll("[button-delete-category]");
if(buttonsDelete.length > 0 ){
    const formDeleteItem = document.querySelector("#form-delete-item-category");
    const path = formDeleteItem.getAttribute("data-path");
    buttonsDelete.forEach((button)=>{
        button.addEventListener("click",()=>{
            const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");
            if(isConfirm){
                 const id = button.getAttribute("data-id");
                 const action = `${path}/${id}?_method=DELETE`;
                 formDeleteItem.action = action;
                 formDeleteItem.submit();
            }
        });
    });
}
//End Delete san pham 