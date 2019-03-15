class TransactionCarousel {
  constructor() {
    this.carouselTrack = document.querySelector('.transactions .jsCarouselTrack');
    this.carouselItems = this.carouselTrack.children;
    this.carouselItemsLength = this.carouselItems.length;
    this.UI();
    this.events();
  }

  UI() {
    this.carouselTrack.style.overflowX = 'initial';
  }

  events() {
    const that = this;

    function moveCarouselTrack(dir, button) {
      const currentItem   = that.carouselTrack.querySelector('.current-item');
      const carouselItemMarginRight = +getComputedStyle(that.carouselItems[1]).marginRight.slice(0, -2);
      const nextItem      = currentItem.nextElementSibling;
      const prevItem      = currentItem.previousElementSibling;
      const trackWidth    = (that.carouselTrack.clientWidth - carouselItemMarginRight);
      const nextItemLeft  = nextItem.getBoundingClientRect().left - that.carouselTrack.getBoundingClientRect().left;
      // checkpoint is the slider end point & must be equal to trackWidth to stop sliding
      const checkPoint    = Math.floor(that.carouselTrack.scrollWidth - nextItemLeft);

      if (dir === 'toLeft') { // When I click Next button
        const amountToMove = nextItem.getBoundingClientRect().left - that.carouselTrack.getBoundingClientRect().left;

        that.carouselTrack.style.transform = `translateX(-${amountToMove}px)`;
        currentItem.classList.remove('current-item');
        nextItem.classList.add('current-item');

        if (checkPoint === trackWidth) {
          // Button is now disabled
          button.classList.add('is-disabled');
          // Stop sliding, it's end
          return;
        }

        // Button is now clickable
        if(amountToMove > 0) button.previousElementSibling.classList.remove('is-disabled');     

      } else if (dir === 'toRight') { // When I click Prevoius button
        const amountToMove = prevItem.getBoundingClientRect().left - that.carouselTrack.getBoundingClientRect().left;

        // Button is now clickable
        if (checkPoint !== trackWidth) button.nextElementSibling.classList.remove('is-disabled');

        that.carouselTrack.style.transform = `translateX(-${amountToMove}px)`;
        currentItem.classList.remove('current-item');
        prevItem.classList.add('current-item');

        // Button is now disabled
        if(amountToMove === 0) button.classList.add('is-disabled');        
      }
    }

    // When I click next, carouselTrack goes to left
    function nextButton(e) {
      const nextButton = e.target.closest('.transactions .jsCarouselNextButton');
      if (!nextButton) return;
      
      moveCarouselTrack('toLeft', nextButton);
    }

    // When I click prev, carouselTrack goes to right
    function prevButton(e) {
      const prevButton = e.target.closest('.transactions .jsCarouselPrevButton');
      if (!prevButton) return;

      moveCarouselTrack('toRight', prevButton);
    }

    document.addEventListener('click', (e) => {
      nextButton(e),
      prevButton(e)
    });
  }
}

export default TransactionCarousel;