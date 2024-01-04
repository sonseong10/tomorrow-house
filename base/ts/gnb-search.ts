const gnbSearch = document.querySelector('.gnb-search');
const gnbSearchInput = gnbSearch!.querySelector('input');
const gnbSearchHistory = gnbSearch!.querySelector('.search-history');
const gnbSearchHistoryList = gnbSearch!.querySelector('.search-history ol');
const deleteAllbutton = gnbSearchHistory!.querySelector(
  '.search-history-header button'
);
const deletebutton = gnbSearchHistory!.querySelectorAll('.delete-button');

gnbSearchInput!.addEventListener('focus', () => {
  if (!gnbSearchHistory!.classList.contains('is-active')) {
    removeSearchHistoryGrobalEvent();
  }
  if (gnbSearchHistoryList!.hasChildNodes()) {
    gnbSearchHistory!.classList.add('is-active');
  }
});

const closeHistoryList = () => {
  gnbSearchHistory!.classList.remove('is-active');
  window.removeEventListener('click', removeSearchHistoryGrobalEvent);
};

const removeSearchHistoryGrobalEvent = () => {
  window.addEventListener('click', (e) => {
    if (!gnbSearch!.contains(e.target as Node)) {
      closeHistoryList();
    }
  });
};

deleteAllbutton!.addEventListener('click', () => {
  gnbSearchHistoryList!.innerHTML = '';
  closeHistoryList();
});

deletebutton.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    const itemToRemove = (e.currentTarget as Element).parentNode;
    gnbSearchHistoryList!.removeChild(itemToRemove!);

    if (gnbSearchHistoryList!.children.length === 0) {
      closeHistoryList();
    }
  });
});
