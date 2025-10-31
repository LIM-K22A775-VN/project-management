
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