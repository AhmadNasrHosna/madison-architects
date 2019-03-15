class Tabs {
  constructor() {
    this.tabsWrapper = document.querySelector('.tabs__wrapper');
    this.tabsTrack   = document.querySelector('.tabs__track');
    this.tabs        = Array.from(this.tabsTrack.children);
    this.tab         = this.tabsTrack.querySelector('.tab');
    this.tabsNavigationsButtons = document.querySelectorAll('.tabs__navigation ul li');
    this.UI();
    this.events();
  }

  UI() {
    /* ## Set tabsWrapper Height ## */

    const tabHeight = // Get tab height
    (this.tab.getBoundingClientRect().bottom + pageYOffset) -
    (this.tab.getBoundingClientRect().top + pageYOffset);

    this.tabsWrapper.style.height =  tabHeight + 'px'; // Set tab height

    // We've JS? then remove tabsTrack fallback.
    if (this.tabsTrack.classList.contains('noJsFallback')) {
      this.tabsTrack.classList.remove('noJsFallback');
    }
  }

  events() {
    const that = this;

    function handleTabsButtons() {
      const targetButton = this;
      const index = getButtonIndex(targetButton);
      const targetTab = that.tabs[index]

      moveToTab(targetTab);
      revealTargetTab(targetTab);

      targetButton.classList.add('current-tab');
    }

    function revealTargetTab(targetTab) {
      that.tabs.forEach(tab => tab.classList.remove('current-tab'))
      targetTab.classList.add('current-tab')
    }

    function moveToTab(targetTab) {
      const amountToMove = targetTab.getBoundingClientRect().top - that.tabsTrack.getBoundingClientRect().top;
      that.tabsTrack.style.transform = `translateY(-${amountToMove}px)`;
    }

    function getButtonIndex(targetButton) {
      let i;

      that.tabsNavigationsButtons.forEach((btn, index) => {
        btn.classList.remove('current-tab');
        if (btn == targetButton) i = index;
      })

      return i;
    }

    that.tabsNavigationsButtons.forEach(btn => btn.addEventListener('click', handleTabsButtons));

  }
}

export default Tabs;