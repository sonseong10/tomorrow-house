const productTab = document.querySelector('.product-tab');
const productTabButtonList = productTab!.querySelectorAll('button');

const TOP_HEADER_DESKTOP = 80 + 50 + 54; // header + gnb + lnb
const TOP_HEADER_MOBILE = 50 + 40 + 40; // header + gnb + lnb

let currentTab = productTab!.querySelector('.is-active')!;
let disableUpdating = false;

const activeTabEvent = (e: any) => {
  const target = e.currentTarget;
  if (target.parentNode !== currentTab) {
    disableUpdating = true;
    currentTab!.classList.remove('is-active');
    target.parentNode.classList.add('is-active');
    currentTab = target.parentNode;

    setTimeout(() => {
      disableUpdating = false;
    }, 1000);
  }
};

const scrollTabTarget = (e: any) => {
  const targetTabId =
    e.currentTarget.parentNode.getAttribute('aria-labelledby');
  const tabPanel = document.querySelector(`#${targetTabId}`);
  scrollBy({
    behavior: 'smooth',
    top:
      tabPanel!.getBoundingClientRect().top -
      (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HEADER_MOBILE),
  });
};

productTabButtonList.forEach((item) => {
  item.addEventListener('click', activeTabEvent);
  item.addEventListener('click', scrollTabTarget);
});

// NOTE: TabPanel Y Position
// Y축 위치 = window.scrollY + element.getBoundingClientRect().top
const productTabPanelIdList = [
  'product-spec',
  'product-review',
  'product-inquiry',
  'product-shipment',
  'product-recommendation',
];

const productTabPanelList = productTabPanelIdList.map((i) =>
  document.querySelector(`#${i}`)
);

const productTabPanelPosition: { [key: string]: any } = {};

function detectTabPanelPosition() {
  // panel의 y축 포지션값을 가지고 있는 객체 생성
  productTabPanelList.forEach(
    (panel) =>
      (productTabPanelPosition[panel!.id] =
        window.scrollY + panel!.getBoundingClientRect().top)
  );

  updateTabActiveScroll();
}

const updateTabActiveScroll = () => {
  if (disableUpdating) {
    return;
  }

  const userScrolled =
    window.scrollY +
    (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HEADER_MOBILE);
  let newActiveTab;
  if (userScrolled >= productTabPanelPosition['product-recommendation']) {
    newActiveTab = productTabButtonList[4];
  } else if (userScrolled >= productTabPanelPosition['product-shipment']) {
    newActiveTab = productTabButtonList[3];
  } else if (userScrolled >= productTabPanelPosition['product-inquiry']) {
    newActiveTab = productTabButtonList[2];
  } else if (userScrolled >= productTabPanelPosition['product-review']) {
    newActiveTab = productTabButtonList[1];
  } else {
    newActiveTab = productTabButtonList[0];
  }

  // NOTE: 추천영역 스크롤작업 window.scrollY + window.innerHeight === body
  const bodyHeight =
    document.body.offsetHeight + (window.innerWidth < 1200 ? 56 : 0);

  if (
    Math.floor(window.scrollY + window.innerHeight) === Math.floor(bodyHeight)
  ) {
    newActiveTab = productTabButtonList[4];
  }

  if (newActiveTab) {
    newActiveTab = newActiveTab.parentNode;

    if (newActiveTab !== currentTab) {
      (newActiveTab as Element)!.classList.add('is-active');
      if (currentTab !== null) {
        currentTab.classList.remove('is-active');
      }
      (currentTab as ParentNode) = newActiveTab!;
    }
  }
};

function throttle(
  func: { (): void; (): void; apply?: any },
  delay: number | undefined
) {
  let timeoutId: any;
  let lastArgs: IArguments;
  let lastThis: any;
  let calledOnce = false;

  return () => {
    const context = lastThis;
    const args = arguments;

    if (!timeoutId) {
      func.apply(context, args);
      calledOnce = true;
      timeoutId = setTimeout(function () {
        timeoutId = null;
        if (calledOnce) {
          func.apply(context, lastArgs);
          calledOnce = false;
        }
      }, delay);
    } else {
      lastArgs = args;
      lastThis = context;
    }
  };
}

window.addEventListener('load', detectTabPanelPosition);
window.addEventListener('resize', throttle(detectTabPanelPosition, 1000));
window.addEventListener('scroll', throttle(updateTabActiveScroll, 200));
