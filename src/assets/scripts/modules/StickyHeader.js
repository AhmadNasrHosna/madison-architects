class StickyHeader {
  constructor() {
    this.siteHeader = document.querySelector('.jsSiteHeader');
    this.intro = document.querySelector('.intro');
    this.events();
    this.getCoords();
  }

  debounce(func, wait = 10, immediate = true) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func /*  */ .apply(context, args);
    };
  }

  events() {
    const that = this;
    const introBottom = this.getCoords(that.intro).bottom;
    const headerBottom = this.getCoords(that.siteHeader).bottom;
    let lastScrollY = 0;
    let currentScrollY = 0;

    function handleHeaderReveal() {
      currentScrollY = pageYOffset;

      sleepHeader(); // Header is hidden
      awakeHeader(); // Header is hidden  & Sticky
      revealHeader(); // Header is Visible & Sticky

      function sleepHeader() {
        if (currentScrollY >= headerBottom) {
          that.siteHeader.classList.add('is-hidden');
        } else {
          that.siteHeader.classList.remove('is-hidden');
        }
      }

      function awakeHeader() {
        if (currentScrollY > headerBottom * 3) {
          that.siteHeader.classList.add('is-sticky');
        } else {
          that.siteHeader.classList.remove('is-sticky');
        }
      }

      function revealHeader() {
        if (currentScrollY >= introBottom) {
          that.siteHeader.classList.remove('is-hidden'); // reavel with animation

          // Now we are scrolling away from introBottom
          // Hide the Navbar when scroll to top
          if (currentScrollY < lastScrollY) {
            that.siteHeader.classList.add('is-hidden');
          }
        }
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleHeaderReveal); // debounce is ungly?
  }

  getCoords(elem) {
    const box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      bottom: box.bottom + pageYOffset,
      height: (box.bottom + pageYOffset) - (box.top + pageYOffset)
    }
  }

}

export default StickyHeader;