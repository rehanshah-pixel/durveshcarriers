/* ==========================================
   DURVESH CARRIERS - WEBSITE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    // MOBILE NAVIGATION
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navbar.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        // CLOSE MOBILE MENU AFTER CLICKING A LINK
        navbar.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navbar.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
            });
        });
    }

    // HEADER SHADOW WHEN SCROLLING
    const header = document.getElementById("header");

    if (header) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 30) {
                header.style.boxShadow = "0 5px 25px rgba(0,0,0,0.12)";
            } else {
                header.style.boxShadow = "0 3px 20px rgba(0,0,0,0.05)";
            }
        });
    }

    // AUTOMATIC FOOTER YEAR
    const currentYearEl = document.getElementById("currentYear");
    if (currentYearEl) {
        currentYearEl.textContent = String(new Date().getFullYear());
    }

    // WHATSAPP QUOTATION FORM
    const quoteForm = document.getElementById("quoteForm");
    // Target WhatsApp number including country code (91 for India)
    const whatsappNumber = "918080053786";

    if (quoteForm) {
        quoteForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("customerName")?.value.trim() || "";
            const rawPhone = document.getElementById("customerPhone")?.value.trim() || "";
            const pickup = document.getElementById("pickup")?.value.trim() || "";
            const destination = document.getElementById("destination")?.value.trim() || "";
            const goods = document.getElementById("goods")?.value.trim() || "";
            const message = document.getElementById("message")?.value.trim() || "";

            // Normalize digits: strip spaces/dashes, remove leading 91 (if 12 digits) or leading 0
            let digitsOnly = rawPhone.replace(/\D/g, "");
            if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
                digitsOnly = digitsOnly.slice(2);
            } else if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
                digitsOnly = digitsOnly.slice(1);
            }

            if (!/^[6-9][0-9]{9}$/.test(digitsOnly)) {
                alert("Please enter a valid 10-digit Indian mobile number.");
                return;
            }

            const whatsappMessage =
                "NEW TRANSPORTATION ENQUIRY\n\n" +
                "Company: DURVESH CARRIERS\n\n" +
                "Customer Name: " + name + "\n" +
                "Customer Phone: +91 " + digitsOnly + "\n" +
                "Pickup Location: " + pickup + "\n" +
                "Destination: " + destination + "\n" +
                "Cargo Details: " + goods + "\n" +
                "Additional Requirements: " + (message || "Not provided");

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(whatsappMessage);

            window.location.href = whatsappURL;
        });
    }

    // SCROLL REVEAL ANIMATION
    const revealElements = document.querySelectorAll(
        ".service-card, .contact-card, .why-item, .fleet-card"
    );

    if (revealElements.length > 0 && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }
});
