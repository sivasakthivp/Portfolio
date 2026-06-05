/* ================================================================
   Sivasakthi - AI Engineer Portfolio | script.js
   ================================================================ */

// Navbar scroll
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger
var hamburger = document.getElementById('hamburger');
var navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', function() {
  navLinks.classList.toggle('open');
  var spans = hamburger.querySelectorAll('span');
  var isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,4.5px)' : '';
  spans[1].style.opacity   = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-4.5px)' : '';
});
navLinks.querySelectorAll('a').forEach(function(a) {
  a.addEventListener('click', function() {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(function(s) {
      s.style.transform = ''; s.style.opacity = '1';
    });
  });
});

// Neural canvas animation
(function() {
  var canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  var NODE_COUNT = 60;
  var MAX_DIST   = 150;
  var nodes = [];

  for (var i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      vx:   (Math.random() - 0.5) * 0.4,
      vy:   (Math.random() - 0.5) * 0.4,
      r:    Math.random() * 2.5 + 0.8,
      phase: Math.random() * Math.PI * 2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var t = performance.now() * 0.001;

    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var dx   = nodes[i].x - nodes[j].x;
        var dy   = nodes[i].y - nodes[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          var alpha = (1 - dist / MAX_DIST) * 0.22;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = 'rgba(255,255,255,' + alpha + ')';
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    for (var k = 0; k < nodes.length; k++) {
      var n = nodes[k];
      var pulse = 0.4 + Math.sin(t + n.phase) * 0.2;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + pulse + ')';
      ctx.fill();

      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width)  n.vx = -n.vx;
      if (n.y < 0 || n.y > canvas.height) n.vy = -n.vy;
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

// Typed text
var roles = [
  'AI Systems',
  'Deep Learning Models',
  'Apache Spark Pipelines',
  'Machine Learning Models',
  'NLP Pipelines',
  'Voice AI',
  'Intelligent Applications'
];
var ri = 0, ci = 0, del = false;
var tel = document.getElementById('typed-text');

function type() {
  var cur = roles[ri];
  if (!del) {
    tel.textContent = cur.slice(0, ci + 1);
    ci++;
    if (ci === cur.length) { del = true; setTimeout(type, 1800); return; }
  } else {
    tel.textContent = cur.slice(0, ci - 1);
    ci--;
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, del ? 52 : 82);
}
setTimeout(type, 1200);

// Scroll reveal
var ro = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (!entry.isIntersecting) return;
    var siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
    var delay = siblings.indexOf(entry.target) * 80;
    setTimeout(function() { entry.target.classList.add('visible'); }, delay);
    ro.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(function(el) { ro.observe(el); });

// Active nav
var secs = document.querySelectorAll('section[id]');
var navAs = document.querySelectorAll('.nav-links a');
var so = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      navAs.forEach(function(a) { a.classList.remove('active'); });
      var lnk = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
      if (lnk) lnk.classList.add('active');
    }
  });
}, { threshold: 0.4 });
secs.forEach(function(s) { so.observe(s); });

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  var btn    = document.getElementById('btn-text');
  var status = document.getElementById('form-status');
  var form   = e.target;
  btn.textContent = 'Sending...';
  status.className = 'form-status';
  status.textContent = '';
  setTimeout(function() {
    btn.textContent = 'Send Message';
    status.textContent = "Thanks! Message received. I'll get back to you soon.";
    status.className = 'form-status success';
    form.reset();
  }, 1400);
}