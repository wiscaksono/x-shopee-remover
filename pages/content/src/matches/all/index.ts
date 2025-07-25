const KEYWORDS = [
  /shopee/i,
  /shope/i,
  /shoppe/i,
  /shopi/i,
  /shoppee/i,
  /sh0pee/i,
  /sh0pe/i,
  /shopeee/i,
  /shopeey/i,
  /shopeeyy/i,
  /shopee\.co/i,
  /shopee\.com/i,
  /shopee id/i,
  /shopeeid/i,
  /shopee_id/i,
  /shopee-id/i,
  /shopee\s?official/i,
  /shopee\s?mall/i,
];

const containsKeyword = (text: string) => KEYWORDS.some(pattern => pattern.test(text));

let removedCount = 0;

const hidePost = (post: HTMLElement) => {
  post.style.setProperty('display', 'none', 'important');
  removedCount++;
  console.log(`Removed posts: ${removedCount}`);
};

const removePostsWithKeywords = () => {
  const processPost = (post: HTMLElement) => {
    if (post.style.display === 'none') return;
    if (containsKeyword(post.textContent || '')) hidePost(post);
  };

  const removeMatching = () => {
    const posts = document.querySelectorAll<HTMLElement>('[data-testid="cellInnerDiv"]');
    posts.forEach(processPost);
  };

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(node => {
        if (node instanceof HTMLElement) {
          if (node.matches('[data-testid="cellInnerDiv"]')) {
            processPost(node);
          }
          node.querySelectorAll?.('[data-testid="cellInnerDiv"]').forEach((el: Element) => {
            processPost(el as HTMLElement);
          });
        }
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  removeMatching();
};

removePostsWithKeywords();
