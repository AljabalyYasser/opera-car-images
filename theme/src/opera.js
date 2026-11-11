/* Opera Car storefront layer for Salla Bart theme */
(function () {
  if (window.__OC_LOADED) return;
  window.__OC_LOADED = true;

  var IMG = '__IMG__';
  var API = 'https://api.salla.dev/store/v1/';
  var SID = '1590934287';
  var FREE_SHIP = 600;
  var C = __CATS__;

  var FEATURED = [593183742, 409846871, 1329966651, 120273226, 460404849, 1111030895, 280449386, 1735559028];
  var DEALS_FALLBACK = [672729945, 1100551877, 1495234900, 362051691, 1313445899, 432426207];

  var root = document.documentElement;
  if (!document.getElementById('oc-fonts')) {
    var lf = document.createElement('link'); lf.id = 'oc-fonts'; lf.rel = 'stylesheet';
    lf.href = 'https://fonts.googleapis.com/css2?family=Alexandria:wght@500;600;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap';
    document.head.appendChild(lf);
  }

  /* ---------- color mode ---------- */
  function getSaved() { try { return localStorage.getItem('oc-mode'); } catch (e) { return null; } }
  function setMode(m, save) {
    root.classList.toggle('oc-dark', m === 'dark');
    root.classList.toggle('oc-light', m === 'light');
    if (save) { try { localStorage.setItem('oc-mode', m); } catch (e) {} }
  }
  var sysDark = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
  setMode(getSaved() || (sysDark ? 'dark' : 'light'), false);
  function toggleMode() { setMode(root.classList.contains('oc-dark') ? 'light' : 'dark', true); }

  /* ---------- helpers ---------- */
  function api(path) {
    return fetch(API + path, { headers: { 'Store-Identifier': SID, 'Accept-Language': 'ar' } })
      .then(function (r) { return r.json(); });
  }
  function h(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function num(n) { return Number(n).toLocaleString('ar-SA', { maximumFractionDigits: 2 }); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var SAR = '<i class="sicon-sar"></i>';

  var I = {
    truck: '<path d="M3 6h11v9H3z"/><path d="M14 9h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    gift: '<rect x="3" y="8" width="18" height="13" rx="1.5"/><path d="M12 8v13M3 12.5h18"/><path d="M12 8c-1.5-3.5-5.5-4-5.5-1.5S10 8 12 8zM12 8c1.5-3.5 5.5-4 5.5-1.5S14 8 12 8z"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20M6 15h4"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',
    ret: '<path d="M3 12a9 9 0 0 1 15.4-6.4L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.4 6.4L3 16"/><path d="M3 21v-5h5"/>',
    sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    car: '<path d="M5 17h14M6.5 17v2M17.5 17v2"/><path d="M3 13.5 5 8.5A2 2 0 0 1 6.9 7h10.2a2 2 0 0 1 1.9 1.5l2 5V17H3z"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/>',
    home: '<path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10"/>',
    grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    fire: '<path d="M12 22c4 0 7-2.7 7-6.8 0-3.7-2.6-6.1-4.4-8.2-.5 2-1.6 3.2-2.8 3.6.4-3.3-1-6.5-3.8-8.6.2 3.4-1.4 5.6-3 7.6C3.9 11.3 5 13.6 5 15.2 5 19.3 8 22 12 22z"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'
  };
  function ic(n, cls) { return '<svg class="oc-ic ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + I[n] + '</svg>'; }
  var STAR = '<svg viewBox="0 0 24 24" class="oc-star" aria-hidden="true"><path fill="currentColor" d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>';

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  /* ---------- header ---------- */
  var TOPBAR = ['شحن مجاني للطلبات فوق ٦٠٠&nbsp;ريال', 'توصيل سريع داخل جدة', 'قسط مشترياتك مع تابي وتمارا', 'شحن سريع لكل مناطق المملكة'];

  function modeBtn(extra) {
    var b = h('<button type="button" class="oc-mode ' + (extra || '') + '" aria-label="تبديل الوضع الداكن والفاتح">' + ic('moon', 'oc-mode__moon') + ic('sun', 'oc-mode__sun') + '</button>');
    b.addEventListener('click', toggleMode);
    return b;
  }

  function addNavExtras() {
    var header = $('#part-store-header'); if (!header || $('.oc-nav-extra', header)) return;
    var rootLi = $('custom-main-menu li.root-level', header);
    if (rootLi && rootLi.parentNode) {
      var ul = rootLi.parentNode;
      var home = h('<li class="oc-nav-extra root-level"><a href="/">الرئيسية</a></li>');
      ul.insertBefore(home, ul.firstChild);
      ul.appendChild(h('<li class="oc-nav-extra root-level"><a href="' + ABOUT_URL + '">من نحن</a></li>'));
      ul.appendChild(h('<li class="oc-nav-extra root-level"><a href="' + CONTACT_URL + '">تواصل معنا</a></li>'));
      ul.appendChild(h('<li class="oc-nav-extra oc-nav-sep" aria-hidden="true"></li>'));
      ul.appendChild(h('<li class="oc-nav-extra oc-nav-ic oc-nav-ic--a root-level"><a href="/#oc-best">' + ic('rocket') + 'الأكثر طلبا</a></li>'));
      ul.appendChild(h('<li class="oc-nav-extra oc-nav-ic oc-nav-ic--b root-level"><a href="/#oc-new">' + ic('tag') + 'وصل حديثا</a></li>'));
      ul.appendChild(h('<li class="oc-nav-extra oc-nav-ic oc-nav-ic--c root-level"><a href="/#oc-deals">' + ic('pct') + 'العروض</a></li>'));
    }

  }

  /* mega menu like the reference: red column titles, link lists and image cards */
  function findNode(id, list) {
    list = list || TREE;
    for (var i = 0; i < list.length; i++) {
      if (catId(list[i].u) === String(id)) return list[i];
      var f = findNode(id, list[i].s || []); if (f) return f;
    }
    return null;
  }
  function megaCol(title, url, links) {
    return '<div class="oc-mega__col"><a class="oc-mega__title" href="' + url + '">' + esc(title) + '</a><ul>' +
      links.map(function (l) { return '<li><a href="' + l[1] + '">' + esc(l[0]) + '</a></li>'; }).join('') + '</ul></div>';
  }
  function megaCard(title, url, img, cover) {
    return '<a class="oc-mega__card' + (cover ? ' is-cover' : '') + '" href="' + url + '"><span class="oc-mega__pic"><img loading="lazy" src="' + img + '" alt=""></span><b>' + esc(title) + '</b></a>';
  }
  function partsMega(node) {
    var kids = (node.s || []).map(function (k) { return [k.n, k.u]; });
    var kinds = KINDS.slice(0, kids.length).map(function (k) { return [k[0], '/search?q=' + encodeURIComponent(k[1])]; });
    var sh = findNode(1063290346), cm = findNode(579227632);
    return megaCol('حسب السيارة', node.u, kids) + megaCol('حسب القطعة', node.u, kinds) +
      (sh ? megaCard('قطع شاص وربع', sh.u, IMG + 'car_shas.webp') : '') +
      (cm ? megaCard('قطع كامري', cm.u, IMG + 'car_camry.webp') : '');
  }
  function stripesMega(node) {
    var withYears = [], others = [];
    (node.s || []).forEach(function (k) {
      if (k.s && k.s.length) withYears.push(megaCol(k.n, k.u, k.s.map(function (y) { return [y.n.replace(/^\S+\s+/, ''), y.u]; })));
      else others.push([k.n, k.u]);
    });
    others.push(['كل الخطوط', node.u]);
    var lc = findNode(358432919);
    return withYears.join('') + megaCol('المزيد', node.u, others) +
      megaCard('خطوط لاندكروزر', lc ? lc.u : node.u, IMG + 'car_lc.webp');
  }
  function addMegaMenu() {
    var header = $('#part-store-header'); if (!header || !TREE || !TREE.length) return;
    var builders = { '1104165103': partsMega, '997204374': stripesMega };
    $$('custom-main-menu li.root-level.has-children', header).forEach(function (li) {
      var b = builders[li.id], node = b && findNode(li.id);
      if (!node || $('.oc-mega', li)) return;
      var panel = h('<div class="oc-mega" role="region" aria-label="' + esc(node.n) + '"><div class="oc-mega__in">' + b(node) + '</div></div>');
      li.appendChild(panel); li.classList.add('oc-has-mega');
      var place = function () {
        var box = panel.offsetParent; if (!box) return;
        var br = box.getBoundingClientRect(), lr = li.getBoundingClientRect(), w = panel.offsetWidth;
        var right = Math.max(0, br.right - lr.right - 12);
        if (right + w > br.width) right = Math.max(0, br.width - w);
        panel.style.right = right + 'px';
      };
      li.addEventListener('mouseenter', place);
      li.addEventListener('focusin', place);
    });
  }

  function buildHeader() {
    var header = $('#part-store-header');
    if (!header || header.dataset.oc) return;
    header.dataset.oc = '1';
    var inner = $('.inner', header) || header;

    var bar = h('<div class="oc-topbar"><div class="oc-container oc-topbar__in">' +
      '<a class="oc-topbar__phone" href="tel:' + CONTACT.phone + '"><span>' + ic('phone') + '</span><b dir="ltr">' + CONTACT.phone + '</b></a>' +
      '<div class="oc-topbar__sale"><span>عروض الأسبوع على القطع والخطوط</span>' + timerHtml('oc-topbar__ctd') + '<a href="/offers">تسوق الآن' + ic('left') + '</a></div>' +
      '<div class="oc-topbar__side"><a href="' + C['الخطوط'] + '">الخطوط</a><a href="' + C['قطع الغيار والاكسسوارات'] + '">قطع الغيار</a><a href="' + FAQ_URL + '">الأسئلة الشائعة</a></div>' +
      '</div></div>');
    inner.insertBefore(bar, inner.firstChild);
    tickAll();

    // pick your car block like the reference find a store block
    var userBtn0 = $$('button.header-btn', header)[0];
    if (userBtn0 && userBtn0.parentNode && !$('.oc-findcar', header)) userBtn0.parentNode.insertBefore(h('<a class="oc-findcar" href="/#oc-finder">' + ic('car') + '<span><b>اختر سيارتك</b><small>قطع وخطوط تناسبها</small></span></a>'), userBtn0.parentNode.firstChild);
    // category picker inside the search box
    var sw = $('.part-header-search', header) || $('salla-search', header);
    if (sw && !$('.oc-scat', header)) {
      var sc = h('<label class="oc-scat">' + ic('grid') + '<select aria-label="الأقسام"><option value="">كل الأقسام</option>' + TREE.map(function (n) { return '<option value="' + n.u + '">' + n.n + '</option>' + (n.s || []).map(function (k) { return '<option value="' + k.u + '">&nbsp;&nbsp;' + k.n + '</option>'; }).join(''); }).join('') + '</select></label>');
      $('select', sc).addEventListener('change', function () { if (this.value) location.href = this.value; });
      sw.classList.add('oc-has-scat'); sw.insertBefore(sc, sw.firstChild);
    }
    // mode toggle (desktop)
    var userBtn = $$('button.header-btn', header)[0];
    if (userBtn && userBtn.parentNode) userBtn.parentNode.insertBefore(modeBtn('oc-mode--desk'), userBtn);
    // mode toggle (mobile)
    var menuLink = $('a[href="#mobile-menu"]', header);
    if (menuLink && menuLink.parentNode) menuLink.parentNode.insertBefore(modeBtn('oc-mode--mob'), menuLink);

    addNavExtras();
    addMegaMenu();

    // sticky shadow
    var onScroll = function () { header.classList.toggle('oc-scrolled', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  /* ---------- mobile bottom bar ---------- */
  function buildBottomBar() {
    if ($('.oc-bottombar')) return;
    var bar = h('<nav class="oc-bottombar" aria-label="تنقل سريع">' +
      '<a href="/" data-k="home">' + ic('home') + '<span>الرئيسية</span></a>' +
      '<a href="#mobile-menu" data-k="menu">' + ic('grid') + '<span>الأقسام</span></a>' +
      '<a href="#" data-k="search">' + ic('search') + '<span>بحث</span></a>' +
      '<a href="/cart" data-k="cart">' + ic('bag') + '<span>السلة</span><b class="oc-bb-count" hidden></b></a>' +
      '<a href="#" data-k="user">' + ic('user') + '<span>حسابي</span></a>' +
      '</nav>');
    document.body.appendChild(bar);
    document.body.classList.add('oc-has-bb');
    bar.addEventListener('click', function (e) {
      var a = e.target.closest('a'); if (!a) return;
      var k = a.dataset.k, header = $('#part-store-header');
      if (k === 'menu') { var m = header && $('a[href="#mobile-menu"]', header); if (m) { e.preventDefault(); m.click(); } }
      if (k === 'search') { e.preventDefault(); var s = header && ($('#part-mobile-search .s-search-input') || $('.sicon-search', header)); if (s) (s.closest('button') || s).click(); }
      if (k === 'user') { e.preventDefault(); var u = header && $$('button.header-btn', header).pop(); if (u) u.click(); }
    });
    function syncCount() {
      var c = $('.s-cart-summary-count'), b = $('.oc-bb-count', bar);
      if (!c || !b) return;
      var t = c.textContent.trim();
      var zero = !t || t === '0' || t === '٠';
      b.textContent = t; b.hidden = zero;
      $$('#part-store-header .s-cart-summary-count').forEach(function (x) { x.classList.toggle('oc-zero', zero); });
    }
    syncCount();
    var cc = $('.s-cart-summary-count');
    if (cc) new MutationObserver(syncCount).observe(cc, { childList: true, characterData: true, subtree: true });
  }

  /* ---------- extra icons ---------- */
  I.heart = '<path d="M12 20s-7.5-4.4-9-9.3C2 7.4 4.3 4.5 7.4 4.5c2 0 3.6 1.1 4.6 2.7 1-1.6 2.6-2.7 4.6-2.7 3.1 0 5.4 2.9 4.4 6.2C19.5 15.6 12 20 12 20z"/>';
  I.eye = '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>';
  I.check = '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>';
  I.gear = '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>';
  I.okc = '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>';
  I.phone = '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>';
  I.mail = '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>';
  I.up = '<path d="m6 15 6-6 6 6"/>';
  I.x = '<path d="M6 6l12 12M18 6 6 18"/>';
  I.minus = '<path d="M6 12h12"/>';
  I.plus = '<path d="M12 6v12M6 12h12"/>';
  I.cal = '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>';
  I.headset = '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19 19c0 1.5-2 2.5-5 2.5"/>';
  var AVATAR = '<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" fill="currentColor" opacity=".12"/><circle cx="32" cy="25" r="11" fill="currentColor" opacity=".55"/><path d="M11 60c2.5-12 11-18 21-18s18.5 6 21 18z" fill="currentColor" opacity=".55"/></svg>';

  /* ---------- product cards (same layout as the reference) ---------- */
  function isOriginal(name) { return /اصلي|أصلي/.test(name); }
  function priceOf(p) {
    var price = p.is_on_sale && p.sale_price ? p.sale_price : p.price;
    var reg = p.regular_price && p.regular_price > price ? p.regular_price : 0;
    return { price: price, reg: reg, off: reg ? Math.round((1 - price / reg) * 100) : 0 };
  }
  function catName(p) { return (p.category && p.category.name) || (isOriginal(p.name) ? 'قطع أصلية' : 'قطع وإكسسوارات'); }
  document.addEventListener('click', function (e) {
    var q = e.target.closest('.oc-qty button');
    if (q) {
      var inp = q.parentNode.querySelector('input');
      inp.value = Math.max(1, (parseInt(inp.value, 10) || 1) + (+q.dataset.q));
      return;
    }
    var w = e.target.closest('.oc-wish');
    if (w) {
      e.preventDefault();
      try { if (window.salla && salla.wishlist) { (salla.wishlist.add || salla.wishlist.toggle).call(salla.wishlist, +w.dataset.id); w.classList.add('is-on'); } } catch (err) {}
      return;
    }
    var b = e.target.closest('.oc-add'); if (!b) return;
    e.preventDefault();
    var id = +b.dataset.id;
    var qi = b.closest('.oc-card, .oc-deal'); qi = qi && qi.querySelector('.oc-qty input');
    var qty = qi ? Math.max(1, parseInt(qi.value, 10) || 1) : 1;
    b.classList.add('is-busy');
    var done = function () { b.classList.remove('is-busy'); b.classList.add('is-done'); setTimeout(function () { b.classList.remove('is-done'); }, 1600); };
    try {
      var capi = window.salla && salla.cart && (salla.cart.api || salla.cart);
      var pr = capi && (qty === 1 && capi.quickAdd ? capi.quickAdd(id) : capi.addItem({ id: id, quantity: qty }));
      if (pr && pr.then) pr.then(done, function () { b.classList.remove('is-busy'); }); else done();
    } catch (err) { b.classList.remove('is-busy'); }
  });

  function slider(wrap) {
    var track = $('.oc-track', wrap), prev = $('.oc-arrow--prev', wrap), next = $('.oc-arrow--next', wrap);
    if (!track || !prev) return;
    var step = function () { var c = track.querySelector(':scope > *'); return c ? c.getBoundingClientRect().width : 300; };
    prev.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
  }
  function arrows() { return '<button type="button" class="oc-arrow oc-arrow--prev" aria-label="السابق">' + ic('right') + '</button><button type="button" class="oc-arrow oc-arrow--next" aria-label="التالي">' + ic('left') + '</button>'; }
  function head(title, link, linkText, nav, tag) {
    tag = tag || 'h2';
    var side = (link ? '<a class="oc-more" href="' + link + '">' + (linkText || 'عرض الكل') + '</a>' : '') + (nav ? '<div class="oc-nav">' + arrows() + '</div>' : '');
    return '<div class="oc-head"><' + tag + '>' + title + '</' + tag + '>' + (side ? '<div class="oc-head__side">' + side + '</div>' : '') + '</div>';
  }
  function skeleton(n) { var s = ''; for (var i = 0; i < n; i++) s += '<div class="oc-slide-item"><div class="oc-skel"></div></div>'; return s; }

  /* ---------- 2 vehicle finder with results on the page ---------- */
  var MODELS = [
    { n: 'لاندكروزر', parts: C['لاندكروزر'], st: [[0, 2007, C['لاندكروزر حتى 2007']], [2008, 2015, C['لاندكروزر 2008 إلى 2015']], [2016, 2100, C['لاندكروزر 2016 إلى 2025']]] },
    { n: 'برادو', parts: C['برادو'], st: [[0, 2100, C['خطوط برادو']]] },
    { n: 'هايلوكس', parts: C['هايلوكس وفورشنر'], st: [[0, 2004, C['هايلوكس حتى 2004']], [2005, 2015, C['هايلوكس 2005 إلى 2015']], [2016, 2100, C['هايلوكس 2016 إلى 2025']]] },
    { n: 'فورشنر', parts: C['هايلوكس وفورشنر'] },
    { n: 'شاص', parts: C['شاص وربع'], st: [[0, 2006, C['شاص حتى 2006']], [2007, 2015, C['شاص 2007 إلى 2015']], [2016, 2100, C['شاص 2016 إلى 2025']]] },
    { n: 'ربع', parts: C['شاص وربع'], st: [[0, 2006, C['ربع حتى 2006']], [2007, 2015, C['ربع 2007 إلى 2015']], [2016, 2100, C['ربع 2016 إلى 2025']]] },
    { n: 'اف جي كروزر', parts: C['اف جي كروزر'] },
    { n: 'كامري', parts: C['كامري'] },
    { n: 'كورولا', parts: C['كورولا ويارس'] },
    { n: 'يارس', parts: C['كورولا ويارس'] }
  ];
  function catId(url) { var m = /\/c(\d+)/.exec(url || ''); return m ? m[1] : null; }
  function finderSection() {
    var years = []; for (var y = 2026; y >= 1990; y--) years.push(y);
    var s = h('<section class="oc-finder-wrap" id="oc-finder"><div class="oc-container"><div class="oc-finder">' +
      '<div class="oc-finder__title"><span class="oc-finder__ic">' + ic('car') + '</span><div><b>اختر سيارتك</b><small>ونعرض لك القطع والخطوط المناسبة لها</small></div></div>' +
      '<label class="oc-field"><span>الموديل</span><select data-f="m"><option value="">اختر الموديل</option>' + MODELS.map(function (m, i) { return '<option value="' + i + '">' + m.n + '</option>'; }).join('') + '</select></label>' +
      '<label class="oc-field"><span>سنة الصنع</span><select data-f="y"><option value="">اختر السنة</option>' + years.map(function (y) { return '<option>' + y + '</option>'; }).join('') + '</select></label>' +
      '<label class="oc-field"><span>تبحث عن</span><select data-f="t"><option value="parts">قطع الغيار والاكسسوارات</option><option value="st">الخطوط</option></select></label>' +
      '<button type="button" class="oc-btn oc-btn--primary oc-finder__go">' + ic('search') + 'اعرض المنتجات</button>' +
      '<p class="oc-finder__msg" hidden></p>' +
      '</div>' +
      '<div class="oc-finder__res" hidden><div class="oc-head oc-head--sm"><h3></h3><div class="oc-head__side"><a class="oc-more" href="#">عرض كل المنتجات</a><div class="oc-nav">' + arrows() + '</div></div></div>' +
      '<div class="oc-slider"><div class="oc-track"></div></div></div>' +
      '</div></section>');
    var fm = $('[data-f=m]', s), fy = $('[data-f=y]', s), ft = $('[data-f=t]', s), msg = $('.oc-finder__msg', s), res = $('.oc-finder__res', s);
    slider(res);
    fm.addEventListener('change', function () {
      var m = MODELS[fm.value], opt = ft.querySelector('[value=st]');
      opt.disabled = !!(m && !m.st);
      if (opt.disabled && ft.value === 'st') ft.value = 'parts';
      msg.hidden = true;
    });
    $('.oc-finder__go', s).addEventListener('click', function () {
      var m = MODELS[fm.value];
      if (!m) { msg.textContent = 'اختر موديل سيارتك أولا'; msg.hidden = false; fm.focus(); return; }
      var url = m.parts, label = 'قطع غيار واكسسوارات ' + m.n;
      if (ft.value === 'st' && m.st) {
        var y = +fy.value;
        if (!y && m.st.length > 1) { msg.textContent = 'اختر سنة الصنع عشان نعرض لك الخطوط المناسبة'; msg.hidden = false; fy.focus(); return; }
        for (var i = 0; i < m.st.length; i++) { if (!y || (y >= m.st[i][0] && y <= m.st[i][1])) { url = m.st[i][2]; break; } }
        label = 'خطوط ' + m.n + (y ? ' ' + y : '');
      }
      msg.hidden = true;
      var track = $('.oc-track', res);
      $('h3', res).textContent = label;
      $('.oc-more', res).href = url;
      track.innerHTML = skeleton(4);
      res.hidden = false;
      res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      var id = catId(url);
      api('products?source=categories&source_value[]=' + id + '&per_page=12').then(function (r) {
        var list = (r && r.data) || [];
        track.innerHTML = list.length ? list.map(card).join('') : '<p class="oc-empty">ما فيه منتجات لهذا الاختيار حاليا</p>';
      }).catch(function () { location.href = url; });
    });
    return s;
  }

  /* ---------- 3 shop by category ---------- */
  var KINDS = [
    ['الشمعات', 'شمعات', 37, 'https://cdn.salla.sa/azeyQR/09fbd581-ed7d-4845-87e8-f1cf6851b87b-500x500-PgcGfy8EBN05LydUnxjyOhTQOJF1IV3jVMZoyR5o.jpg'],
    ['الشبك', 'شبك', 46, 'https://cdn.salla.sa/azeyQR/49dd4ee2-36a6-4e36-86b4-872d52ac4b18-500x500-Jrsl76LbVFKRf85Z11gXLftbyYeCFBQ6wLD5kUw0.jpg'],
    ['الصدامات', 'صدام', 92, 'https://cdn.salla.sa/azeyQR/417f3092-00dc-43e6-85ae-f477352b2187-500x500-LcKrzMVsSmz6ROeo2Pq5X14xH5qxGM9bXltqjODw.jpg'],
    ['المرايات', 'مراية', 48, 'https://cdn.salla.sa/azeyQR/73f70e75-7dd8-42e2-9196-c2cceeb3a265-500x500-VD1Fq0GqRTp826NH6A0AKigZPCgg4xx1vfXK1B2O.jpg'],
    ['الدعسات', 'دعسات', 34, 'https://cdn.salla.sa/azeyQR/af27cda8-20d7-4096-bc4b-76293c878412-500x500-u289EM7vucDlVAqFyI9fAcPSw3U5DsOZo6B5fsKy.jpg'],
    ['الديكورات', 'ديكور', 84, 'https://cdn.salla.sa/azeyQR/ea1cc8c4-c4ef-45cb-a095-1b36a9322d48-500x500-ckZvWCSAgO8jqz8Iy6SKfyKnWDEDF7g71Iwe1I5f.jpg'],
    ['الفرشات', 'فرشات', 16, 'https://cdn.salla.sa/azeyQR/64c3b49a-7da1-4e79-8e71-2a9a83dfd966-500x500-Lh1pTRRNLV0xEW88qZLe1vgcr0YSU9ZciJPnsUED.jpg'],
    ['الدركسونات', 'دركسون', 16, 'https://cdn.salla.sa/azeyQR/908a35d8-4a1f-4be7-8cfb-a2b56392bf7a-500x500-KI79WXKHjxjCToKskET0PYjXCEOeuy3uTezITqIV.jpg'],
    ['المسجلات', 'مسجل', 14, 'https://cdn.salla.sa/azeyQR/880b1ea5-6b1a-4724-aabf-16f05c5a1720-500x500-szfDZ9TQzmIOyFiURX9SkekD1PG6kbgCE2JCJ9Rj.jpg'],
    ['العلامات', 'علامة', 64, 'https://cdn.salla.sa/azeyQR/e1ce7dd2-fe3b-4102-831d-944fe333e449-500x500-Ar01PnblryNHtCnIeAPj0dg5EYEYOEKjjv8ii1HM.jpg']
  ];
  /* ================= home: built section by section from the reference ================= */
  I.rocket = '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M9 15 6 12l2-4c2.5-4 7-5.5 12-5 .5 5-1 9.5-5 12l-4 2z"/><circle cx="15" cy="9" r="1.6"/><path d="M8 8H5l-2 3 3 1M16 16v3l-3 2-1-3"/>';
  I.tag = '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.4"/>';
  I.pct = '<circle cx="12" cy="12" r="9"/><path d="m8.5 15.5 7-7"/><circle cx="9" cy="9" r=".9"/><circle cx="15" cy="15" r=".9"/>';
  I.clock = '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>';
  I.wrench = '<path d="M14.5 5.5a4 4 0 0 0 5 5L12 18a2.1 2.1 0 0 1-3-3z"/><path d="M14.5 5.5 17 3l1.5 1.5L16 7"/>';
  I.medal = '<circle cx="12" cy="9" r="6"/><path d="m9 14-2 7 5-3 5 3-2-7"/><path d="m10 9 1.5 1.5L14 8"/>';
  I.stripe = '<path d="M3 17 9 7h4L7 17zM11 17l6-10h4l-6 10z"/>';

  /* red gear and wrench mark before every section title, like the reference */
  var HICON = '<svg class="oc-hic" viewBox="0 0 32 32" aria-hidden="true"><circle cx="15" cy="15" r="11" fill="none" stroke="var(--oc-red)" stroke-width="5" stroke-dasharray="4.3 4.3"/><circle cx="15" cy="15" r="9.5" fill="var(--oc-red)"/><circle cx="15" cy="15" r="4" fill="var(--oc-surface)"/><path d="M9 25 21 12" stroke="var(--oc-ink)" stroke-width="3.6" stroke-linecap="round"/><circle cx="23" cy="9.5" r="5" fill="var(--oc-ink)"/><path d="m23.5 9 4-4" stroke="var(--oc-surface)" stroke-width="2.6" stroke-linecap="round"/></svg>';
  function sHead(title, o) {
    o = o || {};
    return '<div class="oc-shead' + (o.center ? ' oc-shead--c' : '') + '"><div class="oc-shead__t">' + HICON + '<h2>' + title + '</h2>' + (o.after || '') + '</div>' +
      (o.all ? '<a class="oc-shopall" href="' + o.all + '">تسوق الكل' + ic('left') + '</a>' : '') + '</div>';
  }
  function starsRow(p) {
    var r = p.rating; if (!r || !(r.count || r.total)) return '';
    var n = Math.round(r.stars || r.rate || 0), s = '';
    for (var i = 0; i < 5; i++) s += '<span class="' + (i < n ? 'on' : '') + '">' + STAR + '</span>';
    return '<div class="oc-rate"><span class="oc-stars">' + s + '</span><small>(' + num(r.count || r.total) + ' تقييم)</small></div>';
  }
  function offBadge(pr) { return pr.off ? '<span class="oc-badge">خصم ' + num(pr.off) + '٪</span>' : ''; }

  /* product card like the reference: grey image box, category, name, price, full black cart button */
  function card(p) {
    var pr = priceOf(p), out = p.is_out_of_stock || p.status === 'out';
    var img = (p.image && p.image.url) || p.thumbnail || '';
    return '<div class="oc-slide-item"><article class="oc-card' + (out ? ' is-out' : '') + '" data-id="' + p.id + '">' +
      '<div class="oc-card__media">' +
      '<a class="oc-card__img" href="' + esc(p.url) + '"><img loading="lazy" src="' + esc(img) + '" alt="' + esc(p.name) + '"></a>' + offBadge(pr) +
      '<div class="oc-card__tools">' +
      '<button type="button" class="oc-tool oc-wish" data-id="' + p.id + '" aria-label="أضف للمفضلة">' + ic('heart') + '<span>أضف للمفضلة</span></button>' +
      '<a class="oc-tool" href="' + esc(p.url) + '" aria-label="عرض المنتج">' + ic('eye') + '<span>عرض المنتج</span></a>' +
      '</div></div>' +
      '<div class="oc-card__body">' +
      '<span class="oc-card__cat">' + esc(catName(p)) + '</span>' +
      '<a class="oc-card__title" href="' + esc(p.url) + '">' + esc(p.name) + '</a>' + starsRow(p) +
      '<div class="oc-price"><b>' + num(pr.price) + ' ' + SAR + '</b>' + (pr.reg ? '<s>' + num(pr.reg) + ' ' + SAR + '</s>' : '') + '</div>' +
      (out ? '<span class="oc-addbtn is-off">نفدت الكمية</span>' : '<button type="button" class="oc-addbtn oc-add" data-id="' + p.id + '">أضف للسلة' + ic('bag') + '</button>') +
      '</div></article></div>';
  }

  /* ---------- hero: dark rounded banner with a photo, badge, title, price line and button ---------- */
  var SLIDES = [
    { b: 'تصاميم حصرية', t: ['خطوط تويوتا', 'تعطي سيارتك', 'هوية جديدة'], f: 'تبدأ من ١٤٩&nbsp;ريال', p: 'خطوط لاندكروزر وهايلوكس وشاص وربع حسب موديل سيارتك وسنة صنعها', img: 'ban_stripes.webp', u: C['الخطوط'] },
    { b: 'أصلية وبديلة', t: ['قطع غيار', 'لكل موديلات', 'تويوتا'], f: 'نتأكد من المطابقة قبل الشحن', p: 'قطع أصلية وبديلة لأشهر موديلات تويوتا بأسعار منافسة', img: 'ban_parts.webp', u: C['قطع الغيار والاكسسوارات'] },
    { b: 'عروض أوبرا كار', t: ['اكسسوارات', 'تفرق في', 'سيارتك'], f: 'شحن مجاني فوق ٦٠٠&nbsp;ريال', p: 'ديكورات ومسجلات وفرشات ودركسونات لسيارات تويوتا', img: 'ban_acc.webp', u: C['اكسسوارات تويوتا عامة'] }
  ];
  function heroSection() {
    var s = h('<section class="oc-hero2" aria-label="الواجهة"><div class="oc-container"><div class="oc-hero2__box">' +
      SLIDES.map(function (sl, i) {
        return '<div class="oc-hslide' + (i === 0 ? ' is-active' : '') + '"><span class="oc-hslide__bg" style="background-image:url(' + IMG + sl.img + ')"></span>' +
          '<div class="oc-hslide__txt"><span class="oc-hslide__badge">' + sl.b + '</span>' +
          '<h2>' + sl.t[0] + '<br>' + sl.t[1] + '<br><em>' + sl.t[2] + '</em></h2>' +
          '<b class="oc-hslide__from">' + sl.f + '</b><p>' + sl.p + '</p>' +
          '<a class="oc-hslide__btn" href="' + sl.u + '">تسوق الآن</a></div></div>';
      }).join('') + '</div></div>' +
      '<div class="oc-hero2__dots">' + SLIDES.map(function (_, i) { return '<button type="button" aria-label="شريحة ' + (i + 1) + '" class="' + (i === 0 ? 'is-on' : '') + '"></button>'; }).join('') + '</div>' +
      '</section>');
    var slides = $$('.oc-hslide', s), dots = $$('.oc-hero2__dots button', s), cur = 0, timer;
    function go(i) {
      slides[cur].classList.remove('is-active'); dots[cur].classList.remove('is-on');
      cur = (i + slides.length) % slides.length;
      slides[cur].classList.add('is-active'); dots[cur].classList.add('is-on');
      restart();
    }
    function restart() { clearInterval(timer); timer = setInterval(function () { go(cur + 1); }, 6500); }
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });
    var x0 = null;
    s.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    s.addEventListener('touchend', function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) go(cur + (dx > 0 ? 1 : -1)); x0 = null; });
    restart();
    return s;
  }

  /* ---------- categories: white cards with the picture in a grey circle and the item count ---------- */
  function kindsSection() {
    return h('<section class="oc-sec oc-cols"><div class="oc-container"><div class="oc-cols__row">' + KINDS.map(function (k) {
      return '<a class="oc-col" href="/search?q=' + encodeURIComponent(k[1]) + '"><span class="oc-col__pic"><img loading="lazy" src="' + k[3] + '" alt=""></span><b>' + k[0] + '</b><small>' + num(k[2]) + ' منتج</small></a>';
    }).join('') + '</div></div></section>');
  }

  /* ---------- product rows with category tabs and a shop all link ---------- */
  function sel(ids) { return 'products?source=selected&' + ids.map(function (id) { return 'source_value[]=' + id; }).join('&'); }
  function inCat(name, n) { return 'products?source=categories&source_value[]=' + catId(C[name]) + '&per_page=' + (n || 30); }
  function tabRow(o) {
    var tabs = '<div class="oc-tabs" role="tablist">' + o.tabs.map(function (t, i) { return '<button type="button" role="tab" aria-selected="' + (i ? 'false' : 'true') + '" class="' + (i ? '' : 'is-on') + '" data-i="' + i + '">' + t.n + '</button>'; }).join('') + '</div>';
    var s = h('<section class="oc-sec oc-prow' + (o.below ? ' oc-prow--below' : '') + '"' + (o.id ? ' id="' + o.id + '"' : '') + '><div class="oc-container">' +
      sHead(o.title, { all: o.all, after: o.below ? '' : tabs }) + (o.below ? tabs : '') +
      '<div class="oc-slider"><div class="oc-track oc-track--six">' + skeleton(6) + '</div></div></div></section>');
    var track = $('.oc-track', s), cache = {};
    function load(i) {
      $$('.oc-tabs button', s).forEach(function (b) { var on = +b.dataset.i === i; b.classList.toggle('is-on', on); b.setAttribute('aria-selected', on); });
      if (cache[i]) { track.innerHTML = cache[i]; track.scrollLeft = 0; return; }
      track.innerHTML = skeleton(6);
      var t = o.tabs[i];
      api(t.q).then(function (r) {
        var list = (r && r.data) || [];
        if (t.order) list.sort(function (a, b) { return t.order.indexOf(+a.id) - t.order.indexOf(+b.id); });
        var ok = list.filter(function (p) { return !(p.is_out_of_stock || p.status === 'out'); });
        list = ok.concat(list.filter(function (p) { return ok.indexOf(p) < 0; }));
        cache[i] = list.length ? list.slice(0, 12).map(card).join('') : '<p class="oc-empty">ما فيه منتجات في هذا القسم حاليا</p>';
        track.innerHTML = cache[i]; track.scrollLeft = 0;
      }).catch(function () { if (!i) s.remove(); });
    }
    $$('.oc-tabs button', s).forEach(function (b) { b.addEventListener('click', function () { load(+b.dataset.i); }); });
    load(0);
    return s;
  }
  function featuredSection() {
    return tabRow({ id: 'oc-best', title: 'الأكثر طلبا', all: C['قطع الغيار والاكسسوارات'], tabs: [
      { n: 'كل المنتجات', q: sel(FEATURED), order: FEATURED },
      { n: 'قطع لاندكروزر', q: inCat('لاندكروزر') },
      { n: 'قطع هايلوكس', q: inCat('هايلوكس وفورشنر') },
      { n: 'اكسسوارات عامة', q: inCat('اكسسوارات تويوتا عامة') }] });
  }
  function latestSection() {
    return tabRow({ id: 'oc-new', below: true, title: 'وصل حديثا', all: C['الخطوط'], tabs: [
      { n: 'كل المنتجات', q: 'products?source=latest&per_page=50' },
      { n: 'خطوط هايلوكس', q: inCat('خطوط هايلوكس') },
      { n: 'خطوط شاص', q: inCat('خطوط شاص') },
      { n: 'ستيكرات وشعارات', q: inCat('ستيكرات وشعارات') }] });
  }

  /* ---------- three colour banners with a badge, a title, a white button and a product picture ---------- */
  function bannersSection() {
    var B = [
      ['org', 'g', 'تبدأ من ١٤٩&nbsp;ريال', 'خطوط<br>تويوتا', 'لكل موديل وسنة صنع', C['الخطوط'], IMG + 'car_lc.webp'],
      ['red', 'p', 'أصلية وبديلة', 'قطع<br>الغيار', 'لأشهر موديلات تويوتا', C['قطع الغيار والاكسسوارات'], IMG + 'hero_parts.webp'],
      ['org', 'g', 'لمسات تفرق', 'اكسسوارات<br>السيارة', 'ديكورات ومسجلات وفرشات', C['اكسسوارات تويوتا عامة'], IMG + 'car_shas.webp']
    ];
    return h('<section class="oc-sec oc-cbans"><div class="oc-container"><div class="oc-cbans__row">' + B.map(function (b) {
      return '<a class="oc-cban oc-cban--' + b[0] + '" href="' + b[5] + '"><span class="oc-cban__txt"><span class="oc-pill oc-pill--' + b[1] + '">' + b[2] + '</span><b>' + b[3] + '</b><small>' + b[4] + '</small><span class="oc-cban__btn">تسوق الآن' + ic('left') + '</span></span><img loading="lazy" src="' + b[6] + '" alt=""></a>';
    }).join('') + '</div></div></section>');
  }

  /* ---------- shop by car: white cards with the car in a grey circle ---------- */
  var CARS = [
    ['لاندكروزر', 'car_lc.webp', C['لاندكروزر']], ['برادو', 'car_prado.webp', C['برادو']], ['هايلوكس', 'car_hilux.webp', C['هايلوكس وفورشنر']],
    ['شاص', 'car_shas.webp', C['شاص وربع']], ['ربع', 'car_rab3.webp', C['شاص وربع']], ['اف جي كروزر', 'car_fj.webp', C['اف جي كروزر']],
    ['كامري', 'car_camry.webp', C['كامري']], ['كورولا', 'car_corolla.webp', C['كورولا ويارس']]
  ];
  function modelsSection() {
    return h('<section class="oc-sec oc-cars"><div class="oc-container">' + sHead('تسوق حسب سيارتك', { center: true }) +
      '<div class="oc-cars__row">' + CARS.map(function (c) { return '<a class="oc-carc" href="' + c[2] + '"><span class="oc-carc__pic"><img loading="lazy" src="' + IMG + c[1] + '" alt=""></span><b>' + c[0] + '</b></a>'; }).join('') +
      '</div></div></section>');
  }

  /* ---------- deals of the week: tall promo, title with countdown and a 3 by 3 grid of small cards ---------- */
  function endDate(v) {
    if (!v) return null;
    var d = typeof v === 'number' || /^\d+$/.test(String(v)) ? new Date(+v * (+v < 1e12 ? 1000 : 1)) : new Date(String(v).replace(' ', 'T'));
    return isNaN(d) || d < new Date() ? null : d;
  }
  function nextFriday() { var d = new Date(); var add = (5 - d.getDay() + 7) % 7 || 7; d.setDate(d.getDate() + add); d.setHours(23, 59, 59, 0); return d; }
  function timerHtml(cls) { return '<span class="' + cls + '" data-end="' + nextFriday().getTime() + '"><span><b data-u="d">٠</b><small>يوم</small></span><span><b data-u="h">٠</b><small>ساعة</small></span><span><b data-u="m">٠</b><small>دقيقة</small></span><span><b data-u="s">٠</b><small>ثانية</small></span></span>'; }
  function tickAll() {
    var now = Date.now();
    $$('[data-end]').forEach(function (el) {
      var left = Math.max(0, (+el.dataset.end - now) / 1000);
      var v = { d: Math.floor(left / 86400), h: Math.floor(left % 86400 / 3600), m: Math.floor(left % 3600 / 60), s: Math.floor(left % 60) };
      $$('[data-u]', el).forEach(function (b) { var x = v[b.dataset.u]; b.textContent = (x < 10 && b.dataset.u !== 'd' ? '٠' : '') + num(x); });
    });
  }
  setInterval(tickAll, 1000);
  function miniCard(p) {
    var pr = priceOf(p), out = p.is_out_of_stock || p.status === 'out';
    return '<article class="oc-mini"><a class="oc-mini__img" href="' + esc(p.url) + '"><img loading="lazy" src="' + esc(p.image && p.image.url) + '" alt="' + esc(p.name) + '">' + offBadge(pr) + '</a>' +
      '<div class="oc-mini__b"><span class="oc-card__cat">' + esc(catName(p)) + '</span><a class="oc-mini__t" href="' + esc(p.url) + '">' + esc(p.name) + '</a>' + starsRow(p) +
      '<div class="oc-mini__f"><div class="oc-price"><b>' + num(pr.price) + ' ' + SAR + '</b>' + (pr.reg ? '<s>' + num(pr.reg) + ' ' + SAR + '</s>' : '') + '</div>' +
      (out ? '' : '<button type="button" class="oc-mini__add oc-add" data-id="' + p.id + '" aria-label="أضف للسلة">' + ic('bag') + '</button>') + '</div></div></article>';
  }
  function dealsSection() {
    var s = h('<section class="oc-sec oc-wdeals" id="oc-deals"><div class="oc-container oc-wdeals__in">' +
      '<a class="oc-wdeals__promo" href="/offers"><span class="oc-pill oc-pill--g">هذا الأسبوع فقط</span><b>وفر حتى<br><em>١٥٪</em> خصم</b><small>على مختارات من القطع والخطوط</small><span class="oc-wdeals__btn">تسوق الآن</span><img loading="lazy" src="' + IMG + 'car_rab3.webp" alt=""></a>' +
      '<div class="oc-wdeals__main">' + sHead('عروض الأسبوع', { all: '/offers', after: '<span class="oc-wdeals__time">ينتهي خلال' + timerHtml('oc-ctd') + '</span>' }) +
      '<div class="oc-wdeals__grid">' + new Array(10).join('<div class="oc-mini oc-mini--skel"></div>') + '</div></div></div></section>');
    var grid = $('.oc-wdeals__grid', s);
    api('products?source=offers&per_page=9').then(function (r) {
      var list = (r && r.data) || [];
      if (list.length >= 9) return list;
      return api(sel(DEALS_FALLBACK.concat(FEATURED))).then(function (x) {
        var ids = list.map(function (p) { return p.id; });
        return list.concat(((x && x.data) || []).filter(function (p) { return ids.indexOf(p.id) < 0; }));
      });
    }).then(function (list) {
      list = list.filter(function (p) { return !(p.is_out_of_stock || p.status === 'out'); });
      grid.innerHTML = list.slice(0, 9).map(miniCard).join('');
      tickAll();
    }).catch(function () { s.remove(); });
    return s;
  }

  /* ---------- shop by model: two rows of small tiles ---------- */
  function makesSection() {
    var row1 = [], row2 = [];
    var stripes = findNode(997204374);
    (stripes && stripes.s || []).forEach(function (m) { (m.s || []).forEach(function (y) { row1.push([m.n, y.n.replace(/^\S+\s+/, ''), y.u]); }); });
    MODELS.forEach(function (m) { row2.push(['قطع', m.n, m.parts]); });
    row2.push(['قطع', 'اكسسوارات عامة', C['اكسسوارات تويوتا عامة']], ['خطوط', 'ستيكرات وشعارات', C['ستيكرات وشعارات'] || C['الخطوط']]);
    var tile = function (t) { return '<a class="oc-make" href="' + t[2] + '"><small>' + t[0] + '</small><b>' + t[1] + '</b></a>'; };
    return h('<section class="oc-sec oc-makes"><div class="oc-container">' + sHead('تسوق حسب الموديل وسنة الصنع', { center: true }) +
      '<div class="oc-makes__grid">' + row1.slice(0, 12).map(tile).join('') + row2.slice(0, 12).map(tile).join('') + '</div></div></section>');
  }

  /* ---------- why choose us: two cards, a photo, two cards ---------- */
  var HOME_WHY = [
    ['medal', 'قطع أصلية وبديلة', 'نوفر القطع الأصلية والبديلة لأشهر موديلات تويوتا بجودة عالية وأسعار منافسة'],
    ['check', 'نتأكد من المطابقة', 'نراجع مطابقة كل قطعة لموديل سيارتك وسنة صنعها قبل الشحن'],
    ['stripe', 'خطوط بتصاميم خاصة', 'خطوط أصلية وتصاميم خاصة للاندكروزر والهايلوكس والشاص والربع حسب سنة الصنع'],
    ['headset', 'نرد على استفساراتك', 'نساعدك تختار القطعة الصحيحة ونرد عليك قبل الطلب وبعده']
  ];
  function aboutSection() {
    var c = function (w) { return '<div class="oc-why__card"><span class="oc-why__ic">' + ic(w[0]) + '</span><h3>' + w[1] + '</h3><p>' + w[2] + '</p></div>'; };
    return h('<section class="oc-sec oc-why" id="oc-about"><div class="oc-container">' + sHead('لماذا أوبرا كار', { center: true }) +
      '<div class="oc-why__grid"><div class="oc-why__col">' + c(HOME_WHY[0]) + c(HOME_WHY[1]) + '</div>' +
      '<div class="oc-why__pic"><img loading="lazy" src="' + IMG + 'art_orig.webp" alt="قطع غيار تويوتا"></div>' +
      '<div class="oc-why__col">' + c(HOME_WHY[2]) + c(HOME_WHY[3]) + '</div></div></div></section>');
  }

  /* ---------- flash banner with a countdown ---------- */
  function flashSection() {
    return h('<section class="oc-flash" style="background-image:url(' + IMG + 'ban_parts.webp)"><div class="oc-container oc-flash__in">' +
      '<div class="oc-flash__pic"><i></i><img loading="lazy" src="' + IMG + 'hero_lc.webp" alt=""></div>' +
      '<div class="oc-flash__txt"><h2>تخفيضات الأسبوع</h2><p>سارع واحصل على <em>خصومات حصرية</em></p><a class="oc-flash__btn" href="#oc-deals">تسوق الآن</a>' + timerHtml('oc-flash__timer') + '</div>' +
      '</div></section>');
  }

  /* ---------- testimonials: shown only from real store reviews ---------- */
  function reviewCard(x) {
    var c = x.customer || {}, n = Math.round(x.rating || x.stars || 5), st = '';
    for (var i = 0; i < 5; i++) st += '<span class="' + (i < n ? 'on' : '') + '">' + STAR + '</span>';
    var prod = x.product || x.item || null, pimg = prod && ((prod.image && prod.image.url) || prod.thumbnail);
    return '<div class="oc-slide-item"><article class="oc-tcard"><div class="oc-tcard__top"><span class="oc-avatar">' + (c.avatar ? '<img src="' + esc(c.avatar) + '" alt="">' : AVATAR) + '</span>' +
      '<div><span class="oc-stars">' + st + '</span><b>' + esc(c.name || 'عميل أوبرا كار') + '</b><small>عميل</small></div><span class="oc-tcard__q" aria-hidden="true">”</span></div>' +
      '<p>' + esc(x.content || x.comment) + '</p>' +
      (prod ? '<a class="oc-tcard__prod" href="' + esc(prod.url || '#') + '">' + (pimg ? '<span><img src="' + esc(pimg) + '" alt=""></span>' : '') + '<b>' + esc(prod.name || '') + '</b></a>' : '') +
      '</article></div>';
  }
  function reviewsSection() {
    var s = h('<section class="oc-sec oc-tests oc-hidden"><div class="oc-container">' + sHead('آراء عملائنا', { center: true }) +
      '<div class="oc-slider"><div class="oc-track oc-track--five"></div></div></div></section>');
    api('reviews?per_page=10').then(function (r) {
      var list = ((r && r.data) || []).filter(function (x) { return x && (x.content || x.comment); });
      if (!list.length) return;
      $('.oc-track', s).innerHTML = list.map(reviewCard).join('');
      s.classList.remove('oc-hidden');
    }).catch(function () {});
    return s;
  }

  /* ---------- logos strip ---------- */
  function logosSection() {
    return h('<section class="oc-logos" aria-label="طرق الدفع"><div class="oc-container oc-logos__row">' + PAY.map(function (p) { return '<img loading="lazy" src="' + IMG + 'pay/' + p + '.svg" alt="' + p + '">'; }).join('') + '</div></section>');
  }

  /* ---------- articles ---------- */
  var ARTICLES = __ARTICLES__;
  function articlesSection() {
    if (!ARTICLES.length) return null;
    return h('<section class="oc-sec oc-arts" id="oc-articles"><div class="oc-container">' + sHead('أحدث المقالات', { center: true }) +
      '<div class="oc-arts__row">' + ARTICLES.map(function (a) {
        return '<article class="oc-art"><a class="oc-art__img" href="' + a.url + '"><img loading="lazy" src="' + IMG + a.img + '" alt=""></a>' +
          '<span class="oc-pill oc-pill--g">' + a.tag + '</span><a class="oc-art__t" href="' + a.url + '">' + a.title + '</a>' +
          '<small class="oc-art__meta">بواسطة <u>أوبرا كار</u><i></i>' + a.date + '</small>' +
          '<a class="oc-art__more" href="' + a.url + '">اقرأ المزيد' + ic('left') + '</a></article>';
      }).join('') + '</div></div></section>');
  }

  /* ---------- subscribe band before the footer ---------- */
  function subscribeBand() {
    var wa = 'https://wa.me/' + CONTACT.whatsapp + '?text=' + encodeURIComponent('أبغى أشترك في عروض أوبرا كار');
    return h('<section class="oc-sub"><div class="oc-sub__in">' +
      '<div class="oc-sub__txt"><small>تابع جديد القطع والخطوط</small><h2>اشترك في <em>العروض الحصرية</em></h2>' +
      '<div class="oc-sub__form"><a class="oc-sub__field" href="' + wa + '" target="_blank" rel="noopener">' + bic('whatsapp') + 'وصلك جديد العروض على واتساب</a>' +
      '<a class="oc-sub__btn" href="' + wa + '" target="_blank" rel="noopener">اشترك الآن</a></div></div>' +
      '<div class="oc-sub__cars"><img loading="lazy" src="' + IMG + 'car_prado.webp" alt=""><img loading="lazy" src="' + IMG + 'car_lc.webp" alt=""></div>' +
      '</div></section>');
  }

  /* ---------- features bar (all pages, above footer) ---------- */
  var FEATS = [['truck', 'شحن سريع', 'لكل المملكة وتوصيل سريع داخل جدة'], ['gift', 'شحن مجاني', 'للطلبات فوق ٦٠٠&nbsp;ريال'], ['card', 'قسّطها', 'مع تابي وتمارا'],
    ['check', 'نتأكد من المطابقة', 'قبل الشحن لموديل سيارتك'], ['gear', 'قطع أصلية وبديلة', 'لأشهر موديلات تويوتا'], ['ret', 'استبدال واسترجاع', 'حسب سياسة المتجر']];
  function featuresBar() {
    var footer = $('footer.store-footer');
    if (!footer || $('.oc-feats')) return;
    footer.parentNode.insertBefore(h('<div class="oc-feats-wrap"><div class="oc-container"><div class="oc-feats">' + FEATS.map(function (f) {
      return '<div class="oc-feat"><span class="oc-feat__ic">' + ic(f[0]) + '</span><div><b>' + f[1] + '</b><small>' + f[2] + '</small></div></div>';
    }).join('') + '</div></div></div>'), footer);
  }

  /* ---------- footer additions ---------- */
  var PAY = ['mada', 'apple_pay', 'visa', 'master', 'tabby', 'tamara'];
  var PAGES = __PAGES__;
  var BRAND = {"instagram": "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077", "x": "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z", "tiktok": "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z", "snapchat": "M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z", "whatsapp": "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"};
  function bic(n) { return '<svg class="oc-bic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="' + BRAND[n] + '"/></svg>'; }
  // contact details: WhatsApp and social links are placeholders until the owner sends the real ones
  var CONTACT = { phone: '+966539036264', whatsapp: '966500000000' };
  var SOCIAL = [['instagram', 'انستقرام', '#'], ['x', 'إكس', '#'], ['tiktok', 'تيك توك', '#'], ['snapchat', 'سناب شات', '#']];
  var ABOUT_URL = '/%D9%85%D9%86-%D9%86%D8%AD%D9%86/page-1058176407';
  var STORE_URL = '/%D8%A7%D9%84%D9%85%D8%AA%D8%AC%D8%B1/page-80660524';
  var CONTACT_URL = '/%D8%AA%D9%88%D8%A7%D8%B5%D9%84-%D9%85%D8%B9%D9%86%D8%A7/page-1028738080';
  var FAQ_URL = '/%D8%A7%D9%84%D8%A3%D8%B3%D8%A6%D9%84%D8%A9-%D8%A7%D9%84%D8%B4%D8%A7%D8%A6%D8%B9%D8%A9/page-1493469730';
  function footerExtras() {
    var f = $('footer.store-footer'); if (!f || f.dataset.oc) return; f.dataset.oc = '1';
    var menu = $('salla-menu', f);
    if (menu) {
      setTimeout(function () {
        if ($('.oc-flinks', f) || $$('a', menu).length) return;
        var links = [['الخطوط', C['الخطوط']], ['قطع الغيار والاكسسوارات', C['قطع الغيار والاكسسوارات']], ['اختر سيارتك', '/#oc-finder'], ['العروض', '/#oc-deals'], ['من نحن', ABOUT_URL]].concat(PAGES);
        menu.parentNode.appendChild(h('<div class="oc-flinks">' + links.map(function (l) { return '<a href="' + l[1] + '">' + l[0] + '</a>'; }).join('') + '</div>'));
      }, 1500);
    }
    // keep article pages out of the footer link list and show the logo like the reference
    var artIds = ARTICLES.map(function (a) { return a.id; });
    var hideArts = function () { $$('a', f).forEach(function (a) { var href = a.getAttribute('href') || ''; if (artIds.some(function (id) { return href.indexOf('page-' + id) > -1; })) { var li = a.closest('li') || a; li.style.display = 'none'; } }); };
    hideArts(); setTimeout(hideArts, 1500); setTimeout(hideArts, 4000);
    var putLogo = function () {
      var h3 = $$('h3', f).filter(function (x) { return x.parentNode && x.parentNode.tagName === 'A'; })[0];
      var logo = window.salla && salla.config && salla.config.get('store.logo');
      if (!h3 || !logo || $('.oc-flogo', f)) return;
      h3.style.display = 'none';
      h3.parentNode.insertBefore(h('<img class="oc-flogo" src="' + logo + '" alt="أوبرا كار">'), h3);
    };
    putLogo(); setTimeout(putLogo, 1500); setTimeout(putLogo, 4000);
    // footer columns: pages, store, policies (Salla menu), contact
    var grid = $('.store-footer__inner .container.grid', f) || $('.store-footer__inner .grid', f);
    if (grid && !$('.oc-fcol', f)) {
      var col = function (title, links, cls) { return h('<div class="oc-fcol ' + (cls || '') + '"><h3>' + title + '</h3><div class="s-menu-footer-list">' + links.map(function (l) { return '<a class="s-menu-footer-item" href="' + l[1] + '">' + l[0] + '</a>'; }).join('') + '</div></div>'); };
      var pagesCol = col('الصفحات', [['الرئيسية', '/'], ['المتجر', STORE_URL], ['من نحن', ABOUT_URL], ['الأسئلة الشائعة', FAQ_URL], ['تواصل معنا', CONTACT_URL]]);
      var storeCol = col('المتجر', [['الخطوط', C['الخطوط']], ['قطع الغيار والاكسسوارات', C['قطع الغيار والاكسسوارات']], ['اكسسوارات تويوتا عامة', C['اكسسوارات تويوتا عامة']], ['العروض', '/#oc-deals'], ['اختر سيارتك', '/#oc-finder']]);
      var contactCol = h('<div class="oc-fcol oc-fcontact" id="oc-contact"><h3>تواصل معنا</h3>' +
        '<a class="oc-fc" href="tel:' + CONTACT.phone + '"><span class="oc-fc__ic">' + ic('phone') + '</span><span dir="ltr">' + CONTACT.phone + '</span></a>' +
        '<a class="oc-fc" href="https://wa.me/' + CONTACT.whatsapp + '" target="_blank" rel="noopener"><span class="oc-fc__ic oc-fc__ic--wa">' + bic('whatsapp') + '</span><span>واتساب</span></a>' +
        '</div>');
      var kids = Array.prototype.slice.call(grid.children);
      var brandCol = kids[0];
      kids.forEach(function (k) { if (k !== brandCol && /s-contacts|salla-contacts/i.test(k.outerHTML.slice(0, 400)) ) k.classList.add('oc-hidden'); });
      $$('salla-contacts', grid).forEach(function (x) { var p = x.closest('.container.grid > *') || x; p.classList.add('oc-hidden'); });
      var apps = $('salla-apps-icons', grid); if (apps && !apps.textContent.trim() && !$('img,a', apps)) apps.classList.add('oc-hidden');
      var policies = kids.filter(function (k) { return $('salla-menu', k); })[0];
      if (policies) { var ph = $('h3', policies); if (ph) ph.textContent = 'روابط مهمة'; }
      grid.insertBefore(storeCol, policies || brandCol.nextSibling);
      grid.insertBefore(pagesCol, storeCol);
      grid.appendChild(contactCol);
      if (!$('.oc-social', brandCol)) brandCol.appendChild(h('<div class="oc-social">' + SOCIAL.map(function (x) { return '<a href="' + x[2] + '" aria-label="' + x[1] + '" rel="noopener">' + bic(x[0]) + '</a>'; }).join('') + '</div>'));
    }
    // credit line
    var credit = function () {
      var c = $('.copyright-text', f);
      if (!c || c.dataset.oc) return;
      c.dataset.oc = '1';
      c.innerHTML = '<p>صنع بإتقان بواسطة <a class="oc-credit" href="https://yasforcode.com/" target="_blank" rel="noopener">Yasforcode</a></p>';
    };
    credit(); setTimeout(credit, 1500); setTimeout(credit, 4000);
    var pays = $('salla-payments', f);
    if (pays && !$('li', pays)) {
      pays.style.display = 'none';
      pays.parentNode.insertBefore(h('<div class="oc-pay" aria-label="طرق الدفع">' + PAY.map(function (p) { return '<img src="' + IMG + 'pay/' + p + '.svg" alt="' + p + '" loading="lazy">'; }).join('') + '</div>'), pays);
    }
  }

  /* ---------- home assembly (same order as the reference) ---------- */
  function buildHome() {
    if (!document.body.classList.contains('index')) return;
    var main = $('#main-content');
    if (!main || main.dataset.oc) return;
    main.dataset.oc = '1';
    var latest = $('.s-block--latest-products', main);
    if (latest) latest.classList.add('oc-hidden');
    var anchor = latest || main.firstChild;
    [heroSection(), finderSection(), kindsSection(), featuredSection(), bannersSection(), latestSection(), modelsSection(), dealsSection(), makesSection(), aboutSection(), flashSection(), reviewsSection(), logosSection(), articlesSection()]
      .forEach(function (el) { if (el) main.insertBefore(el, anchor); });
    var foot = $('footer.store-footer');
    if (foot && !$('.oc-sub')) foot.parentNode.insertBefore(subscribeBand(), foot);
    tickAll();
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -60px 0px' });
      $$('.oc-sec', main).forEach(function (el) { el.classList.add('oc-reveal'); io.observe(el); });
    }
    if (location.hash && /^#oc-/.test(location.hash)) { var t2 = $(location.hash); if (t2) setTimeout(function () { t2.scrollIntoView({ behavior: 'smooth' }); }, 300); }
  }


  /* ================= inner pages ================= */
  var TREE = __TREE__;
  function bodyIs(c) { return document.body.classList.contains(c); }
  function crumbs() { return $$('#main-content .breadcrumbs .s-breadcrumb-item').map(function (li) { var a = $('a', li); return [li.textContent.trim(), a ? a.getAttribute('href') : null]; }).filter(function (x) { return x[0]; }); }

  /* page banner like the reference: dark band with the page title and the trail */
  function pageBanner() {
    if (bodyIs('index') || $('.oc-pbanner')) return;
    var main = $('#main-content'); if (!main) return;
    var cr = crumbs(), title = '';
    var h1 = $('#page-main-title');
    if (bodyIs('product-index') && h1) title = (h1.childNodes[0] && h1.childNodes[0].textContent || '').replace(/[-–]\s*$/, '').trim();
    else if (bodyIs('product-single')) title = cr.length > 1 ? cr[cr.length - 2][0] : 'المنتجات';
    else if (/\/cart(\/|$)/.test(location.pathname)) title = 'سلة المشتريات';
    else title = cr.length ? cr[cr.length - 1][0] : (document.title.split('|')[0] || '').trim();
    if (!title) title = (document.title.split('|')[0] || '').trim();
    var trail = cr.map(function (c, i) { return (i ? '<i>' + ic('left') + '</i>' : '') + (c[1] && i < cr.length - 1 ? '<a href="' + c[1] + '">' + esc(c[0]) + '</a>' : '<span>' + esc(c[0]) + '</span>'); }).join('');
    var b = h('<section class="oc-pbanner" style="background-image:linear-gradient(rgba(12,13,16,.78),rgba(12,13,16,.86)),url(' + IMG + 'ban_parts.webp)"><div class="oc-container"><h1>' + esc(title) + '</h1>' + (trail ? '<nav class="oc-trail" aria-label="مسار الصفحة">' + trail + '</nav>' : '') + '</div></section>');
    main.insertBefore(b, main.firstChild);
    document.body.classList.add('oc-has-banner');
    if (!trail) {
      var fill = function () {
        if ($('.oc-trail', b)) return;
        var c2 = crumbs(); if (!c2.length) return;
        var t2 = c2.map(function (c, i) { return (i ? '<i>' + ic('left') + '</i>' : '') + (c[1] && i < c2.length - 1 ? '<a href="' + c[1] + '">' + esc(c[0]) + '</a>' : '<span>' + esc(c[0]) + '</span>'); }).join('');
        $('.oc-container', b).appendChild(h('<nav class="oc-trail" aria-label="مسار الصفحة">' + t2 + '</nav>'));
        if (bodyIs('product-single') && c2.length > 1) $('h1', b).textContent = c2[c2.length - 2][0];
      };
      setTimeout(fill, 800); setTimeout(fill, 2000); setTimeout(fill, 4500);
    }
  }

  /* back to top */
  function toTop() {
    if ($('.oc-top')) return;
    var b = h('<button type="button" class="oc-top" aria-label="العودة لأعلى الصفحة">' + ic('up') + '</button>');
    document.body.appendChild(b);
    b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    var on = function () { b.classList.toggle('is-on', window.scrollY > 500); };
    window.addEventListener('scroll', on, { passive: true }); on();
  }

  /* category page: parts strip, sidebar, grid switcher */
  var VIEW_KEY = 'oc-view';
  function categoryPage() {
    if (!bodyIs('product-index') || $('.oc-cat-aside')) return;
    var main = $('#main-content'); var wrap = $('.main-content', main); if (!wrap) return;
    var row = wrap.parentNode;
    // parts strip under the banner
    var strip = h('<section class="oc-catstrip"><div class="oc-container"><div class="oc-kinds__row">' + KINDS.map(function (k) {
      return '<a class="oc-kind" href="/search?q=' + encodeURIComponent(k[1]) + '"><span class="oc-kind__img"><img loading="lazy" src="' + k[3] + '" alt=""></span><b>' + k[0] + '</b><small>' + num(k[2]) + ' منتج</small></a>';
    }).join('') + '</div></div></section>');
    var banner = $('.oc-pbanner', main);
    main.insertBefore(strip, banner ? banner.nextSibling : main.firstChild);
    // sidebar
    var here = decodeURIComponent(location.pathname);
    var link = function (n) { var on = here === decodeURIComponent(n.u) ? ' is-on' : ''; return '<a class="oc-acat' + on + '" href="' + n.u + '"><span>' + esc(n.n) + '</span><em>(' + num(n.c) + ')</em></a>'; };
    var inTree = function (t) { return decodeURIComponent(t.u) === here || t.s.some(inTree); };
    var anyOn = TREE.some(inTree);
    var cats = TREE.map(function (t, i) { var open = inTree(t) || (!anyOn && i === 0); return '<div class="oc-acat-group' + (open ? ' is-open' : '') + '">' + link(t) + '<div class="oc-acat-subs">' + t.s.map(link).join('') + '</div></div>'; }).join('');
    var models = MODELS.filter(function (m, i) { return MODELS.findIndex(function (x) { return x.parts === m.parts; }) === i; })
      .map(function (m) { return '<a class="oc-chip" href="' + m.parts + '">' + m.n + '</a>'; }).join('');
    var aside = h('<aside class="oc-cat-aside">' +
      '<form class="oc-abox oc-asearch" action="/search" method="get" role="search"><label class="oc-sr" for="oc-asq">ابحث في المتجر</label><input id="oc-asq" name="q" type="search" placeholder="ابحث هنا"><button type="submit" aria-label="بحث">' + ic('search') + '</button></form>' +
      '<div class="oc-abox"><h3>الأقسام</h3>' + cats + '</div>' +
      '<div class="oc-abox"><h3>تسوق حسب الموديل</h3><div class="oc-chips">' + models + '</div></div>' +
      '<a class="oc-apromo" href="/#oc-deals" style="background-image:url(' + IMG + 'deals_tall.webp)"><b>عروض حصرية</b><small><em>وفر ١٥٪</em> على مختارات من القطع</small><span>تسوق الآن</span></a>' +
      '</aside>');
    row.insertBefore(aside, row.firstChild);
    row.classList.add('oc-cat-row');
    // toolbar: count and view switcher
    var head = wrap.firstElementChild, h1 = $('#page-main-title', wrap);
    if (h1) {
      h1.classList.add('oc-count');
      var strip1 = function () { var t = h1.firstChild; if (t && t.nodeType === 3 && /-/.test(t.textContent)) t.textContent = ''; };
      strip1();
      try { new MutationObserver(strip1).observe(h1, { childList: true, characterData: true, subtree: true }); } catch (e) {}
    }
    var views = [[2, 'عمودين'], [3, 'ثلاثة أعمدة'], [4, 'أربعة أعمدة'], [1, 'قائمة']];
    var cur = 3; try { cur = +localStorage.getItem(VIEW_KEY) || 3; } catch (e) {}
    var sw = h('<div class="oc-views" role="group" aria-label="طريقة العرض">' + views.map(function (v) {
      return '<button type="button" data-v="' + v[0] + '" aria-label="' + v[1] + '"><i class="oc-vic oc-vic--' + v[0] + '"></i></button>';
    }).join('') + '</div>');
    var tools = head && head.lastElementChild; if (tools) tools.insertBefore(sw, tools.firstChild);
    var list = $('salla-products-list', wrap);
    var apply = function (v) {
      cur = v; if (list) list.setAttribute('data-oc-view', v);
      $$('button', sw).forEach(function (b) { b.classList.toggle('is-on', +b.dataset.v === v); });
      try { localStorage.setItem(VIEW_KEY, v); } catch (e) {}
    };
    sw.addEventListener('click', function (e) { var b = e.target.closest('button[data-v]'); if (b) apply(+b.dataset.v); });
    apply(cur);
  }


  /* product page in the reference layout */
  var RETURNS_URL = '/%D8%B3%D9%8A%D8%A7%D8%B3%D8%A9-%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%A8%D8%AF%D8%A7%D9%84-%D9%88%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B1%D8%AC%D8%A7%D8%B9/page-2003817800';
  function productPage() {
    if (!bodyIs('product-single') || $('.oc-pinfo')) return;
    var box = $('[id^="product-"].flex', $('#main-content')); if (!box) return;
    var pid = (box.id.match(/\d+/) || [])[0];
    var info = $('.part-main-content', box), side = $('.part-sidebar', box);
    box.classList.add('oc-pbox');
    // thumbnails beside the main image
    var slider = side && $('salla-slider', side);
    var buildThumbs = function () {
      if (!slider || $('.oc-thumbs', side)) return;
      var imgs = $$('.swiper-slide img', slider); if (imgs.length < 2) return;
      var th = h('<div class="oc-thumbs"><button type="button" class="oc-thumbs__nav" data-d="-1" aria-label="الصورة السابقة">' + ic('up') + '</button><div class="oc-thumbs__list">' +
        imgs.map(function (im, i) { return '<button type="button" data-i="' + i + '" class="' + (i ? '' : 'is-on') + '" aria-label="صورة ' + (i + 1) + '"><img src="' + esc(im.currentSrc || im.src || im.dataset.src) + '" alt=""></button>'; }).join('') +
        '</div><button type="button" class="oc-thumbs__nav oc-thumbs__nav--down" data-d="1" aria-label="الصورة التالية">' + ic('up') + '</button></div>');
      side.insertBefore(th, side.firstChild); side.classList.add('oc-has-thumbs');
      var sw = function () { var el = $('.swiper', slider); return el && el.swiper; };
      var mark = function (i) { $$('.oc-thumbs__list button', th).forEach(function (b, j) { b.classList.toggle('is-on', j === i); }); };
      th.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return; var s1 = sw(); if (!s1) return;
        if (b.dataset.i != null) s1.slideTo(+b.dataset.i); else s1.slideTo(Math.max(0, Math.min(imgs.length - 1, s1.activeIndex + (+b.dataset.d))));
      });
      var s0 = sw(); if (s0 && s0.on) s0.on('slideChange', function () { mark(s0.activeIndex); });
    };
    buildThumbs(); setTimeout(buildThumbs, 1500); setTimeout(buildThumbs, 4000);
    // quick facts under the title
    var h1 = $('h1', info);
    var facts = h('<div class="oc-pinfo"><span class="oc-pfact oc-pfact--ship">' + ic('truck') + 'نجهز طلبك خلال يوم إلى يومين</span><span class="oc-pfact oc-pstock" hidden>متوفر</span><span class="oc-pdisc" hidden></span></div>');
    if (h1) h1.parentNode.insertBefore(facts, h1.nextSibling);
    api('products/' + pid + '/details').then(function (r) {
      var p = r && r.data; if (!p) return;
      var st = $('.oc-pstock', facts); st.hidden = false;
      if (p.is_out_of_stock || p.is_available === false) { st.textContent = 'نفدت الكمية'; st.classList.add('is-out'); }
      if (p.is_on_sale && p.regular_price && p.sale_price) {
        var reg = +(p.regular_price.amount || p.regular_price), sale = +(p.sale_price.amount || p.sale_price);
        if (reg > sale) { var d = $('.oc-pdisc', facts); d.hidden = false; d.textContent = 'خصم ' + num(Math.round((1 - sale / reg) * 100)) + '٪'; }
      }
    }).catch(function () {});
    // buy now next to add to cart
    var bar = $('.sticky-product-bar', box), quick = $('salla-quick-order', box);
    if (bar && quick && !bar.contains(quick)) { bar.appendChild(quick); bar.classList.add('oc-buyrow'); }
    // trust lines and returns link
    var form = $('form.product-form', info);
    if (form && !$('.oc-ptrust', info)) {
      form.parentNode.insertBefore(h('<ul class="oc-ptrust">' +
        '<li>' + ic('truck') + '<span>توصيل سريع داخل جدة وشحن لكل مناطق المملكة</span></li>' +
        '<li>' + ic('check') + '<span>نتأكد من مطابقة القطعة لموديل سيارتك قبل الشحن</span></li>' +
        '<li>' + ic('ret') + '<span>استبدال واسترجاع حسب <a href="' + RETURNS_URL + '">سياسة المتجر</a></span></li>' +
        '<li>' + ic('card') + '<span>قسّطها مع تابي وتمارا</span></li></ul>'), form.nextSibling);
    }
    // description and reviews tabs under the product
    var desc = $('.product__description', info), comments = $('salla-comments', $('#main-content'));
    if (desc && !$('.oc-ptabs')) {
      var full = desc.cloneNode(true);
      var tabs = h('<section class="oc-ptabs"><div class="oc-container"><div class="oc-ptabs__nav" role="tablist"><button type="button" role="tab" class="is-on" data-t="d">الوصف</button><button type="button" role="tab" data-t="r">التقييمات</button></div><div class="oc-ptabs__body"><div data-p="d"></div><div data-p="r" hidden></div></div></div></section>');
      $('[data-p=d]', tabs).appendChild(full);
      if (comments) $('[data-p=r]', tabs).appendChild(comments); else $('[data-p=r]', tabs).innerHTML = '<p class="oc-empty">ما فيه تقييمات لهذا المنتج حاليا</p>';
      var after = box.closest('.s-blocks-wrapper, .container'); var anchor = after && after.parentNode === $('#main-content') ? after : box.parentNode;
      anchor.parentNode.insertBefore(tabs, anchor.nextSibling);
      tabs.addEventListener('click', function (e) {
        var b = e.target.closest('[data-t]'); if (!b) return;
        $$('[data-t]', tabs).forEach(function (x) { x.classList.toggle('is-on', x === b); });
        $$('[data-p]', tabs).forEach(function (x) { x.hidden = x.dataset.p !== b.dataset.t; });
      });
      // keep a short line at the top
      var first = $('p', desc); var txt = (first ? first.textContent : desc.textContent).trim();
      desc.innerHTML = '<p>' + esc(txt.length > 160 ? txt.slice(0, 160) + '…' : txt) + '</p>';
      desc.classList.add('oc-pshort');
    }
    // sticky add to cart bar when the main button scrolls away
    var addBtn = $('salla-add-product-button', box);
    if (addBtn && !$('.oc-pbar')) {
      var im0 = $('.swiper-slide img', box), price = $$('.part-price h2, .part-price h4', info).filter(function (x) { return x.offsetParent; })[0];
      var pbar = h('<div class="oc-pbar" aria-hidden="true"><div class="oc-container oc-pbar__in"><div class="oc-pbar__p"><img src="' + esc(im0 ? (im0.currentSrc || im0.src) : '') + '" alt=""><div><b>' + esc(h1 ? h1.textContent.trim() : '') + '</b><span class="oc-pbar__price">' + (price ? price.innerHTML : '') + '</span></div></div><button type="button" class="oc-btn oc-btn--primary">' + ic('bag') + 'أضف للسلة</button></div></div>');
      document.body.appendChild(pbar);
      $('button', pbar).addEventListener('click', function () { var b = $('button', addBtn); if (b) b.click(); });
      var onS = function () { var r = addBtn.getBoundingClientRect(); var show = r.bottom < 0; pbar.classList.toggle('is-on', show); pbar.setAttribute('aria-hidden', show ? 'false' : 'true'); };
      window.addEventListener('scroll', onS, { passive: true });
    }
  }


  /* ================= store, about, contact and faq pages ================= */
  function pageId() { var m = /\/page-(\d+)/.exec(location.pathname); return m ? m[1] : null; }
  function pageShell() {
    var c = $('#main-content .content--single-page'); if (!c) return null;
    c.classList.add('oc-hidden');
    var host = h('<div class="oc-pagebody"></div>');
    var wrap = c.closest('.container') || c; wrap.parentNode.insertBefore(host, wrap.nextSibling);
    return host;
  }
  var CARIMG = { 'لاندكروزر': 'car_lc.webp', 'برادو': 'car_prado.webp', 'هايلوكس وفورشنر': 'car_hilux.webp', 'شاص وربع': 'car_shas.webp', 'اف جي كروزر': 'car_fj.webp', 'كامري': 'car_camry.webp', 'كورولا ويارس': 'car_corolla.webp' };
  function storePage(host) {
    var cats = []; TREE.forEach(function (t) { t.s.forEach(function (x) { cats.push(x); }); });
    host.appendChild(h('<section class="oc-sec oc-storecats"><div class="oc-container">' +
      '<div class="oc-storetop">' + TREE.map(function (t) { return '<a class="oc-chip" href="' + t.u + '">' + esc(t.n) + ' <em>(' + num(t.c) + ')</em></a>'; }).join('') + '</div>' +
      '<div class="oc-storegrid">' + cats.map(function (x) {
        var car = CARIMG[x.n];
        return '<a class="oc-scat" href="' + x.u + '"' + (car ? '' : ' data-cid="' + (catId(x.u) || '') + '"') + '><span class="oc-scat__img">' + (car ? '<img loading="lazy" src="' + IMG + car + '" alt="">' : '<span class="oc-skel"></span>') + '</span><b>' + esc(x.n) + '</b><small>' + num(x.c) + ' منتج</small></a>';
      }).join('') + '</div></div></section>'));
    $$('.oc-scat', host).forEach(function (a) {
      var id = a.dataset.cid; if (!id) return;
      api('products?source=categories&source_value[]=' + id + '&per_page=1').then(function (r) {
        var p = r && r.data && r.data[0]; var u = p && p.image && p.image.url;
        $('.oc-scat__img', a).innerHTML = u ? '<img loading="lazy" src="' + esc(u) + '" alt="">' : '';
      }).catch(function () {});
    });
  }
  var WHY = [['check', 'نتأكد من المطابقة', 'نراجع موديل سيارتك وسنة الصنع قبل ما نشحن أي قطعة'], ['gear', 'أصلي وبديل', 'قطع أصلية وبديلة لأشهر موديلات تويوتا بأسعار منافسة'], ['truck', 'من جدة لكل المملكة', 'توصيل سريع داخل جدة وشحن لكل مناطق المملكة'], ['headset', 'معك قبل وبعد الطلب', 'نرد على استفساراتك ونساعدك تختار القطعة الصح']];
  function aboutPage(host) {
    host.appendChild(aboutSection());
    host.appendChild(h('<section class="oc-sec oc-why"><div class="oc-container">' + head('ليش أوبرا كار') + '<div class="oc-why__row">' +
      WHY.map(function (w) { return '<div class="oc-whycard"><span class="oc-whycard__ic">' + ic(w[0]) + '</span><b>' + w[1] + '</b><p>' + w[2] + '</p></div>'; }).join('') + '</div></div></section>'));
    host.appendChild(reviewsSection());
    host.appendChild(modelsSection());
  }
  var HOURS = [['كل أيام الأسبوع', 'مفتوح دائما'], ['الطلبات', 'تستقبل على مدار الساعة'], ['الرد على الاستفسارات', 'طوال أيام الأسبوع']];
  function contactPage(host) {
    var s = h('<section class="oc-sec oc-contactp"><div class="oc-container"><div class="oc-contact__grid">' +
      '<div class="oc-cbox"><h2>أوقات العمل</h2><p class="oc-cbox__sub">نخدمك طوال أيام الأسبوع</p><div class="oc-hours">' + HOURS.map(function (x) { return '<div><b>' + x[0] + '</b><small>' + x[1] + '</small></div>'; }).join('') + '</div>' +
      '<h2>تواصل معنا</h2><p class="oc-cbox__sub">اختر الطريقة اللي تناسبك</p>' +
      '<a class="oc-ccard" href="tel:' + CONTACT.phone + '"><span>' + ic('phone') + '</span><div><b>رقم الاتصال</b><small dir="ltr">' + CONTACT.phone + '</small></div></a>' +
      '<a class="oc-ccard" href="https://wa.me/' + CONTACT.whatsapp + '" target="_blank" rel="noopener"><span class="is-wa">' + bic('whatsapp') + '</span><div><b>واتساب</b><small>راسلنا بموديل سيارتك ونساعدك</small></div></a>' +
      '<div class="oc-ccard"><span>' + ic('pin') + '</span><div><b>موقع المتجر</b><small>جدة المملكة العربية السعودية</small></div></div>' +
      '</div>' +
      '<form class="oc-cbox oc-cform"><h2>أرسل لنا رسالة</h2><p class="oc-cbox__sub">تصلنا رسالتك على واتساب ونرد عليك بسرعة</p>' +
      '<label><span class="oc-sr">اسمك</span><input name="n" required placeholder="اسمك"></label>' +
      '<label><span class="oc-sr">رقم جوالك</span><input name="p" inputmode="tel" placeholder="رقم جوالك"></label>' +
      '<label><span class="oc-sr">موديل سيارتك</span><input name="c" placeholder="موديل سيارتك وسنة الصنع"></label>' +
      '<label><span class="oc-sr">رسالتك</span><textarea name="m" rows="6" required placeholder="اكتب رسالتك"></textarea></label>' +
      '<button type="submit" class="oc-btn oc-btn--primary">أرسل الرسالة</button></form>' +
      '</div><div class="oc-map"><iframe title="موقع أوبرا كار في جدة" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=Jeddah&z=11&output=embed"></iframe></div></div></section>');
    $('form', s).addEventListener('submit', function (e) {
      e.preventDefault(); var f = e.target;
      var t = 'الاسم ' + f.n.value + '\nالجوال ' + f.p.value + '\nالسيارة ' + f.c.value + '\n' + f.m.value;
      window.open('https://wa.me/' + CONTACT.whatsapp + '?text=' + encodeURIComponent(t), '_blank', 'noopener');
    });
    host.appendChild(s);
  }
  var FAQ = [
    ['الطلب والشحن', [
      ['هل تشحنون لكل مناطق المملكة', 'نعم نشحن لكل مدن ومناطق المملكة وعندنا توصيل سريع داخل جدة'],
      ['كم ياخذ الطلب لين يوصل', 'نجهز الطلب خلال يوم إلى يومين عمل ويوصل خلال يومين إلى خمسة أيام عمل حسب المدينة'],
      ['متى يكون الشحن مجاني', 'الشحن مجاني للطلبات فوق ٦٠٠ ريال ورسوم الطلبات الأقل تظهر لك قبل الدفع'],
      ['كيف أتابع شحنتي', 'تصلك رسالة برقم الشحنة بعد ما نشحن طلبك وإذا تأخرت تواصل معنا ونتابعها لك']]],
    ['القطع والمطابقة', [
      ['كيف أعرف إن القطعة تناسب سيارتي', 'استخدم اختر سيارتك في الصفحة الرئيسية أو أرسل لنا موديل سيارتك وسنة الصنع ونتأكد لك قبل الشحن'],
      ['وش الفرق بين القطع الأصلية والبديلة', 'الأصلية من الشركة المصنعة والبديلة من مصانع أخرى بسعر أقل وكل منتج مكتوب نوعه في وصفه'],
      ['هل الخطوط حسب موديل السيارة', 'نعم كل خط مكتوب عليه الموديل وسنوات الصنع المناسبة له']]],
    ['الدفع والتقسيط', [
      ['وش طرق الدفع المتاحة', 'مدى وأبل باي وفيزا وماستركارد وتابي وتمارا'],
      ['هل أقدر أقسط طلبي', 'نعم تقدر تقسط مع تابي أو تمارا من صفحة إتمام الطلب']]],
    ['الاستبدال والاسترجاع', [
      ['كم مدة الاستبدال والاسترجاع', 'تقدر تطلب الاستبدال أو الاسترجاع خلال سبعة أيام من استلام الطلب'],
      ['وش شروط القبول', 'تكون القطعة بحالتها الأصلية وغير مركبة وفي تغليفها مع ملحقاتها والخطوط لا تسترجع بعد فصلها أو تركيبها'],
      ['متى يرجع المبلغ', 'يرجع المبلغ بنفس طريقة الدفع خلال سبعة إلى أربعة عشر يوم عمل من استلامنا القطعة وفحصها']]]
  ];
  function faqPage(host) {
    var s = h('<section class="oc-sec oc-faq"><div class="oc-container">' + FAQ.map(function (g) {
      return '<div class="oc-faq__group"><h2>' + g[0] + '</h2>' + g[1].map(function (q) {
        return '<details class="oc-faq__item"><summary>' + q[0] + '<i>' + ic('plus') + '</i></summary><p>' + q[1] + '</p></details>';
      }).join('') + '</div>';
    }).join('') + '<div class="oc-faq__more"><b>ما لقيت إجابتك</b><a class="oc-btn oc-btn--primary" href="' + CONTACT_URL + '">تواصل معنا</a></div></div></section>');
    host.appendChild(s);
  }
  function customPages() {
    var id = pageId(); if (!id || $('.oc-pagebody')) return;
    var map = { '80660524': storePage, '1058176407': aboutPage, '1028738080': contactPage, '1493469730': faqPage };
    if (!map[id]) { document.body.classList.add('oc-textpage'); return; }
    var host = pageShell(); if (!host) return;
    map[id](host);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -60px 0px' });
      $$('.oc-sec', host).forEach(function (el) { el.classList.add('oc-reveal'); io.observe(el); });
    }
  }

  /* cart drawer opened after adding to cart */
  function cartDrawer() {
    if ($('.oc-drawer')) return;
    var d = h('<div class="oc-drawer" aria-hidden="true"><div class="oc-drawer__bg" data-close></div>' +
      '<aside class="oc-drawer__panel" role="dialog" aria-modal="true" aria-label="سلة المشتريات"><div class="oc-drawer__head"><b>سلة المشتريات</b><button type="button" data-close aria-label="إغلاق">' + ic('x') + '</button></div>' +
      '<div class="oc-drawer__items"></div>' +
      '<div class="oc-drawer__foot"><div class="oc-ship oc-ship--mini"><div class="oc-ship__txt">' + ic('truck') + '<span></span></div><div class="oc-ship__track"><i></i></div></div>' +
      '<div class="oc-drawer__sum"><span>المجموع</span><b></b></div>' +
      '<a class="oc-btn oc-btn--dark" href="/cart">عرض السلة</a><a class="oc-btn oc-btn--primary" href="/cart" data-checkout>إتمام الطلب</a></div></aside></div>');
    document.body.appendChild(d);
    var close = function () { d.classList.remove('is-open'); d.setAttribute('aria-hidden', 'true'); };
    d.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    $('[data-checkout]', d).addEventListener('click', function (e) {
      try { if (salla.cart && salla.cart.api && salla.cart.api.submit) { e.preventDefault(); salla.cart.api.submit(); } } catch (x) {}
    });
    function render(c) {
      var items = (c && (c.items || c.products)) || [];
      $('.oc-drawer__items', d).innerHTML = items.length ? items.map(function (it) {
        var img = it.product_image || (it.image && it.image.url) || it.image || '';
        var price = it.price && it.price.amount != null ? it.price.amount : (it.total && it.total.amount != null ? it.total.amount : it.price);
        return '<div class="oc-ditem"><img src="' + esc(img) + '" alt=""><div><a href="' + esc(it.url || '#') + '">' + esc(it.product_name || it.name) + '</a><small>' + num(it.quantity) + ' × ' + num(price) + ' ' + SAR + '</small></div></div>';
      }).join('') : '<p class="oc-empty">سلتك فاضية</p>';
      var total = +(c && (c.sub_total || c.total)) || 0;
      $('.oc-drawer__sum b', d).innerHTML = num(total) + ' ' + SAR;
      var left = Math.max(0, FREE_SHIP - total);
      $('.oc-ship__track i', d).style.width = Math.min(100, total / FREE_SHIP * 100) + '%';
      $('.oc-ship__txt span', d).innerHTML = left > 0 ? 'باقي لك <b>' + num(left) + ' ' + SAR + '</b> وتحصل على <b>شحن مجاني</b>' : 'مبروك طلبك صار عليه <b>شحن مجاني</b>';
    }
    window.ocOpenCart = function () {
      d.classList.add('is-open'); d.setAttribute('aria-hidden', 'false');
      try { salla.cart.api.details().then(function (r) { var c = r && r.data && (r.data.cart || r.data); render(c); }).catch(function () { render(null); }); } catch (e) { render(null); }
    };
    try { salla.event.on('cart::item.added', function () { window.ocOpenCart(); }); } catch (e) {}
  }

  /* ---------- cart: free shipping progress ---------- */
  function cartBar() {
    if (!/\/cart(\/|$)/.test(location.pathname) || $('.oc-ship')) return;
    var main = $('#main-content'); if (!main) return;
    var bar = h('<div class="oc-container"><div class="oc-ship"><div class="oc-ship__txt">' + ic('truck') + '<span></span></div><div class="oc-ship__track"><i></i></div></div></div>');
    main.insertBefore(bar, main.firstChild);
    function update(total) {
      var left = Math.max(0, FREE_SHIP - total), pct = Math.min(100, total / FREE_SHIP * 100);
      $('.oc-ship__track i', bar).style.width = pct + '%';
      $('.oc-ship__txt span', bar).innerHTML = left > 0 ? 'باقي لك <b>' + num(left) + ' ' + SAR + '</b> وتحصل على <b>شحن مجاني</b>' : 'مبروك طلبك صار عليه <b>شحن مجاني</b>';
      bar.querySelector('.oc-ship').classList.toggle('is-done', left <= 0);
    }
    function read() {
      update(0);
      try {
        if (window.salla && salla.cart && salla.cart.api && salla.cart.api.details) {
          return salla.cart.api.details().then(function (r) { var c = r && r.data && (r.data.cart || r.data); update(+(c && (c.sub_total || c.total)) || 0); }).catch(function () {});
        }
      } catch (e) {}
      update(0);
    }
    read();
    try { salla.event.on('cart::updated', function (d) { var c = d && (d.cart || d.data || d); update(+(c && (c.sub_total || c.total)) || 0); }); } catch (e) {}
  }

  function init() {
    buildHeader();
    buildBottomBar();
    buildHome();
    featuresBar();
    footerExtras();
    cartBar();
    pageBanner();
    categoryPage();
    productPage();
    customPages();
    toTop();
    cartDrawer();
    document.body.classList.add('oc-ready');
  }
  ready(function () {
    init();
    // Salla web components hydrate late; retry header pieces once
    setTimeout(function () { addNavExtras(); addMegaMenu(); }, 1200); setTimeout(function () { addNavExtras(); addMegaMenu(); }, 3500);
  });
})();
