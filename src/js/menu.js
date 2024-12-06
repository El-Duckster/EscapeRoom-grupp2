import '../styles/layouts/header.scss';

const menuItems = [
  { name: 'Play online', href: '#onLine' },
  { name: 'Play on-site', href: '#onSite' },
  { name: 'The story', href: '#story' },
  { name: 'Contact us', href: '#contact' },
];

//referenses
const hamburger = document.querySelector('.nav__hamburger');
const menu = document.querySelector('.nav__menu');
const backgroundOverlay = document.querySelector('.nav__background');

//creation of components
const createNavMenuItem = () => {
  menuItems.forEach((item) => {
    const menuList = document.createElement('li');
    menuList.classList.add('nav__menuItem');

    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.name;
    link.classList.add('nav__menuLink');

    menuList.appendChild(link);
    menu.appendChild(menuList);
  });
};

const createCloseBtn = () => {
  const closeBtn = document.createElement('button');
  closeBtn.classList.add('nav__menu__closeBtn');

  const span1 = document.createElement('span');
  span1.classList.add('closeSpan1');

  const span2 = document.createElement('span');
  span2.classList.add('closeSpan2');

  closeBtn.appendChild(span1);
  closeBtn.appendChild(span2);
  menu.appendChild(closeBtn);
  return closeBtn;
};

const closeBtn = createCloseBtn();
createNavMenuItem();

// handels management

const handleToggleMenu = () => {
  setTimeout(() => {
    menu.classList.toggle('nav__menu--active');
  }, 200);
  backgroundOverlay.classList.toggle('nav__background--active');
};

const handleCloseMenu = () => {
  menu.classList.remove('nav__menu--active');
  backgroundOverlay.classList.remove('nav__background--active');
};

// eventListener
hamburger.addEventListener('click', handleToggleMenu);
menu.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav__menuLink')) {
    handleCloseMenu();
  }
});
closeBtn.addEventListener('click', handleCloseMenu);
window.addEventListener('scroll', handleCloseMenu);

// Redirection from index.html to challenges.html with prefiltered results for online/onsite challenges
document.addEventListener('DOMContentLoaded', () => {
  const onlineButton = document.querySelector('.main__btn.online');
  const onsiteButton = document.querySelector('.main__btn.onsite');

  onlineButton.addEventListener('click', () => {
    window.location.href = 'challenges.html?type=online';
  });

  onsiteButton.addEventListener('click', () => {
    window.location.href = 'challenges.html?type=onsite';
  });
  
});
