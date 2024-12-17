document.getElementById("navbarToggler").onclick = function () {
  const navbarCollapse = document.getElementById("navbarNav");
  navbarCollapse.classList.toggle("show"); // Toggle the visibility of the navbar

  // Change toggler appearance based on the state
  if (navbarCollapse.classList.contains("show")) {
    this.setAttribute("aria-expanded", "true");
  } else {
    this.setAttribute("aria-expanded", "false");
  }
};

function toggleDropdown(event) {
  event.preventDefault(); // Prevent default link behavior
  const dropdownMenu = document.getElementById("dropdownMenu");
  dropdownMenu.classList.toggle("show"); // Toggle the dropdown visibility
}

// Close the dropdown if clicked outside
window.onclick = function (event) {
  if (!event.target.matches("#shopDropdown")) {
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu.classList.contains("show")) {
      dropdownMenu.classList.remove("show");
    }
  }

  // Also close the navbar if clicked outside
  const navbarCollapse = document.getElementById("navbarNav");
  if (
    !navbarCollapse.contains(event.target) &&
    navbarCollapse.classList.contains("show")
  ) {
    navbarCollapse.classList.remove("show");
    document
      .getElementById("navbarToggler")
      .setAttribute("aria-expanded", "false");
  }
};
