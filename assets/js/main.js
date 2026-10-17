/* Sailboat 主题脚本：主题切换 + 移动端菜单 + 站内搜索 */
(function () {
  'use strict';

  /* ---------- 主题切换 ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    if (toggle) toggle.setAttribute('aria-label', theme === 'dark' ? '切换到明亮主题' : '切换到深色主题');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- 移动端菜单 ---------- */
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // 点击导航链接后关闭菜单
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.matchMedia('(max-width: 720px)').matches) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 站内搜索 ---------- */
  // 使用 Hugo 生成的 JSON 索引，客户端 Fuse-like 简单匹配，避免依赖外部库
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var searchForm = document.getElementById('search-form');
  var indexURL = (window.__AURORA_INDEX_URL__ || '/search.json');
  var indexData = null;
  var indexLoading = false;

  function loadIndex(cb) {
    if (indexData) { cb(null, indexData); return; }
    if (indexLoading) { return; }
    indexLoading = true;
    fetch(indexURL, { credentials: 'same-origin' })
      .then(function (r) { if (!r.ok) throw new Error('索引加载失败'); return r.json(); })
      .then(function (data) { indexData = data; indexLoading = false; cb(null, data); })
      .catch(function (err) { indexLoading = false; cb(err); });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderResults(query) {
    if (!searchResults) return;
    if (!query || !indexData || !indexData.length) {
      searchResults.hidden = true;
      searchResults.innerHTML = '';
      return;
    }
    var q = query.toLowerCase().trim();
    var tokens = q.split(/\s+/);
    var matches = indexData.filter(function (item) {
      var title = (item.title || '').toLowerCase();
      var summary = (item.summary || '').toLowerCase();
      return tokens.every(function (t) { return title.indexOf(t) !== -1 || summary.indexOf(t) !== -1; });
    }).slice(0, 8);

    if (matches.length === 0) {
      searchResults.hidden = false;
      searchResults.innerHTML = '<li><a href="javascript:void(0)" style="cursor:default">无匹配结果</a></li>';
      return;
    }
    searchResults.hidden = false;
    searchResults.innerHTML = matches.map(function (m) {
      return '<li><a href="' + escapeHtml(m.permalink || m.url || '') + '">' + escapeHtml(m.title || '(无标题)') + '</a></li>';
    }).join('');
  }

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', function () {
      var v = searchInput.value;
      if (!v.trim()) {
        searchResults.hidden = true; searchResults.innerHTML = '';
        return;
      }
      loadIndex(function (err) { if (err) return; renderResults(v); });
    });
    searchInput.addEventListener('focus', function () {
      if (searchInput.value.trim()) {
        loadIndex(function () { renderResults(searchInput.value); });
      }
    });
    document.addEventListener('click', function (e) {
      if (!searchForm || searchForm.contains(e.target)) return;
      searchResults.hidden = true;
    });
    if (searchForm) {
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (searchResults && !searchResults.hidden) {
          var first = searchResults.querySelector('a[href]:not([href^="javascript"])');
          if (first) window.location.href = first.getAttribute('href');
        }
      });
    }
  }

  /* 导航栏滚动时阴影变化 */
  var navbar = document.getElementById('navbar');
  if (navbar) {
    var onScroll = function () {
      if (window.scrollY > 8) navbar.style.boxShadow = 'var(--shadow-sm)';
      else navbar.style.boxShadow = 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
