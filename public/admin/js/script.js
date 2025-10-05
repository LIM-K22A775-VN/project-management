function toggleDropdown(button) {
  const dropdown = button.parentElement;
  document.querySelectorAll('.dropdown.show').forEach(d => {
    if (d !== dropdown) d.classList.remove('show');
  });
  dropdown.classList.toggle("show");
}

function selectOption(value, event) {
  event.preventDefault();
  const dropdown = event.target.closest('.dropdown');
  dropdown.classList.remove("show");

  let url = new URL(window.location.href);
  if (value) {
    url.searchParams.set("status", value);
  } else {
    url.searchParams.delete("status");
  }

  window.location.href = url.toString();
}

window.addEventListener("click", function(event) {
  if (!event.target.matches('.dropdown-btn')) {
    document.querySelectorAll('.dropdown.show').forEach(d => d.classList.remove('show'));
  }
});
function toggleDropdown(button) {
  const dropdown = button.parentElement;
  document.querySelectorAll('.dropdown.show').forEach(d => {
    if (d !== dropdown) d.classList.remove('show');
  });
  dropdown.classList.toggle("show");
}

function selectOption(value, event) {
  event.preventDefault();
  const dropdown = event.target.closest('.dropdown');
  dropdown.classList.remove("show");

  let url = new URL(window.location.href);
  if (value) {
    url.searchParams.set("status", value);
  } else {
    url.searchParams.delete("status");
  }

  window.location.href = url.toString();
}

window.addEventListener("click", function(event) {
  if (!event.target.matches('.dropdown-btn')) {
    document.querySelectorAll('.dropdown.show').forEach(d => d.classList.remove('show'));
  }
}); 
