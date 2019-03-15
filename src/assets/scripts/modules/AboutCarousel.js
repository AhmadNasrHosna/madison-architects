class AboutCarousel {
  constructor() {
    this.carouselTrack = document.querySelector('.about .jsCarouselTrack');
    this.carouselSlides = this.carouselTrack.children;
    this.UI();
    this.events();
  }

  UI() {
    this.carouselTrack.style.overflowX = 'initial';
  }

  events() {
    const that = this;

    function moveCarouselTrack(currentSlide, targetSlide) {      
      const amountToMove = targetSlide.getBoundingClientRect().left - that.carouselTrack.getBoundingClientRect().left;

      that.carouselTrack.style.transform = `translateX(-${amountToMove}px)`;
      currentSlide.classList.remove('current-slide');
      targetSlide.classList.add('current-slide');
    }

    function showHideButtons(targetSlide, button) {
      const firstSlide = that.carouselSlides[0];
      const lastSlide = that.carouselSlides[that.carouselSlides.length - 1];

      switch(targetSlide) {
        case firstSlide:
        case lastSlide:
          button.classList.add('is-disabled');
          break;
        case firstSlide.nextElementSibling:
          button.nextElementSibling.classList.remove('is-disabled');
          break;
        case lastSlide.previousElementSibling:
          button.previousElementSibling.classList.remove('is-disabled');
          break;
      }
    }
    
    // When I click next, carouselTrack goes to left
    function nextButton(e) {
      const nextButton = e.target.closest('.about .jsCarouselNextButton');
      if (!nextButton) return;
    
      const currentSlide   = that.carouselTrack.querySelector('.current-slide');
      const nextSlide      = currentSlide.nextElementSibling;
    
      moveCarouselTrack(currentSlide, nextSlide);
      showHideButtons(nextSlide, nextButton);
    }
    
    // When I click prev, carouselTrack goes to right
    function prevButton(e) {
      const prevButton = e.target.closest('.about .jsCarouselPrevButton');
      if (!prevButton) return;
    
      const currentSlide   = that.carouselTrack.querySelector('.current-slide');
      const prevSlide      = currentSlide.previousElementSibling;
    
      moveCarouselTrack(currentSlide, prevSlide);
      showHideButtons(prevSlide, prevButton);
    }
    
    document.addEventListener('click', (e) => {
      nextButton(e),
      prevButton(e)
    });
  }
}

export default AboutCarousel;