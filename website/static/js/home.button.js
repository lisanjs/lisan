(() => {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const githubHomeButtons = document.querySelectorAll('.githubHomeButton');

  githubHomeButtons[getRandomInt(0, githubHomeButtons.length)].style.display =
    'block';
})();
