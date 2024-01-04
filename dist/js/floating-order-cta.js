const floatingOrderCta = document.querySelector('.floating-order-form')

const floatingBookmarkButton =
  floatingOrderCta.querySelector('.bookmark-button')

floatingBookmarkButton.addEventListener('click', (e) => {
  const [icon] = e.currentTarget.children
  if (e.currentTarget.classList.contains('is-active')) {
    icon.setAttribute('class', 'ic-bookmark')
  } else {
    icon.setAttribute('class', 'ic-bookmark-filled')
  }

  e.currentTarget.classList.toggle('is-active')
})
