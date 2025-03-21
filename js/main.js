gsap.registerPlugin(ScrollTrigger);

// =========================================================================
// Section: Hero - Animations et slider
// =========================================================================
document.addEventListener("DOMContentLoaded", function () {
  const heroTimeline = gsap.timeline();
  heroTimeline
    .from(".gsap-fade-in", {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
    })
    .from(
      ".gsap-slide-in",
      { x: 100, opacity: 0, duration: 1, ease: "power2.out" },
      "-=0.4"
    )
    .from(
      ".gsap-slide-up",
      { y: 50, opacity: 0, duration: 0.8, ease: "back.out(1.5)" },
      "-=0.6"
    )
    .from(
      ".paw-print",
      {
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        duration: 0.5,
        ease: "back.out(2)",
      },
      "-=0.7"
    )
    .from(
      ".circle",
      { scale: 0, opacity: 0, stagger: 0.2, duration: 0.8, ease: "power1.out" },
      "-=0.5"
    );

  gsap.from(".paw-path", {
    backgroundPosition: "-100px 0",
    repeat: -1,
    duration: 15,
    ease: "none",
  });

  const initHeroSlider = () => {
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".slider-pagination .dot");
    let currentSlide = 0;

    if (slides.length === 0 || dots.length === 0) return;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
      });
      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });

    showSlide(currentSlide);

    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  };
  initHeroSlider();

  // =========================================================================
  // Section: Header / Navigation - Gestion du menu mobile
  // =========================================================================
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
  // Section: Brand Partners - Animations et slider
  // =========================================================================
  const brandItems = document.querySelectorAll(".gsap-scale-in");
  brandItems.forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      scale: 0.5,
      duration: 0.5,
      delay: 0.1 * index,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: ".brand-partners",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  const initBrandsSlider = () => {
    const brandsWrapper = document.querySelector(".brands-wrapper");
    const brandItems = document.querySelectorAll(".brand-item");
    const prevBtn = document.querySelector(".slider-nav.prev");
    const nextBtn = document.querySelector(".slider-nav.next");

    if (!brandsWrapper || brandItems.length === 0) return;

    let currentPosition = 0;
    const itemWidth = 180 + 32;
    const visibleItems = Math.floor(brandsWrapper.offsetWidth / itemWidth);
    const maxPosition = brandItems.length - visibleItems;

    brandItems.forEach((item, index) => {
      gsap.set(item, { x: index * itemWidth });
    });

    const updatePositions = () => {
      brandItems.forEach((item, index) => {
        gsap.to(item, {
          x: (index - currentPosition) * itemWidth,
          opacity:
            index < currentPosition || index >= currentPosition + visibleItems
              ? 0.4
              : 1,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    nextBtn.addEventListener("click", () => {
      if (currentPosition < maxPosition) {
        currentPosition++;
        updatePositions();
      } else {
        gsap.to(nextBtn, { x: 5, duration: 0.1, repeat: 3, yoyo: true });
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentPosition > 0) {
        currentPosition--;
        updatePositions();
      } else {
        gsap.to(prevBtn, { x: -5, duration: 0.1, repeat: 3, yoyo: true });
      }
    });

    window.addEventListener("resize", () => {
      const newVisibleItems = Math.floor(brandsWrapper.offsetWidth / itemWidth);
      if (newVisibleItems !== visibleItems) {
        currentPosition = 0;
        updatePositions();
      }
    });
  };
  initBrandsSlider();

  // =========================================================================
  // Section: New Arrivals - Slider des produits
  // =========================================================================
  const initProductsSlider = () => {
    const productsWrapper = document.querySelector(".products-wrapper");
    const productItems = document.querySelectorAll(".product-item");
    const prevBtn = document.querySelector(".products-slider .slider-nav.prev");
    const nextBtn = document.querySelector(".products-slider .slider-nav.next");

    if (!productsWrapper || productItems.length === 0) return;

    let currentPosition = 0;
    const itemWidth = 200;
    const visibleItems = Math.floor(productsWrapper.offsetWidth / itemWidth);
    const maxPosition = productItems.length - visibleItems;

    productItems.forEach((item, index) => {
      gsap.set(item, { x: index * itemWidth });
    });

    const updatePositions = () => {
      productItems.forEach((item, index) => {
        gsap.to(item, {
          x: (index - currentPosition) * itemWidth,
          opacity:
            index < currentPosition || index >= currentPosition + visibleItems
              ? 0.4
              : 1,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    nextBtn.addEventListener("click", () => {
      if (currentPosition < maxPosition) {
        currentPosition++;
        updatePositions();
      } else {
        gsap.to(nextBtn, { x: 5, duration: 0.1, repeat: 3, yoyo: true });
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentPosition > 0) {
        currentPosition--;
        updatePositions();
      } else {
        gsap.to(prevBtn, { x: -5, duration: 0.1, repeat: 3, yoyo: true });
      }
    });

    window.addEventListener("resize", () => {
      const newVisibleItems = Math.floor(
        productsWrapper.offsetWidth / itemWidth
      );
      if (newVisibleItems !== visibleItems) {
        currentPosition = 0;
        updatePositions();
      }
    });
  };
  initProductsSlider();

  // =========================================================================
  // Section: Categories & New Arrivals - Gestion des tooltips pour les badges
  // =========================================================================
  const badgeItems = document.querySelectorAll(
    ".category-item.has-badge, .product-item.has-badge"
  );

  badgeItems.forEach((item) => {
    const badge = item.querySelector(".badge");
    const tooltip = item.querySelector(".tooltip");
    const closeBtn = item.querySelector(".tooltip-close");

    badge.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      tooltip.classList.toggle("active");
    });

    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      tooltip.classList.remove("active");
    });
  });

  // =========================================================================
  // Section: Featured Product - Slider et animations
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
});

// =========================================================================
// Section: Product Detail - Gestion des détails du produit
// =========================================================================
document.addEventListener("DOMContentLoaded", function () {
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
  // FAQ Accordion
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
  // Our journey
  // =========================================================================

  const initJourneyTimeline = () => {
    const timelineYears = document.querySelectorAll(".timeline-years .year");
    const prevBtn = document.querySelector(".timeline-nav.prev");
    const nextBtn = document.querySelector(".timeline-nav.next");

    if (!timelineYears.length) {
      console.error("Timeline years elements not found!");
      return;
    }

    const yearContent = {
      2020: {
        title: "Starting Our Journey 2020",
        text: "We began our small operation with a simple vision to bring quality pet products to our community.",
        image: "images/timeline-2020.jpg",
      },
      2021: {
        title: "First Expansion 2021",
        text: "After a successful first year, we expanded our product line and moved to a larger location.",
        image: "images/timeline-2021.jpg",
      },
      2022: {
        title: "NEW STORE OPENING 2022",
        text: "We proudly opened our doors for the very first time, marking the start of our pet-loving adventure. Filled with excitement for this special day, we welcomed friends, family, and fashion enthusiasts into our shared space, showcasing our unique selections and vision.",
        image: "images/timeline-2022.jpg",
      },
      2023: {
        title: "Online Store Launch 2023",
        text: "We embraced digital transformation with the launch of our online store, reaching pet lovers nationwide.",
        image: "images/timeline-2023.jpg",
      },
      2024: {
        title: "International Recognition 2024",
        text: "Our dedication to quality and innovation earned us international recognition in the pet fashion industry.",
        image: "images/timeline-2024.jpg",
      },
    };

    let currentYearIndex = 2;

    const updateContent = (yearText) => {
      const content = yearContent[yearText];
      if (!content) return;

      const cardTemplate = `
      <div class="journey-card active" data-year="${yearText}">
        <div class="journey-image">
          <img src="${content.image}" alt="${content.title}">
        </div>
        <div class="journey-content">
          <h3>${content.title}</h3>
          <p>${content.text}</p>
        </div>
      </div>
    `;

      const cardsContainer = document.querySelector(".journey-cards");
      if (cardsContainer) {
        gsap.to(cardsContainer, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          onComplete: () => {
            cardsContainer.innerHTML = cardTemplate;
            gsap.to(cardsContainer, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          },
        });
      }
    };

    const updateActiveYear = (index) => {
      timelineYears.forEach((year, i) => {
        year.classList.toggle("active", i === index);

        if (i === index) {
          const yearText = year.textContent;
          updateContent(yearText);
        }
      });

      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === timelineYears.length - 1;
    };
    timelineYears.forEach((year, index) => {
      year.style.display = "block";
      year.addEventListener("click", () => {
        currentYearIndex = index;
        updateActiveYear(currentYearIndex);
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentYearIndex > 0) {
          currentYearIndex--;
          updateActiveYear(currentYearIndex);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentYearIndex < timelineYears.length - 1) {
          currentYearIndex++;
          updateActiveYear(currentYearIndex);
        }
      });
    }
    updateActiveYear(currentYearIndex);

    gsap.from(".journey-card", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".our-journey",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(".timeline-years .year", {
      opacity: 0,
      y: 10,
      stagger: 0.1,
      duration: 0.5,
      delay: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".timeline-navigation",
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  };

  initJourneyTimeline();

  // =========================================================================
  // Footer
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
