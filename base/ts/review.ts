const reviewLike = document.querySelectorAll('.review-card-footer button');

const HELPFUL = '도움됨';
const HELPNOT = '도움이 돼요';

const toggleLikeEvent = (e: any) => {
  const target = e.currentTarget;
  const isLike = target.classList.contains('btn-primary');
  const textElement = target.nextElementSibling;
  const reviewCardFooter = target.parentNode;

  if (isLike) {
    // unActive
    target.innerHTML = HELPNOT;
  } else {
    // active
    const checkIcon = document.createElement('i');
    checkIcon.setAttribute('class', 'ic-check');
    checkIcon.setAttribute('aria-hidden', 'true');

    target.innerHTML = HELPFUL;
    target.prepend(checkIcon);
  }

  if (textElement) {
    // like count n
    const likeCount = textElement.querySelector('span');
    const count = Number(likeCount.innerHTML.replaceAll(',', ''));
    let newCount = count;
    if (isLike) {
      newCount -= 1;
    } else {
      newCount += 1;
    }

    if (newCount > 0) {
      likeCount.innerHTML = newCount.toLocaleString();
    } else {
      reviewCardFooter.removeChild(textElement);
    }
  } else {
    if (!isLike) {
      // like count 0

      const newTextElement = document.createElement('p');
      newTextElement.innerHTML = `<strong><span>1</span>명</strong>에게 도움이 되었습니다.`;
      reviewCardFooter.appendChild(newTextElement);
    }
  }

  target.classList.toggle('btn-primary');
  target.classList.toggle('btn-outlined');
};

reviewLike.forEach((itme) => itme.addEventListener('click', toggleLikeEvent));
