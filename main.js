// Food Restaurant Website JavaScript

// Selecting all necessary DOM elements
const menuBar = document.querySelector("#menu-bar");
const navbar = document.querySelector(".navbar");
const categoryInputs = document.querySelectorAll(".catagory input");
const categoryImg = document.querySelector("#c-img");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar ul li a");

// Check if elements exist before adding event listeners
if (menuBar && navbar) {
  // Event listener for toggle menu
  menuBar.addEventListener("click", () => {
    menuBar.classList.toggle("times");
    menuBar.classList.toggle("active");
    navbar.classList.toggle("active");
  });
}

// Scroll event handler
document.addEventListener("scroll", () => {
  // Close mobile menu on scroll
  if (menuBar && navbar) {
    menuBar.classList.remove("times");
    menuBar.classList.remove("active");
    navbar.classList.remove("active");
  }

  // Connect sections with nav links
  connectSectionWithNavLink();
});

// Controlling menu image based on category selection
if (categoryInputs.length > 0 && categoryImg) {
  categoryInputs.forEach((element) => {
    element.addEventListener("click", () => {
      // Remove active class from all category buttons
      categoryInputs.forEach((ele) => {
        ele.classList.remove("active");
      });

      // Add active class to clicked button
      const value = element.value;
      element.classList.add("active");
      
      // Update image source based on selection
      categoryImg.src = `./images/menu-${value}.jpg`;
      
      // Add error handling for image loading
      categoryImg.onerror = function() {
        console.warn(`Image not found: ./images/menu-${value}.jpg`);
        // You could set a default image here
        // this.src = './images/default-menu.jpg';
      };
    });
  });
}

// Handle scroll event and mark active nav item
const connectSectionWithNavLink = () => {
  let current = "";

  if (sections.length > 0) {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      // Check if section is in viewport (with 60px offset for header)
      if (window.pageYOffset >= sectionTop - 60 && 
          window.pageYOffset < sectionTop + sectionHeight - 60) {
        current = section.getAttribute("id");
      }
    });
  }

  // Update active nav link
  if (navLinks.length > 0 && current) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      
      const linkHref = link.getAttribute("href");
      if (linkHref === `#${current}`) {
        link.classList.add("active");
      }
    });
  }
};

// Smooth scroll for navigation links
if (navLinks.length > 0) {
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          // Close mobile menu if open
          if (menuBar && navbar) {
            menuBar.classList.remove("times");
            menuBar.classList.remove("active");
            navbar.classList.remove("active");
          }
          
          // Smooth scroll to section
          const offsetTop = targetSection.offsetTop - 70; // Account for fixed header
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          });
        }
      }
    });
  });
}

// Form handling
const orderForm = document.querySelector(".order-form");
if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(orderForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const address = formData.get("address");
    
    // Basic validation
    if (!name || !email || !phone || !address) {
      alert("Please fill in all required fields.");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number.");
      return;
    }
    
    // Success message (in a real application, you'd send this to a server)
    alert(`Thank you, ${name}! Your order has been received. We'll contact you at ${email} to confirm your order.`);
    
    // Reset form
    orderForm.reset();
  });
}

// Add to cart functionality for popular items
const addToCartButtons = document.querySelectorAll(".p-card input[value='add to cart']");
if (addToCartButtons.length > 0) {
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const card = e.target.closest(".p-card");
      if (card) {
        const dishName = card.querySelector("h4").textContent;
        const price = card.querySelector(".price").textContent;
        
        // Simple cart functionality (in a real app, you'd use localStorage or a cart system)
        alert(`Added "${dishName}" (${price}) to your cart!`);
        
        // Add visual feedback
        button.style.backgroundColor = "#4CAF50";
        button.value = "added!";
        button.disabled = true;
        
        // Reset button after 2 seconds
        setTimeout(() => {
          button.style.backgroundColor = "";
          button.value = "add to cart";
          button.disabled = false;
        }, 2000);
      }
    });
  });
}

// Gallery image modal functionality (basic)
const galleryCards = document.querySelectorAll(".g-card");
if (galleryCards.length > 0) {
  galleryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const title = card.querySelector("h3");
      
      if (img && title) {
        // Simple modal alert (in a real app, you'd create a proper modal)
        alert(`Viewing: ${title.textContent}`);
      }
    });
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  console.log("Food Restaurant Website loaded successfully!");
  
  // Set initial active nav link based on current scroll position
  connectSectionWithNavLink();
  
  // Ensure default menu category is properly set
  const activeCategory = document.querySelector(".catagory input.active");
  if (activeCategory && categoryImg) {
    const value = activeCategory.value;
    categoryImg.src = `./images/menu-${value}.jpg`;
  }
});

// Error handling for missing images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("error", function() {
      console.warn(`Failed to load image: ${this.src}`);
      // You could set a placeholder image here
      // this.src = './images/placeholder.jpg';
    });
  });
});

// Performance optimization: Throttle scroll events
let ticking = false;
function updateOnScroll() {
  connectSectionWithNavLink();
  ticking = false;
}

document.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
});

// This project enhanced with better functionality and error handling
// Original project made by Fahad at 27th April, 2022
// Enhanced version with improved UX and accessibility