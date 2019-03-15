import { thisTypeAnnotation } from "babel-types";

class MobileMenu {
  constructor() {
    this.drawer = document.querySelector('.jsHeaderDrawer');
    this.drawerTrigger = document.querySelector('.jsHeaderDrawerTrigger');
    
    this.events();
  }

  events() {

    function toggleMobileMenu() {
      document.body.classList.toggle('is-visible');
      document.body.classList.toggle('close-x');
    }

    this.drawerTrigger.addEventListener('click', toggleMobileMenu);
  }
}

export default MobileMenu;
