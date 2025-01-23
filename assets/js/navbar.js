document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  // Get the current page's URL
  const currentURL = window.location.href;
  console.log("Current page URL:", currentURL);

  // Select all navbar links
  const navLinks = document.querySelectorAll("nav ul li a");
  console.log("Number of navbar links found:", navLinks.length);

  // Loop through the links to find and set the "active" class
  navLinks.forEach((link, index) => {
    console.log(`Checking link ${index + 1}: ${link.href}`);
    if (link.href === currentURL) {
      console.log("Adding active class to:", link.href);
      link.classList.add("active");
    } else {
      console.log("Removing active class from:", link.href);
      link.classList.remove("active");
    }
  });
});
