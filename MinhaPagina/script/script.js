// script.js

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 700, // Animation duration
    once: false, // whether animation should happen only once - while scrolling down
    offset: 50, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
});

// Theme Toggle Functionality
const themeToggleButtons = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')];
const body = document.body;
const sunIconClass = 'fa-sun';
const moonIconClass = 'fa-moon';

// Function to apply the current theme
function applyTheme(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        themeToggleButtons.forEach(button => {
            if (button) button.innerHTML = `<i class="fas ${moonIconClass}"></i>`;
        });
    } else {
        body.classList.remove('dark-mode');
        themeToggleButtons.forEach(button => {
            if (button) button.innerHTML = `<i class="fas ${sunIconClass}"></i>`;
        });
    }
}

// Check for a saved theme preference in localStorage
const savedTheme = localStorage.getItem('theme');
let isDarkMode = false; // Default to light mode

if (savedTheme) {
    isDarkMode = savedTheme === 'dark';
} else {
    // Optional: Check for system preference
    // isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Apply the determined theme when the page loads
applyTheme(isDarkMode);

// Event listener for theme toggle buttons
themeToggleButtons.forEach(button => {
    if (button) {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent click from bubbling up if inside other clickable elements
            isDarkMode = !isDarkMode; // Toggle the state
            applyTheme(isDarkMode); // Apply the new theme
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Save preference
        });
    }
});


// Mobile Menu Toggle Functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const navLinksMobile = mobileMenu ? mobileMenu.querySelectorAll('a') : []; // Get all links within the mobile menu

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        // Toggle visibility using Tailwind's 'hidden' and a custom 'open' class for animation
        mobileMenu.classList.toggle('hidden');
        // Force a reflow before adding/removing 'open' to ensure transition works
        // void mobileMenu.offsetWidth; // This is a common trick, but might not be strictly necessary with max-height
        mobileMenu.classList.toggle('open');

        // Change hamburger icon to X and back
        const icon = mobileMenuButton.querySelector('i');
        if (mobileMenu.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navLinksMobile.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                mobileMenu.classList.add('hidden'); // Ensure it's hidden
                // Reset hamburger icon
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

} else {
    console.warn("Mobile menu button or mobile menu element not found. Ensure IDs 'mobile-menu-button' and 'mobile-menu' exist.");
}


// Set current year in the footer
const currentYearSpan = document.getElementById('currentYear');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
} else {
    console.warn("Element with id 'currentYear' not found in the footer.");
}
