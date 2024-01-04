const orderCta = document.querySelector('.order-cta')
const [orderCtaBookMarkButton, orderCtaBuyButton] = orderCta.children

const orderFormModal = document.querySelector('.order-form-modal')
const orderFormOverlay = document.querySelector('.overlay')

orderCtaBuyButton.addEventListener('click', () => {
  orderFormModal.classList.add('is-open')
  orderFormOverlay.classList.add('is-active')
})

orderFormOverlay.addEventListener('click', () => {
  orderFormModal.classList.remove('is-open')
  orderFormOverlay.classList.remove('is-active')
})

orderCtaBookMarkButton.addEventListener('click', (e) => {
  const [icon, countNode] = e.currentTarget.children
  const count = Number(countNode.innerText.replaceAll(',', ''))

  let newCount = count
  if (e.currentTarget.classList.contains('is-active')) {
    icon.setAttribute('class', 'ic-bookmark')
    newCount -= 1
  } else {
    icon.setAttribute('class', 'ic-bookmark-filled')
    newCount += 1
  }

  countNode.innerText = newCount.toLocaleString()
  countNode.setAttribute('aria-label', `북마크 ${newCount.toLocaleString()}회`)
  e.currentTarget.classList.toggle('is-active')
})
