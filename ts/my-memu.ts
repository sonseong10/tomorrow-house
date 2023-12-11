const myMenu = document.querySelector('.my-menu');
const myMenuButton = document.querySelector('.my-menu-button');

const toggleMyMenuOnceClick = () => {
  if (!myMenu!.classList.contains('is-active')) {
    window.addEventListener('click', (e) => {
      if (!myMenu!.contains(e.target as Element)) {
        myMenu!.classList.remove('is-active');
        window.removeEventListener('click', toggleMyMenuOnceClick);
      }
    });
  }
};

const toggleMyMenu = () => {
  toggleMyMenuOnceClick();
  myMenu!.classList.toggle('is-active');
};

myMenuButton!.addEventListener('click', toggleMyMenu);
