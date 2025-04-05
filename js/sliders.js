document.addEventListener('DOMContentLoaded', function() {
  // Données des slides du hero
  const heroSlides = [
      {
          title: "Your Pet Deserves the Best",
          description: "Give your furry friend the care, love, and comfort they deserve with premium products designed for their happiness and well-being.",
          backgroundImage: "url('images/heroImage.png')",
          buttonText: "Discover Products"
      },
      {
          title: "Premium Pet Food & Treats",
          description: "Nourish your pets with our selection of high-quality food and treats made with natural ingredients for optimal health and energy.",
          backgroundImage: "url('images/heroImage1.png')",
          buttonText: "Shop Food"
      },
      {
          title: "Smart Pet Technology",
          description: "Make pet care easier with our innovative pet tech products designed to monitor, entertain, and improve your pet's daily life.",
          backgroundImage: "url('images/heroImage2.png')",
          buttonText: "Explore Tech"
      }
  ];

  // =========================================================================
  // Section: Hero Section
  // =========================================================================
  const heroSection = document.getElementById('hero');
  const heroTitle = document.querySelector('.hero-content h1');
  const heroDescription = document.querySelector('.hero-content p');
  const heroButton = document.querySelector('.hero-content .btn-primary');
  const dots = document.querySelectorAll('.hero .dot');

  let currentSlideIndex = 0;
  let slideInterval;

  initHeroSlider();

  function initHeroSlider() {
      if (!heroSection || !heroTitle || !heroDescription || !heroButton || dots.length === 0) {
          console.error("Éléments DOM du hero slider non trouvés");
          return;
      }

      dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
              goToSlide(index);
          });
      });

      startAutoSlide();
      updateSlideContent();
      updateActiveDot();
  }

  function startAutoSlide() {
      slideInterval = setInterval(() => {
          nextSlide();
      }, 5000);
  }

  function stopAutoSlide() {
      clearInterval(slideInterval);
  }

  function goToSlide(index) {
      stopAutoSlide();
      currentSlideIndex = index;
      updateSlideContent();
      updateActiveDot();
      startAutoSlide();
  }

  function nextSlide() {
      currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
      updateSlideContent();
      updateActiveDot();
  }

  function updateSlideContent() {
      const currentSlide = heroSlides[currentSlideIndex];
      heroTitle.textContent = currentSlide.title;
      heroDescription.textContent = currentSlide.description;
      heroButton.textContent = currentSlide.buttonText;
      heroSection.style.background = `${currentSlide.backgroundImage} no-repeat center`;
      heroSection.style.backgroundSize = 'cover';
  }

  function updateActiveDot() {
      dots.forEach((dot, index) => {
          if (index === currentSlideIndex) {
              dot.classList.add('active');
          } else {
              dot.classList.remove('active');
          }
      });
  }

  if (typeof gsap !== 'undefined') {
      gsap.from('.hero-content h1', {
          y: 50,
          duration: 1,
          delay: 0.3
      });

      gsap.from('.hero-content p', {
          y: 30,
          duration: 1,
          delay: 0.6
      });

      gsap.from('.hero-content .btn-primary', {
          y: 20,
          duration: 1,
          delay: 0.9
      });

      gsap.from('.paw-path', {
          x: -50,
          duration: 1.2,
          delay: 1.2
      });
  } else {
      console.warn("GSAP n'est pas chargé, les animations ne fonctionneront pas");
  }

  // =========================================================================
  // Section: Brand Partners Section
  // =========================================================================
  initGenericSlider('.brands-wrapper', '.brands-slider .prev', '.brands-slider .next', '.brand-item');

  // =========================================================================
  // Section: New Arrivals Section
  // =========================================================================
  initGenericSlider('.products-wrapper', '.products-slider .prev', '.products-slider .next', '.product-item');

  // =========================================================================
  // Section: Featured Product Section
  // =========================================================================
  initGenericSlider('.featured-slider', '.featured-slider .prev', '.featured-slider .next', '.featured-slide');

  // =========================================================================
  // Section: Our Journey Section
  // =========================================================================
  const yearsSlider = document.querySelector('.timeline-years');
  const yearItems = yearsSlider?.querySelectorAll('.year');
  const yearPrevBtn = document.querySelector('.timeline-navigation .prev');
  const yearNextBtn = document.querySelector('.timeline-navigation .next');
  
  if (yearsSlider && yearItems && yearItems.length > 0 && yearPrevBtn && yearNextBtn) {
      let activeYearIndex = Array.from(yearItems).findIndex(year => year.classList.contains('active'));
      if (activeYearIndex === -1) activeYearIndex = 0;
      
      function updateActiveYear() {
          yearItems.forEach((year, index) => {
              if (index === activeYearIndex) {
                  year.classList.add('active');
              } else {
                  year.classList.remove('active');
              }
          });
          
          const journeyCards = document.querySelectorAll('.journey-card');
          journeyCards.forEach(card => {
              const cardYear = card.getAttribute('data-year');
              if (cardYear === yearItems[activeYearIndex].textContent) {
                  card.classList.add('active');
              } else {
                  card.classList.remove('active');
              }
          });
          
          yearPrevBtn.disabled = activeYearIndex === 0;
          yearNextBtn.disabled = activeYearIndex === yearItems.length - 1;
      }
      
      yearNextBtn.addEventListener('click', function() {
          if (activeYearIndex < yearItems.length - 1) {
              activeYearIndex++;
              updateActiveYear();
          }
      });
      
      yearPrevBtn.addEventListener('click', function() {
          if (activeYearIndex > 0) {
              activeYearIndex--;
              updateActiveYear();
          }
      });
      
      updateActiveYear();
  } else {
      console.warn("Éléments de la timeline des années non trouvés");
  }

  // Fonction pour initialiser un slider générique
  function initGenericSlider(wrapperSelector, prevBtnSelector, nextBtnSelector, itemSelector) {
      const wrapper = document.querySelector(wrapperSelector);
      const prevBtn = document.querySelector(prevBtnSelector);
      const nextBtn = document.querySelector(nextBtnSelector);
      
      if (!wrapper) {
          console.error(`Élément wrapper non trouvé: ${wrapperSelector}`);
          return;
      }
      
      const items = wrapper.querySelectorAll(itemSelector);
      
      if (!prevBtn || !nextBtn || items.length === 0) {
          console.error(`Éléments du slider non trouvés pour: ${wrapperSelector}`);
          return;
      }
      
      let visibleItems = items.length;
      
      function updateButtonStates() {
          if (visibleItems === items.length) {
              prevBtn.classList.add('disabled');
              prevBtn.disabled = true;
          } else {
              prevBtn.classList.remove('disabled');
              prevBtn.disabled = false;
          }
          
          if (visibleItems === 1) {
              nextBtn.classList.add('disabled');
              nextBtn.disabled = true;
          } else {
              nextBtn.classList.remove('disabled');
              nextBtn.disabled = false;
          }
      }
      
      nextBtn.addEventListener('click', function() {
          console.log("Next button clicked", visibleItems);
          if (visibleItems > 1) {
              const elementsToHide = Array.from(items).filter(item => 
                  item.style.display !== 'none' && getComputedStyle(item).display !== 'none'
              );
              if (elementsToHide.length > 0) {
                  elementsToHide[0].style.display = 'none';
                  visibleItems--;
                  updateButtonStates();
              }
          }
      });
      
      prevBtn.addEventListener('click', function() {
          console.log("Prev button clicked", visibleItems);
          if (visibleItems < items.length) {
              const elementsHidden = Array.from(items).filter(item => 
                  item.style.display === 'none' || getComputedStyle(item).display === 'none'
              );
              
              if (elementsHidden.length > 0) {
                  const elementToShow = elementsHidden[elementsHidden.length - 1];
                  elementToShow.style.display = '';
                  visibleItems++;
                  updateButtonStates();
              }
          }
      });
      
      updateButtonStates();
  }
});