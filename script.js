// Particle.js Configuration
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#4cc9f0",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#4361ee",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
})

// Initialize AOS (Animate On Scroll)
AOS.init({
  once: false,
  mirror: true,
  duration: 800,
  offset: 100,
})

// Typing Animation
document.addEventListener("DOMContentLoaded", () => {
  const roles = ["Co-Founder @ Cloud LLC", "Discord Bot Developer", "Tech Innovator"]
  let roleIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingDelay = 100
  const erasingDelay = 50
  const newTextDelay = 2000

  function type() {
    const currentRole = roles[roleIndex]
    const typingText = document.getElementById("typing-text")

    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1)
      charIndex--
      typingDelay = erasingDelay
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1)
      charIndex++
      typingDelay = 100
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true
      typingDelay = newTextDelay
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      roleIndex = (roleIndex + 1) % roles.length
    }

    setTimeout(type, typingDelay)
  }

  // Start the typing animation
  setTimeout(type, newTextDelay)
})

// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navLinks = document.querySelector(".nav-links")

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active")
  hamburger.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>'
})

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    // Close mobile menu if open
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active")
      hamburger.innerHTML = '<i class="fas fa-bars"></i>'
    }

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    })
  })
})

// Header Scroll Effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header")
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Form Submission with Discord Webhook
const contactForm = document.getElementById("contactForm")
const successMessage = document.getElementById("successMessage")
const errorMessage = document.getElementById("errorMessage")

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Get form values
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value

  // Basic validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address")
    return
  }

  try {
    // Send to Discord webhook
    const webhookUrl = "https://discord.com/api/webhooks/1360409737128054925/6NQstSpG4HzB0rg6dfEWwKw7nEZPDCrGG3VFy00mA5pGKdTpLcVB0fNwKPnEvJw0yQSq"
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        embeds: [{
          title: `New Contact Form Submission: ${subject}`,
          color: 4886754, // #4A9DF9 in decimal
          fields: [
            {
              name: "Name",
              value: name,
              inline: true
            },
            {
              name: "Email",
              value: email,
              inline: true
            },
            {
              name: "Message",
              value: message
            }
          ],
          footer: {
            text: "Sent from carzy.raptor's Portfolio"
          },
          timestamp: new Date().toISOString()
        }]
      })
    })

    if (response.ok) {
      // Show success message
      successMessage.classList.add("show")
      
      // Reset the form
      contactForm.reset()
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.remove("show")
      }, 5000)
    } else {
      // Show error message
      errorMessage.classList.add("show")
      
      // Hide error message after 5 seconds
      setTimeout(() => {
        errorMessage.classList.remove("show")
      }, 5000)
    }
  } catch (error) {
    console.error("Error sending message:", error)
    
    // Show error message
    errorMessage.classList.add("show")
    
    // Hide error message after 5 seconds
    setTimeout(() => {
      errorMessage.classList.remove("show")
    }, 5000)
  }
})

// 3D Tilt Effect for cards
const cards = document.querySelectorAll(".project-card, .about-img")

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${card.classList.contains("project-card") ? "translateY(-20px)" : ""}`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = card.classList.contains("project-card") ? "translateY(-20px)" : ""
    card.style.transition = "transform 0.5s ease"
  })
})
