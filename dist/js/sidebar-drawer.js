const drawerMenuButton = document.querySelectorAll(
  '.sidebar-nav .drawer-menu-button'
)

const toggleDrawerMenu = (button) => {
  const parent = button.parentNode
  button.addEventListener('click', () => {
    parent.classList.toggle('is-open')
  })
}

drawerMenuButton.forEach(toggleDrawerMenu)
