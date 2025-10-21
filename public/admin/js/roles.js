// permissions
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
    const buttonSubmit = document.querySelector("[button-submit]");
    if (buttonSubmit) {
        buttonSubmit.addEventListener("click", () => {
            const permissions = [];
            const rows = tablePermissions.querySelectorAll("[data-name]");

            rows.forEach(row => {
                const name = row.getAttribute("data-name");
                const inputs = row.querySelectorAll("input");

                if (name === "id") {
                    // Khởi tạo danh sách người dùng
                    inputs.forEach(input => {
                        permissions.push({
                            id: input.value,
                            permissions: []
                        });
                    });
                } else {
                    // Duyệt các quyền còn lại
                    inputs.forEach((input, index) => {
                        if (input.checked && permissions[index]) {
                            permissions[index].permissions.push(name);
                        }
                    });
                }
            });

            console.log(permissions);

            if (permissions.length > 0) {
                const formChangePermissions = document.querySelector("#form-change-permissions");
                const inputPermissions = formChangePermissions.querySelector("input[name='permissions']");
                inputPermissions.value = JSON.stringify(permissions);
                formChangePermissions.submit();
            }
        });
    }
}





//  Permissions Data Default
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute("data-records"));

    const tablePermissions = document.querySelector("[table-permissions]");

    records.forEach((record, index) => {
        const permissions = record.permissions;
        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
            const input = row.querySelectorAll("input")[index];
            input.checked = true;
        });
    });
}
//  Permissions Data Default 



