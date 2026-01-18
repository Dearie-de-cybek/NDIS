document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-nav');
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navWrapper = document.querySelector('.nav-menu-wrapper');
    const icon = mobileBtn.querySelector('i');

    // 1. Sticky Header Animation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // 2. Mobile Menu Toggle
    mobileBtn.addEventListener('click', () => {
        navWrapper.classList.toggle('active');
        
        // Toggle Icon between Hamburger and Close (X)
        if (navWrapper.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navWrapper.classList.remove('active');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        });
    });
});





// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
    
    var form = document.getElementById("contact-form");
    var status = document.getElementById("form-status");

    if (form) {
        async function handleSubmit(event) {
            event.preventDefault(); // Stop the page from redirecting
            
            var data = new FormData(event.target);
            
            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // Success!
                    status.innerHTML = "Thank you! Your message has been sent successfully.";
                    status.className = "status-success"; // Applies green styling
                    status.style.display = "block";
                    form.reset(); // Clears the inputs
                } else {
                    // Error from server
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            status.innerHTML = "Oops! There was a problem submitting your form.";
                        }
                        status.className = "status-error"; // Applies red styling
                        status.style.display = "block";
                    })
                }
            }).catch(error => {
                // Network error
                status.innerHTML = "Oops! There was a problem connecting to the server.";
                status.className = "status-error";
                status.style.display = "block";
            });
        }

        form.addEventListener("submit", handleSubmit);
    }
});