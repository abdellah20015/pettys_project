// =========================================================================
// Section: Top Bar & Header / Navigation - Scroll header with top bar
// =========================================================================
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
  trigger: ".hero",        
  start: "bottom top",    
  onEnter: () => {
    if (!document.querySelector('.sticky-header-container')) {
      const stickyContainer = document.createElement('div');
      stickyContainer.className = 'sticky-header-container';
      const topBar = document.querySelector('.top-bar');
      const mainHeader = document.querySelector('.main-header');
      topBar.parentNode.insertBefore(stickyContainer, topBar);
      stickyContainer.appendChild(topBar);
      stickyContainer.appendChild(mainHeader);
    }
    gsap.set(".sticky-header-container", {
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 1001
    });

    gsap.to(".main-header", {
      backgroundColor: "#FFFFFF", 
      borderBottomColor: "#000000",
      duration: 0.5
    });
    gsap.to(".main-nav .nav, .nav-right .icon-btn i", {
      color: "#000000",             
      duration: 0.5
    });
    gsap.to(".logo img", {
      filter: "none",               
      duration: 0.5
    });
  },
  onLeaveBack: () => {
    const stickyContainer = document.querySelector('.sticky-header-container');
    if (stickyContainer) {
      const topBar = stickyContainer.querySelector('.top-bar');
      const mainHeader = stickyContainer.querySelector('.main-header');
      const parentElement = stickyContainer.parentNode;
      
      stickyContainer.removeChild(topBar);
      stickyContainer.removeChild(mainHeader);
      
      parentElement.insertBefore(topBar, stickyContainer);
      parentElement.insertBefore(mainHeader, stickyContainer);
      
      parentElement.removeChild(stickyContainer);
    }

    gsap.to(".main-header", {
      backgroundColor: "#948373",   
      borderBottomColor: "#FFFF", 
      duration: 0.5
    });
    gsap.to(".main-nav .nav, .nav-right .icon-btn i", {
      color: "#FFFFFF",             
      duration: 0.5
    });
    gsap.to(".logo img", {
      filter: "invert(1)", 
      duration: 0.5
    });
  }
});

// =========================================================================
// Section: Header / Navigation - Gestion du menu mobile
// =========================================================================
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
  const createMobileMenu = () => {
    const header = document.querySelector(".main-header");
    const nav = document.querySelector(".main-nav");

    const mobileMenuBtn = document.createElement("button");
    mobileMenuBtn.className = "mobile-menu-toggle";
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

    const closeMenuBtn = document.createElement("button");
    closeMenuBtn.className = "mobile-menu-close";
    closeMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeMenuBtn.style.display = "none";

    const mediaQuery = window.matchMedia("(max-width: 768px)");

    function handleScreenChange(e) {
      if (e.matches) {
        if (!document.querySelector(".mobile-menu-toggle")) {
          header.querySelector(".container").prepend(mobileMenuBtn);
          nav.classList.add("mobile");
          nav.prepend(closeMenuBtn);
        }
      } else {
        if (document.querySelector(".mobile-menu-toggle")) {
          mobileMenuBtn.remove();
          closeMenuBtn.remove();
          nav.classList.remove("mobile");
          nav.classList.remove("open");
        }
      }
    }
    handleScreenChange(mediaQuery);
    mediaQuery.addEventListener("change", handleScreenChange);

    mobileMenuBtn.addEventListener("click", function () {
      nav.classList.toggle("open");
      const isOpen = nav.classList.contains("open");
      this.innerHTML = isOpen
        ? '<i class="fas fa-bars"></i>'
        : '<i class="fas fa-bars"></i>';
      closeMenuBtn.style.display = isOpen ? "block" : "none";

      if (isOpen) {
        gsap.from(".main-nav.mobile.open .nav-list", {
          x: -50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(".main-nav.mobile.open .nav-list", {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    });
    closeMenuBtn.addEventListener("click", function () {
      nav.classList.remove("open");
      closeMenuBtn.style.display = "none";
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

      gsap.to(".main-nav.mobile.open .nav-list", {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  };
  createMobileMenu();

  // =========================================================================
  // Section: Product Detail Section
  // =========================================================================
  const initProductDetail = () => {
    const productDetailSection = document.querySelector(".product-detail");
    if (!productDetailSection) {
      return;
    }

    const mainImage = document.querySelector(".product-detail .main-image img");
    const thumbnails = document.querySelectorAll(".product-detail .thumbnail");

    if (!mainImage || thumbnails.length === 0) {
      return;
    }

    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        thumbnails.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");

        const newSrc = this.querySelector("img").src;
        gsap.to(mainImage, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            mainImage.src = newSrc;
            gsap.to(mainImage, {
              opacity: 1,
              duration: 0.3,
            });
          },
        });
      });
    });

    const colorOptions = document.querySelectorAll(
      ".product-detail .color-option"
    );

    colorOptions.forEach((color) => {
      color.addEventListener("click", function () {
        colorOptions.forEach((c) => c.classList.remove("active"));
        this.classList.add("active");
        const selectedColor = this.classList.contains("black")
          ? "black"
          : this.classList.contains("gray")
          ? "gray"
          : "brown";
        const productGallery = document.querySelector(".product-gallery");
        productGallery.classList.remove("black", "gray", "brown");
        productGallery.classList.add(selectedColor);
      });
    });

    const addToCartBtn = document.querySelector(".product-detail .btn-cart");
    const cartCountElement = document.querySelector(".cart-count");

    if (addToCartBtn && cartCountElement) {
      addToCartBtn.addEventListener("click", function () {
        let currentCount = parseInt(cartCountElement.textContent) || 0;

        currentCount++;
        gsap.to(cartCountElement, {
          duration: 0.3,
          scale: 1.2,
          onComplete: () => {
            cartCountElement.textContent = currentCount;
            gsap.to(cartCountElement, {
              duration: 0.3,
              scale: 1,
            });
          },
        });

        gsap.fromTo(
          this,
          { scale: 1 },
          { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 }
        );
      });
    }

    gsap.from(".product-detail .product-gallery", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".product-detail",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".product-detail .product-info", {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".product-detail",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    const buttons = document.querySelectorAll(".product-detail .btn");
    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", function () {
        gsap.to(this, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      btn.addEventListener("mouseleave", function () {
        gsap.to(this, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  };
  initProductDetail();

  // =========================================================================
  // Section: Featured Product Section
  // =========================================================================
  const initFeaturedSlider = () => {
    const featuredSlides = document.querySelectorAll(".featured-slide");
    const dots = document.querySelectorAll(
      ".featured-product .slider-pagination .dot"
    );
    let currentSlide = 0;

    if (featuredSlides.length === 0 || dots.length === 0) return;

    const showSlide = (index) => {
      featuredSlides.forEach((slide, i) => {
        gsap.to(slide, {
          opacity: i === index ? 1 : 0.5,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            slide.classList.toggle("active", i === index);
          },
        });
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });

    setInterval(() => {
      currentSlide = (currentSlide + 1) % featuredSlides.length;
      showSlide(currentSlide);
    }, 6000);

    gsap.from(".featured-product .featured-title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".featured-product",
        start: "top 70%",
      },
    });

    gsap.from(".featured-product .btn-featured", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.3,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: ".featured-product",
        start: "top 70%",
      },
    });

    gsap.from(".featured-product .featured-image img", {
      scale: 1.1,
      opacity: 0.8,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".featured-product",
        start: "top 70%",
      },
    });
  };
  initFeaturedSlider();

  // =========================================================================
  // Section: FAQ Section
  // =========================================================================
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const isActive = this.classList.contains("active");
      document.querySelectorAll(".faq-answer").forEach((a) => {
        a.style.display = "none";
      });
      document.querySelectorAll(".faq-question").forEach((q) => {
        q.classList.remove("active");
      });
      if (!isActive) {
        this.classList.add("active");
        answer.style.display = "block";
        gsap.from(answer, {
          opacity: 0,
          height: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  });

  // =========================================================================
  // Section: Footer Section
  // =========================================================================
  const backToTopBtn = document.querySelector(".back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});