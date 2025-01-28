document.addEventListener("DOMContentLoaded", function () {
  // Get the current page's URL
  const currentURL = window.location.href;
  // Select all navbar links
  const navLinks = document.querySelectorAll("nav ul li a");
  // Loop through the links to find and set the "active" class
  navLinks.forEach((link, index) => {
    if (link.href === currentURL) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
