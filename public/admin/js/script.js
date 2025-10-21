 //Mở dropdown
 const dropdown = document.querySelector("[dropdown-status]");
 if (dropdown) {
   dropdown.addEventListener("click", () => {
     dropdown.classList.toggle("show");
   });
 }
// xử lý status
 if(dropdown)
{
   const aStatus = dropdown.querySelectorAll("[a-status]");
 if (aStatus)
   aStatus.forEach(a => {
     a.addEventListener("click", () => {
       const value =  a.getAttribute("value");
       let url = new URL(window.location.href);
       if (value) {
         url.searchParams.set("status", value);
       } else {
         url.searchParams.delete("status");
       }
       window.location.href = url.toString();
     });
   });
}
// xử lý status


 // bắt sự kiện click ngoài dropdown-btn
 window.addEventListener("click", function (event) {
   if (!event.target.matches('.dropdown-btn')) {
     document.querySelectorAll('.dropdown.show').forEach(d => d.classList.remove('show'));
   }
 });




 // function toggleDropdown(button) {
 //   const dropdown = button.parentElement;
 //   document.querySelectorAll('.dropdown.show').forEach(d => {
 //     if (d !== dropdown) d.classList.remove('show');
 //   });
 //   dropdown.classList.toggle("show");
 // }

 // function selectOption(value, event) {
 //   event.preventDefault();
 //   const dropdown = event.target.closest('.dropdown');
 //   dropdown.classList.remove("show");

 //   let url = new URL(window.location.href);
 //   if (value) {
 //     url.searchParams.set("status", value);
 //   } else {
 //     url.searchParams.delete("status");
 //   }

 //   window.location.href = url.toString();
 // }

 // window.addEventListener("click", function(event) {
 //   if (!event.target.matches('.dropdown-btn')) {
 //     document.querySelectorAll('.dropdown.show').forEach(d => d.classList.remove('show'));
 //   }
 // }); 

 // //Start Checkbox Multi 
 // const checkboxMulti = document.querySelector("[checkbox-multi]");
 // if (checkboxMulti) {
 //     const inputCheckAll = checkboxMulti.querySelector("input[name=checkall]");
 //     const inputsId = checkboxMulti.querySelectorAll("input[name=id]")

 //     inputCheckAll.addEventListener("click", () => {
 //         inputsId.forEach((input) => {
 //             input.checked = inputCheckAll.checked;
 //         });
 //     });

 //     inputsId.forEach((input) => {
 //         input.addEventListener("click",() => {
 //             // Lọc ra tất cả ô được chọn (chuyển về mảng mới dùng đc find filter)
 //             const checkedInputs = Array.from(inputsId).filter(input => input.checked);
 //             if (checkedInputs) {
 //                 inputCheckAll.checked = true;
 //             }
 //             //tìm ra 1 phần tử mà chưa đc chọn 
 //             const found = Array.from(inputsId).find(input => !input.checked);
 //             if (found) {
 //                 inputCheckAll.checked = false;
 //             }
 //         });
 //     });

 // }
 // //End Checkbox Multi 