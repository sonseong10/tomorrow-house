const floatingOrderCta = document.querySelector('.floating-order-form');

if (floatingOrderCta) {
  const floatingBookmarkButton =
    floatingOrderCta.querySelector('.bookmark-button');

  if (floatingBookmarkButton) {
    floatingBookmarkButton.addEventListener('click', (e: Event) => {
      const target: Element = e.currentTarget as Element;
      const [icon] = target.children;

      if (icon) {
        if (target.classList.contains('is-active')) {
          icon.setAttribute('class', 'ic-bookmark');
        } else {
          icon.setAttribute('class', 'ic-bookmark-filled');
        }
      }

      target.classList.toggle('is-active');
    });
  }
}
