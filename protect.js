(function () {
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  document.addEventListener('keydown', function (e) {
    if (
      e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P' || e.key === 'j' || e.key === 'J' || e.key === 'i' || e.key === 'I') ||
      e.metaKey && (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S') ||
      e.key === 'F12' ||
      e.key === 'PrintScreen'
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

  document.addEventListener('selectstart', function (e) {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  });

  var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) {
    images[i].addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });
    images[i].addEventListener('mousedown', function (e) {
      if (e.button === 2) {
        e.preventDefault();
      }
    });
  }

  window.addEventListener('keyup', function (e) {
    if (e.key === 'PrintScreen') {
      document.body.style.opacity = '0';
      setTimeout(function () { document.body.style.opacity = '1'; }, 100);
    }
  });
})();