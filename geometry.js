(function () {
  var canvas = document.getElementById('geometry-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var w, h;
  var shapes = [];
  var mouse = { x: -1000, y: -1000 };
  var dpr = window.devicePixelRatio || 1;

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    generateShapes();
  }

  function generateShapes() {
    shapes = [];
    var count = Math.floor((w * h) / 18000);
    count = Math.min(count, 60);
    for (var i = 0; i < count; i++) {
      shapes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 6 + Math.random() * 18,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.004,
        type: Math.floor(Math.random() * 3),
        opacity: 0.03 + Math.random() * 0.05,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        hue: Math.random() * 360
      });
    }
  }

  function drawShape(s) {
    ctx.save();
    ctx.translate(s.x, s.y);
    ctx.rotate(s.rotation);
    ctx.globalAlpha = s.opacity;
    ctx.strokeStyle = 'hsl(' + s.hue + ', 15%, 55%)';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'hsl(' + s.hue + ', 12%, 80%)';

    if (s.type === 0) {
      ctx.beginPath();
      ctx.rect(-s.size / 2, -s.size / 2, s.size, s.size);
      ctx.fill();
      ctx.stroke();
    } else if (s.type === 1) {
      ctx.beginPath();
      ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.beginPath();
      for (var j = 0; j < 3; j++) {
        var angle = (j * 2 * Math.PI) / 3 - Math.PI / 2;
        var px = Math.cos(angle) * (s.size / 2);
        var py = Math.sin(angle) * (s.size / 2);
        if (j === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function update() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < shapes.length; i++) {
      var s = shapes[i];
      s.x += s.vx;
      s.y += s.vy;
      s.rotation += s.rotSpeed;

      var dx = mouse.x - s.x;
      var dy = mouse.y - s.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        var force = (150 - dist) / 150 * 0.3;
        s.x -= dx * force * 0.02;
        s.y -= dy * force * 0.02;
      }

      if (s.x < -30) s.x = w + 30;
      if (s.x > w + 30) s.x = -30;
      if (s.y < -30) s.y = h + 30;
      if (s.y > h + 30) s.y = -30;

      drawShape(s);
    }
    requestAnimationFrame(update);
  }

  document.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('resize', resize);
  resize();
  update();
})();
