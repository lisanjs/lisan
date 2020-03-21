// Turn off ESLint for this file because it's sent down to users as-is.
/* eslint-disable */
window.addEventListener('load', function() {
  console.log('loaded');
  const isExternal = function(url) {
    const domain = function(url) {
      return url
        .replace('http://', '')
        .replace('https://', '')
        .split('/')[0];
    };

    return domain(location.href) !== domain(url);
  };

  document.querySelectorAll('.mainContainer a').forEach(element => {
    if (
      element.className.indexOf('edit-page-link') === -1 &&
      element.href &&
      isExternal(element.href)
    ) {
      element.innerHTML =
        element.innerHTML +
        '<img class="external-link" src="/img/external.svg" alt="External Link" />';

      element.setAttribute('rel', 'noopener nofollow');
      element.setAttribute('target', '_blank');
    }
  });
});
