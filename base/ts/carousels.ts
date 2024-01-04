import { type TinySliderSettings, tns } from 'tiny-slider';

const commonOptions: TinySliderSettings = {
  navAsThumbnails: true,
  arrowKeys: true,
  mouseDrag: true,
  preventScrollOnTouch: 'force',
};

const productCarousel = tns({
  ...commonOptions,
  container: '.product-carousel .slider-list',
  controls: false,
  navContainer: '.product-carousel .thumbnail-list',
  autoplay: true,
  autoplayHoverPause: true,
  autoplayButtonOutput: false,
} as TinySliderSettings);

const userGalleryMobile = tns({
  ...commonOptions,
  container: '.user-gallery.is-mobile .slider-list',
  gutter: 4,
  edgePadding: 16,
  controls: false,
  navContainer: '.user-gallery.is-mobile .thumbnail-list',
  loop: false,
} as TinySliderSettings);

const userGalleryDesktop = tns({
  ...commonOptions,
  container: '.user-gallery.is-desktop .slider-list',
  gutter: 6,
  edgePadding: 75,
  controls: true,
  controlsContainer: '.user-gallery.is-desktop .user-gallery-controls',
  navContainer: '.user-gallery.is-desktop .thumbnail-list',
  loop: false,
} as TinySliderSettings);

console.log(userGalleryMobile);

userGalleryDesktop;
export { productCarousel, userGalleryMobile, userGalleryDesktop };
