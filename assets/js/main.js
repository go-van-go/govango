// target = _self for all bibliography reference links
document.addEventListener("DOMContentLoaded", function () {
    // Select all <a> elements with an href that starts with "#citeproc"
    // and set their target attribute to "_self" to ensure they open in the same frame.
    document.querySelectorAll("a[href^='#citeproc']").forEach(link => {
        link.setAttribute("target", "_self");
    });
});

