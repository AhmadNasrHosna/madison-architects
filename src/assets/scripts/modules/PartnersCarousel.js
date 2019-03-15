class PartnersCarousel {
  constructor() {
    this.carouselTrack = document.querySelector('.partners .jsCarouselTrack');
    this.carouselSlides = Array.from(this.carouselTrack.children);
    this.nextButton = document.querySelector('.partners .jsCarouselNextButton');
    this.prevButton = document.querySelector('.partners .jsCarouselPrevButton');
    this.carouselNavigation = document.querySelector('.partners .jsCarouselNavigation');
    this.UI();
    this.carouselNavigationIndicators = Array.from(this.carouselNavigation.getElementsByTagName('li'));
    this.events();
  }

  UI() {
    this.carouselTrack.style.overflowX = 'initial';
 
    // Build Navigation Indicators
    this.carouselNavigation.innerHTML = this.carouselSlides.map(
      (slide, i) => `<li><span class="visually-hidden">Slide ${i + 1}</span></span></li>`
    ).join('');

    this.carouselNavigation.children[0].classList.add('current-slide');      
  }

  events() {
    const that = this;

    function moveCarouselTrack(currentSlide, targetSlide) {      
      const amountToMove = targetSlide.getBoundingClientRect().left - that.carouselTrack.getBoundingClientRect().left;

      that.carouselTrack.style.transform = `translateX(-${amountToMove}px)`;
      currentSlide.classList.remove('current-slide');
      targetSlide.classList.add('current-slide');
    }

    function showHideButtons(targetSlide) {
      const firstSlide = that.carouselSlides[0];
      const lastSlide = that.carouselSlides[that.carouselSlides.length - 1];

      switch(targetSlide) {
        case firstSlide:
          that.prevButton.classList.add('is-disabled');
          that.nextButton.classList.remove('is-disabled');
          break;
        case lastSlide:
          that.nextButton.classList.add('is-disabled');
          that.prevButton.classList.remove('is-disabled');
          break;
        default:
          that.nextButton.classList.remove('is-disabled');
          that.prevButton.classList.remove('is-disabled');
      }
    }

    function updateNavDots(targetSlide) {
      const targetSlideIndex = that.carouselSlides.findIndex( slide => slide == targetSlide)
      
      that.carouselNavigationIndicators.forEach(dot => dot.classList.remove('current-slide'));
      that.carouselNavigationIndicators[targetSlideIndex].classList.add('current-slide');
    }

    // When I click next, carouselTrack goes to left
    function nextButton(e) {
      const nextButton = e.target.closest('.partners .jsCarouselNextButton');
      if (!nextButton) return;
    
      const currentSlide   = that.carouselTrack.querySelector('.current-slide');
      const nextSlide      = currentSlide.nextElementSibling;

      moveCarouselTrack(currentSlide, nextSlide);
      showHideButtons(nextSlide);
      updateNavDots(nextSlide);
    }
    
    // When I click prev, carouselTrack goes to right
    function prevButton(e) {
      const prevButton = e.target.closest('.partners .jsCarouselPrevButton');
      if (!prevButton) return;
    
      const currentSlide   = that.carouselTrack.querySelector('.current-slide');
      const prevSlide      = currentSlide.previousElementSibling; 
    
      moveCarouselTrack(currentSlide, prevSlide);
      showHideButtons(prevSlide);
      updateNavDots(prevSlide);
    }

    function handleNaviagtionClicks(e) {
      const navDot = e.target;
      if (navDot.tagName != 'LI') return;

      const currentSlide   = that.carouselTrack.querySelector('.current-slide');

      const targetDot = that.carouselNavigationIndicators.findIndex( dot => dot == navDot);
      const targetSlide = that.carouselSlides[targetDot];

      moveCarouselTrack(currentSlide, targetSlide);
      showHideButtons(targetSlide)
      updateNavDots(targetSlide);
    }

    document.addEventListener('click', (e) => {
      nextButton(e),
      prevButton(e)
    });

    that.carouselNavigation.addEventListener('click', handleNaviagtionClicks);
  }

}

export default PartnersCarousel;