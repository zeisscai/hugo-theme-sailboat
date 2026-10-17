/* 软件中心：多平台下载菜单的触摸/键盘支持（悬停展开由 CSS 负责） */
(function () {
  'use strict';

  var groups = document.querySelectorAll('.app-dl');
  if (!groups.length) return;

  function close(el) {
    el.classList.remove('open');
    var b = el.querySelector('.app-dl-toggle');
    if (b) b.setAttribute('aria-expanded', 'false');
  }

  Array.prototype.forEach.call(groups, function (el) {
    var btn = el.querySelector('.app-dl-toggle');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var open = el.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  document.addEventListener('click', function (e) {
    Array.prototype.forEach.call(groups, function (el) {
      if (!el.contains(e.target)) close(el);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      Array.prototype.forEach.call(groups, close);
    }
  });
})();
