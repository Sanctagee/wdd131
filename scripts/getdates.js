// Dynamic copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Last modified date
document.getElementById('lastModified').textContent += document.lastModified;

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});