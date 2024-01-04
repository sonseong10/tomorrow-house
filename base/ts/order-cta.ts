const orderCta = document.querySelector('.order-cta');
const [orderCtaBookMarkButton, orderCtaBuyButton] = orderCta!.children;

const orderFormModal = document.querySelector('.order-form-modal');
const orderFormOverlay = document.querySelector('.overlay');

orderCtaBuyButton.addEventListener('click', () => {
  orderFormModal!.classList.add('is-open');
  orderFormOverlay!.classList.add('is-active');
});

orderFormOverlay!.addEventListener('click', () => {
  orderFormModal!.classList.remove('is-open');
  orderFormOverlay!.classList.remove('is-active');
});

orderCtaBookMarkButton.addEventListener('click', (e) => {
  const [icon, countNode] = (e.currentTarget as HTMLElement).children;
  const count = Number(
    (countNode as HTMLElement).innerText.replaceAll(',', '')
  );

  let newCount = count;
  if ((e.currentTarget as Element).classList.contains('is-active')) {
    icon.setAttribute('class', 'ic-bookmark');
    newCount -= 1;
  } else {
    icon.setAttribute('class', 'ic-bookmark-filled');
    newCount += 1;
  }

  (countNode as HTMLElement).innerText = newCount.toLocaleString();

  (countNode as HTMLElement).setAttribute(
    'aria-label',
    `북마크 ${newCount.toLocaleString()}회`
  );

  (e.currentTarget as Element).classList.toggle('is-active');
});
