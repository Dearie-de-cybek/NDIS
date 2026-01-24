// --- TAB FUNCTION (ICAN Page) ---
window.openTab = function(evt, tabName) {
    var i, tabContent, tabBtn;
    
    // Hide all tab content
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
        tabContent[i].classList.remove("active-content");
    }

    // Remove active class from all buttons
    tabBtn = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabBtn.length; i++) {
        tabBtn[i].className = tabBtn[i].className.replace(" active", "");
    }

    // Show the current tab
    var selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = "block";
        setTimeout(() => {
            selectedTab.classList.add("active-content");
        }, 10);
    }
    
    // Add active class to the button that was clicked
    if (evt) {
        evt.currentTarget.className += " active";
    }
};

// --- SLIDER CONTROLS (Home Page) ---
// We define these on 'window' so the onclick buttons in HTML work
let slideIndex = 1;
let slideInterval;

window.plusSlides = function(n) {
    showSlides(slideIndex += n);
    resetTimer();
}

window.currentSlide = function(n) {
    showSlides(slideIndex = n);
    resetTimer();
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("hero-slide");
    let dots = document.getElementsByClassName("dot");
    
    // Safety check: If no slides exist (e.g., on Contact page), stop here
    if (slides.length === 0) return;

    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
        slides[i].classList.remove("active");
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(() => {
        slides[slideIndex-1].classList.add("active");
    }, 10);
    
    if (dots.length > 0) {
        dots[slideIndex-1].className += " active";
    }
}

function resetTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(function() {
        window.plusSlides(1);
    }, 5000);
}


/* 2. DOM LOADED EVENTS
   Everything here waits for the page to finish loading before running.
*/
document.addEventListener('DOMContentLoaded', () => {

    /* --- A. STICKY HEADER & MOBILE NAV --- */
    const header = document.querySelector('.main-nav');
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navWrapper = document.querySelector('.nav-menu-wrapper');
    
    if (header && mobileBtn && navWrapper) {
        const icon = mobileBtn.querySelector('i');

        // Sticky Animation
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });

        // Mobile Menu Toggle
        mobileBtn.addEventListener('click', () => {
            navWrapper.classList.toggle('active');
            
            if (navWrapper.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                document.body.style.overflow = 'hidden'; 
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                document.body.style.overflow = 'auto'; 
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
    }


    /* --- B. HERO SLIDER INIT --- */
    // Only run this if we are on a page that actually has slides
    let slides = document.getElementsByClassName("hero-slide");
    if (slides.length > 0) {
        showSlides(slideIndex);
        // Start Auto-play
        slideInterval = setInterval(function() {
            window.plusSlides(1);
        }, 5000);
    }


    /* --- C. ACCORDION (FAQ) --- */
    var acc = document.getElementsByClassName("accordion-header");
    if (acc.length > 0) {
        for (var i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                // Toggle active class (rotates icon)
                this.classList.toggle("active");

                // Toggle panel visibility
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                } 
            });
        }
    }


    /* --- D. CONTACT FORM --- */
    var form = document.getElementById("contact-form");
    var status = document.getElementById("form-status");

    if (form) {
        async function handleSubmit(event) {
            event.preventDefault(); 
            var data = new FormData(event.target);
            
            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    status.innerHTML = "Thank you! Your message has been sent successfully.";
                    status.className = "status-success"; 
                    status.style.display = "block";
                    form.reset(); 
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            status.innerHTML = "Oops! There was a problem submitting your form.";
                        }
                        status.className = "status-error";
                        status.style.display = "block";
                    })
                }
            }).catch(error => {
                status.innerHTML = "Oops! There was a problem connecting to the server.";
                status.className = "status-error";
                status.style.display = "block";
            });
        }
        form.addEventListener("submit", handleSubmit);
    }

});