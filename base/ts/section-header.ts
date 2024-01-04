const sectionHeaderIconButton = document.querySelector(
  '.product-shipment .product-section-header.sm-only button.icon-button'
);

const showShipmentSection = (e: any) => {
  const sectionHeader = e.currentTarget.parentNode;
  const section = sectionHeader.parentNode;
  section.classList.add('is-open');
};

sectionHeaderIconButton!.addEventListener('click', showShipmentSection);
