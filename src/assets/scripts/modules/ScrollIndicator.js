class ScrollIndicator {
  constructor() {
    this.scrollIndicator = document.querySelector('.jsScrollIndicatorBar');
    this.events();
  }

  events() {
    const that = this;

     function funx() {
      const currentScrollY = pageYOffset;
      const pageClientHeight = document.documentElement.clientHeight;
    
      const pageScrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
        ) - pageClientHeight;
    
      const pageScrollHeightInPercentage = Math.round(
        (currentScrollY / pageScrollHeight) * 100
      );
    
      that.scrollIndicator.style.width = pageScrollHeightInPercentage + '%'
    }
    
    window.addEventListener('scroll', funx)
  }
}

export default ScrollIndicator;


