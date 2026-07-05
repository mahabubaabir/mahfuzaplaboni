(function () {
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  document.addEventListener('keydown', function (e) {
    if (
      e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P' || e.key === 'j' || e.key === 'J') ||
      e.metaKey && (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')
    ) {
      e.preventDefault();
    }
  });

  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
  });

  document.addEventListener('copy', function (e) {
    e.preventDefault();
  });

  document.addEventListener('cut', function (e) {
    e.preventDefault();
  });
})();
