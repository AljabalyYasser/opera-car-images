/* Opera Car storefront layer for Salla Bart theme */
(function () {
  if (window.__OC_LOADED) return;
  window.__OC_LOADED = true;

  var IMG = 'https://cdn.jsdelivr.net/gh/AljabalyYasser/opera-car-images@f069424/theme/img/';
  var API = 'https://api.salla.dev/store/v1/';
  var SID = '1590934287';
  var FREE_SHIP = 600;
  var C = {"قطع الغيار والاكسسوارات": "https://operacar.store/قطع-الغيار-والاكسسوارات/c1104165103", "لاندكروزر": "https://operacar.store/لاندكروزر/c1838835433", "برادو": "https://operacar.store/برادو/c1529529332", "هايلوكس وفورشنر": "https://operacar.store/هايلوكس-وفورشنر/c156083435", "شاص وربع": "https://operacar.store/شاص-وربع/c1063290346", "اف جي كروزر": "https://operacar.store/اف-جي-كروزر/c888660725", "كامري": "https://operacar.store/كامري/c579227632", "كورولا ويارس": "https://operacar.store/كورولا-ويارس/c1354309879", "اكسسوارات تويوتا عامة": "https://operacar.store/اكسسوارات-تويوتا-عامة/c2086891249", "الخطوط": "https://operacar.store/الخطوط/c997204374", "خطوط لاندكروزر": "https://operacar.store/خطوط-لاندكروزر/c358432919", "لاندكروزر حتى 2007": "https://operacar.store/لاندكروزر-حتى-2007/c822120081", "لاندكروزر 2008 إلى 2015": "https://operacar.store/لاندكروزر-2008-إلى-2015/c1731882896", "لاندكروزر 2016 إلى 2025": "https://operacar.store/لاندكروزر-2016-إلى-2025/c49130898", "خطوط برادو": "https://operacar.store/خطوط-برادو/c1247357342", "خطوط هايلوكس": "https://operacar.store/خطوط-هايلوكس/c2021395101", "هايلوكس حتى 2004": "https://operacar.store/هايلوكس-حتى-2004/c2120531171", "هايلوكس 2005 إلى 2015": "https://operacar.store/هايلوكس-2005-إلى-2015/c1212275692", "هايلوكس 2016 إلى 2025": "https://operacar.store/هايلوكس-2016-إلى-2025/c439286509", "خطوط شاص": "https://operacar.store/خطوط-شاص/c781708188", "شاص حتى 2006": "https://operacar.store/شاص-حتى-2006/c13918176", "شاص 2007 إلى 2015": "https://operacar.store/شاص-2007-إلى-2015/c1387364065", "شاص 2016 إلى 2025": "https://operacar.store/شاص-2016-إلى-2025/c923742439", "خطوط ربع": "https://operacar.store/خطوط-ربع/c1556794515", "ربع حتى 2006": "https://operacar.store/ربع-حتى-2006/c964219876", "ربع 2007 إلى 2015": "https://operacar.store/ربع-2007-إلى-2015/c1871951003", "ربع 2016 إلى 2025": "https://operacar.store/ربع-2016-إلى-2025/c189133541"};

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
      ul.appendChild(h('<li class="oc-nav-extra root-level"><a href="/#oc-finder">' + ic('car') + 'اختر سيارتك</a></li>'));
      ul.appendChild(h('<li class="oc-nav-extra oc-nav-hot root-level"><a href="/#oc-deals">' + ic('fire') + 'العروض</a></li>'));
    }

  }

  function buildHeader() {
    var header = $('#part-store-header');
    if (!header || header.dataset.oc) return;
    header.dataset.oc = '1';
    var inner = $('.inner', header) || header;

    var bar = h('<div class="oc-topbar"><div class="oc-container oc-topbar__in">' +
      '<div class="oc-topbar__msgs">' + TOPBAR.map(function (t, i) { return '<span class="' + (i === 0 ? 'is-on' : '') + '">' + ic(['gift', 'pin', 'card', 'truck'][i]) + t + '</span>'; }).join('') + '</div>' +
      '<div class="oc-topbar__side"><a href="' + C['الخطوط'] + '">الخطوط</a><a href="' + C['قطع الغيار والاكسسوارات'] + '">قطع الغيار</a><a href="/#oc-deals">العروض</a></div>' +
      '</div></div>');
    inner.insertBefore(bar, inner.firstChild);
    var msgs = $$('.oc-topbar__msgs span', bar), mi = 0;
    setInterval(function () { msgs[mi].classList.remove('is-on'); mi = (mi + 1) % msgs.length; msgs[mi].classList.add('is-on'); }, 3800);

    // mode toggle (desktop)
    var userBtn = $$('button.header-btn', header)[0];
    if (userBtn && userBtn.parentNode) userBtn.parentNode.insertBefore(modeBtn('oc-mode--desk'), userBtn);
    // mode toggle (mobile)
    var menuLink = $('a[href="#mobile-menu"]', header);
    if (menuLink && menuLink.parentNode) menuLink.parentNode.insertBefore(modeBtn('oc-mode--mob'), menuLink);

    addNavExtras();

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
  function card(p) {
    var pr = priceOf(p);
    var img = (p.image && p.image.url) || p.thumbnail || '';
    return '<div class="oc-slide-item"><article class="oc-card" data-id="' + p.id + '">' +
      '<div class="oc-card__media">' +
      '<a class="oc-card__img" href="' + esc(p.url) + '"><img loading="lazy" src="' + esc(img) + '" alt="' + esc(p.name) + '"></a>' +
      (pr.off ? '<span class="oc-badge">-' + num(pr.off) + '٪</span>' : '') +
      '<div class="oc-card__tools">' +
      '<button type="button" class="oc-tool oc-wish" data-id="' + p.id + '" aria-label="أضف للمفضلة">' + ic('heart') + '<span>أضف للمفضلة</span></button>' +
      '<a class="oc-tool" href="' + esc(p.url) + '" aria-label="عرض المنتج">' + ic('eye') + '<span>عرض المنتج</span></a>' +
      '</div></div>' +
      '<div class="oc-card__body">' +
      '<span class="oc-card__cat">' + esc(catName(p)) + '</span>' +
      '<a class="oc-card__title" href="' + esc(p.url) + '">' + esc(p.name) + '</a>' +
      '<div class="oc-price"><b>' + num(pr.price) + ' ' + SAR + '</b>' + (pr.reg ? '<s>' + num(pr.reg) + ' ' + SAR + '</s>' : '') + '</div>' +
      '<div class="oc-card__foot">' +
      '<div class="oc-qty"><button type="button" data-q="1" aria-label="زيادة">' + ic('plus') + '</button><input type="text" inputmode="numeric" value="1" aria-label="الكمية"><button type="button" data-q="-1" aria-label="نقص">' + ic('minus') + '</button></div>' +
      '<button type="button" class="oc-cartbtn oc-add" data-id="' + p.id + '" aria-label="أضف للسلة">' + ic('bag') + '</button>' +
      '</div></div></article></div>';
  }
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
  function head(title, link, linkText) {
    return '<div class="oc-head"><h2>' + title + '</h2>' + (link ? '<a class="oc-more" href="' + link + '">' + (linkText || 'عرض الكل') + '</a>' : '') + '</div>';
  }
  function skeleton(n) { var s = ''; for (var i = 0; i < n; i++) s += '<div class="oc-slide-item"><div class="oc-skel"></div></div>'; return s; }

  /* ---------- 1 hero ---------- */
  var SLIDES = [
    { k: 'خطوط تويوتا بتصاميم حصرية', t: ['خطوط تعطي سيارتك', 'هوية جديدة'], p: 'تصاميم لاندكروزر وهايلوكس وشاص وربع حسب موديل سيارتك وسنة صنعها', img: 'hero_lc.webp', a: [['تسوق الخطوط', C['الخطوط']], ['اختر سيارتك', '#oc-finder']] },
    { k: 'قطع غيار واكسسوارات', t: ['كل ما تحتاجه سيارتك', 'في مكان واحد'], p: 'قطع أصلية وبديلة لأشهر موديلات تويوتا بأسعار منافسة', img: 'hero_parts.webp', a: [['تسوق القطع', C['قطع الغيار والاكسسوارات']], ['اختر سيارتك', '#oc-finder']] },
    { k: 'عروض أوبرا كار', t: ['عروض حصرية', 'لفترة محدودة'], p: 'خصومات على مختارات من القطع والإكسسوارات وشحن مجاني للطلبات فوق ٦٠٠&nbsp;ريال', img: 'hero_hilux.webp', a: [['شاهد العروض', '#oc-deals'], ['تسوق الخطوط', C['الخطوط']]] }
  ];
  var SERVICES = [
    ['truck', 'شحن سريع', 'لكل المملكة وتوصيل سريع داخل جدة'],
    ['gift', 'شحن مجاني', 'للطلبات فوق ٦٠٠&nbsp;ريال'],
    ['card', 'قسّطها', 'مع تابي وتمارا'],
    ['check', 'نتأكد من المطابقة', 'قبل الشحن لموديل سيارتك']
  ];
  function heroSection() {
    var s = h('<section class="oc-hero" aria-label="الواجهة">' +
      '<div class="oc-container oc-hero__in">' +
      '<div class="oc-hero__slides">' + SLIDES.map(function (sl, i) {
        return '<div class="oc-slide' + (i === 0 ? ' is-active' : '') + '">' +
          '<div class="oc-slide__text"><span class="oc-kicker">' + sl.k + '</span><h2><span class="oc-l">' + sl.t[0] + '</span><em class="oc-l">' + sl.t[1] + '</em></h2><p>' + sl.p + '</p>' +
          '<div class="oc-btns"><a class="oc-btn oc-btn--primary" href="' + sl.a[0][1] + '">' + sl.a[0][0] + '</a><a class="oc-btn oc-btn--ghost" href="' + sl.a[1][1] + '">' + sl.a[1][0] + '</a></div></div>' +
          '<div class="oc-slide__media"><img src="' + IMG + sl.img + '" alt="" ' + (i ? 'loading="lazy"' : 'fetchpriority="high"') + '></div>' +
          '</div>';
      }).join('') + '</div>' +
      '<div class="oc-hero__dots">' + SLIDES.map(function (_, i) { return '<button type="button" aria-label="شريحة ' + (i + 1) + '" class="' + (i === 0 ? 'is-on' : '') + '"></button>'; }).join('') + '</div>' +
      '</div>' +
      '<div class="oc-container"><div class="oc-services">' + SERVICES.map(function (x) {
        return '<div class="oc-service"><span class="oc-service__ic">' + ic(x[0]) + '</span><div><b>' + x[1] + '</b><small>' + x[2] + '</small></div></div>';
      }).join('') + '</div></div>' +
      '</section>');
    var slides = $$('.oc-slide', s), dots = $$('.oc-hero__dots button', s), cur = 0, timer;
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
      '<div class="oc-finder__res" hidden><div class="oc-head oc-head--sm"><h3></h3><a class="oc-more" href="#">عرض كل المنتجات</a></div>' +
      '<div class="oc-slider"><div class="oc-track"></div>' + arrows() + '</div></div>' +
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
  function kindsSection() {
    return h('<section class="oc-sec oc-kinds"><div class="oc-container">' + head('تسوق حسب القسم') +
      '<div class="oc-kinds__row">' + KINDS.map(function (k) {
        return '<a class="oc-kind" href="/search?q=' + encodeURIComponent(k[1]) + '"><span class="oc-kind__img"><img loading="lazy" src="' + k[3] + '" alt=""></span><b>' + k[0] + '</b><small>' + num(k[2]) + ' منتج</small></a>';
      }).join('') + '</div></div></section>');
  }

  /* ---------- 4 and 6 product rows with promo card ---------- */
  function productRow(opts) {
    var promo = '<a class="oc-promo" href="' + opts.promoLink + '" style="background-image:url(' + IMG + opts.promoImg + ')"><b>' + opts.promoTitle + '</b><small>' + opts.promoText + '</small><span class="oc-promo__btn">تسوق الآن</span></a>';
    var s = h('<section class="oc-sec oc-row' + (opts.end ? ' oc-row--end' : '') + '"' + (opts.id ? ' id="' + opts.id + '"' : '') + '><div class="oc-container">' + head(opts.title, opts.link, opts.linkText) +
      '<div class="oc-row__grid">' + promo + '<div class="oc-slider"><div class="oc-track">' + skeleton(4) + '</div>' + arrows() + '</div></div>' +
      '</div></section>');
    var track = $('.oc-track', s);
    slider(s);
    api(opts.query).then(function (r) {
      var list = (r && r.data) || [];
      if (opts.order) list.sort(function (a, b) { return opts.order.indexOf(+a.id) - opts.order.indexOf(+b.id); });
      track.innerHTML = list.map(card).join('');
    }).catch(function () { s.remove(); });
    return s;
  }
  function featuredSection() {
    return productRow({ title: 'الأكثر طلبا', link: C['قطع الغيار والاكسسوارات'], linkText: 'عرض كل المنتجات', promoImg: 'deals_tall.webp', promoTitle: 'عروض حصرية', promoText: '<em>وفر ١٥٪</em> على مختارات من القطع', promoLink: '#oc-deals',
      query: 'products?source=selected&' + FEATURED.map(function (id) { return 'source_value[]=' + id; }).join('&'), order: FEATURED });
  }
  function latestSection() {
    return productRow({ end: true, title: 'وصل حديثا', link: C['قطع الغيار والاكسسوارات'], linkText: 'عرض كل المنتجات', promoImg: 'promo2_tall.webp', promoTitle: 'خطوط الهايلوكس', promoText: '<em>تصاميم جديدة</em> لكل الموديلات', promoLink: C['خطوط هايلوكس'],
      query: 'products?source=latest&per_page=10' });
  }

  /* ---------- 5 banners ---------- */
  function bannersSection() {
    var B = [
      ['لاندكروزر هايلوكس شاص ربع', 'الخطوط', 'تبدأ من ١٤٩&nbsp;ريال', C['الخطوط'], 'ban_stripes.webp'],
      ['أصلية وبديلة', 'قطع الغيار', 'لأشهر موديلات تويوتا', C['قطع الغيار والاكسسوارات'], 'ban_parts.webp'],
      ['ديكورات ومسجلات وفرشات', 'الاكسسوارات', 'لمسات تفرق في سيارتك', C['اكسسوارات تويوتا عامة'], 'ban_acc.webp']
    ];
    return h('<section class="oc-sec oc-banners"><div class="oc-container"><div class="oc-banners__row">' + B.map(function (b) {
      return '<a class="oc-banner" href="' + b[3] + '"><span class="oc-banner__bg" style="background-image:url(' + IMG + b[4] + ')"></span><span class="oc-banner__txt"><span class="oc-banner__k">' + b[0] + '</span><b>' + b[1] + '</b><small>' + b[2] + '</small><span class="oc-banner__btn">تسوق الآن</span></span></a>';
    }).join('') + '</div></div></section>');
  }

  /* ---------- 7 deals with countdown ---------- */
  function endDate(v) {
    if (!v) return null;
    var d = typeof v === 'number' || /^\d+$/.test(String(v)) ? new Date(+v * (+v < 1e12 ? 1000 : 1)) : new Date(String(v).replace(' ', 'T'));
    return isNaN(d) || d < new Date() ? null : d;
  }
  function nextFriday() { var d = new Date(); var add = (5 - d.getDay() + 7) % 7 || 7; d.setDate(d.getDate() + add); d.setHours(23, 59, 59, 0); return d; }
  function dealCard(p, end) {
    var pr = priceOf(p);
    return '<div class="oc-slide-item"><article class="oc-deal" data-end="' + end.getTime() + '">' +
      '<a class="oc-deal__img" href="' + esc(p.url) + '"><img loading="lazy" src="' + esc(p.image && p.image.url) + '" alt="' + esc(p.name) + '"></a>' +
      (pr.off ? '<span class="oc-badge">-' + num(pr.off) + '٪</span>' : '') +
      '<div class="oc-deal__body"><span class="oc-card__cat">' + esc(catName(p)) + '</span>' +
      '<a class="oc-deal__title" href="' + esc(p.url) + '">' + esc(p.name) + '</a>' +
      '<div class="oc-price oc-price--lg"><b>' + num(pr.price) + ' ' + SAR + '</b>' + (pr.reg ? '<s>' + num(pr.reg) + ' ' + SAR + '</s>' : '') + '</div>' +
      '<div class="oc-timer"><span><b data-u="d">٠</b><small>يوم</small></span><span><b data-u="h">٠</b><small>ساعة</small></span><span><b data-u="m">٠</b><small>دقيقة</small></span><span><b data-u="s">٠</b><small>ثانية</small></span></div>' +
      '<button type="button" class="oc-dealbtn oc-add" data-id="' + p.id + '">أضف للسلة</button>' +
      '</div></article></div>';
  }
  function tick(scope) {
    var now = Date.now();
    $$('.oc-deal', scope).forEach(function (el) {
      var left = Math.max(0, (+el.dataset.end - now) / 1000);
      var v = { d: Math.floor(left / 86400), h: Math.floor(left % 86400 / 3600), m: Math.floor(left % 3600 / 60), s: Math.floor(left % 60) };
      $$('[data-u]', el).forEach(function (b) { b.textContent = num(v[b.dataset.u]); });
    });
  }
  function dealsSection() {
    var s = h('<section class="oc-sec oc-deals" id="oc-deals"><div class="oc-container">' + head('عروض حصرية') +
      '<div class="oc-slider"><div class="oc-track oc-track--deals">' + skeleton(2) + '</div>' + arrows() + '</div>' +
      '</div></section>');
    var track = $('.oc-track', s);
    slider(s);
    api('products?source=offers&per_page=10').then(function (r) {
      var list = (r && r.data) || [];
      if (list.length >= 2) return list;
      return api('products?source=selected&' + DEALS_FALLBACK.map(function (id) { return 'source_value[]=' + id; }).join('&')).then(function (x) { return (x && x.data) || []; });
    }).then(function (list) {
      var fb = nextFriday();
      track.innerHTML = list.map(function (p) { return dealCard(p, endDate(p.discount_ends) || fb); }).join('');
      tick(track); setInterval(function () { tick(track); }, 1000);
    }).catch(function () { s.remove(); });
    return s;
  }

  /* ---------- 8 models strip (in place of the brands row) ---------- */
  var CARS = [
    ['لاندكروزر', 'car_lc.webp', C['لاندكروزر']], ['برادو', 'car_prado.webp', C['برادو']], ['هايلوكس', 'car_hilux.webp', C['هايلوكس وفورشنر']],
    ['شاص', 'car_shas.webp', C['شاص وربع']], ['ربع', 'car_rab3.webp', C['شاص وربع']], ['اف جي كروزر', 'car_fj.webp', C['اف جي كروزر']],
    ['كامري', 'car_camry.webp', C['كامري']], ['كورولا', 'car_corolla.webp', C['كورولا ويارس']]
  ];
  function modelsSection() {
    var items = CARS.map(function (c) { return '<a class="oc-model" href="' + c[2] + '"><span class="oc-model__stage"><i class="oc-model__ring"></i><img loading="lazy" src="' + IMG + c[1] + '" alt=""></span><b>' + c[0] + '</b></a>'; }).join('');
    return h('<section class="oc-sec oc-models"><div class="oc-container">' + head('تسوق حسب موديل سيارتك') + '</div>' +
      '<div class="oc-marquee"><div class="oc-marquee__track">' + items + items + '</div></div></section>');
  }

  /* ---------- 9 testimonials ---------- */
  var REVIEWS = [
    ['عبدالله الحربي', 'جدة', 5, 'ركبت خط لاندكروزر على سيارتي وطلع نفس الصورة بالضبط والقص نظيف ووصلني ثاني يوم'],
    ['فهد العتيبي', 'الرياض', 5, 'طلبت شبك كامري واستغربت من سرعة الشحن والقطعة ركبت بدون أي تعديل'],
    ['سلطان القحطاني', 'أبها', 5, 'سألتهم عن مطابقة القطعة لموديل شاصي وأكدوا لي قبل الطلب وفعلا طلعت مطابقة'],
    ['ماجد الشهري', 'خميس مشيط', 4, 'خطوط الهايلوكس جودتها ممتازة والألوان ثابتة بعد أشهر من الشمس'],
    ['نواف الغامدي', 'جدة', 5, 'التوصيل داخل جدة كان بنفس اليوم والتغليف ممتاز'],
    ['تركي الدوسري', 'الدمام', 5, 'قسطت طلبي مع تابي وكانت التجربة سهلة جدا وأسعارهم منافسة'],
    ['خالد الزهراني', 'مكة', 5, 'أخذت فرشات أرضية للهايلوكس مقاسها مضبوط وخامتها قوية'],
    ['بندر المطيري', 'حائل', 4, 'تنوع كبير في قطع الشاص والربع لقيت كل اللي أدور عليه في طلب واحد'],
    ['يوسف المالكي', 'الطائف', 5, 'المرايات وصلت سليمة ومطابقة للأصلي وخدمة العملاء متعاونين'],
    ['سعود الشمري', 'تبوك', 5, 'ثاني مرة أطلب منهم وكل مرة أسرع من اللي قبلها أنصح فيهم']
  ];
  function reviewCard(r) {
    var stars = ''; for (var i = 0; i < 5; i++) stars += '<span class="' + (i < r[2] ? 'on' : '') + '">' + STAR + '</span>';
    return '<div class="oc-slide-item"><article class="oc-review"><span class="oc-quote" aria-hidden="true">”</span>' +
      '<div class="oc-review__top"><span class="oc-avatar">' + AVATAR + '</span><div><div class="oc-stars">' + stars + '</div><b>' + esc(r[0]) + '</b><small>عميل من ' + esc(r[1]) + '</small></div></div>' +
      '<p>' + esc(r[3]) + '</p></article></div>';
  }
  function reviewsSection() {
    var s = h('<section class="oc-sec oc-reviews"><div class="oc-container">' + head('آراء عملائنا') +
      '<div class="oc-slider"><div class="oc-track oc-track--reviews">' + REVIEWS.map(reviewCard).join('') + '</div>' + arrows() + '</div>' +
      '</div></section>');
    var track = $('.oc-track', s);
    slider(s);
    api('reviews?per_page=12').then(function (r) {
      var list = ((r && r.data) || []).filter(function (x) { return x && (x.content || x.comment); });
      if (list.length < 3) return;
      track.innerHTML = list.map(function (x) {
        var c = x.customer || {};
        return reviewCard([c.name || 'عميل أوبرا كار', c.city || 'المملكة', Math.round(x.rating || x.stars || 5), x.content || x.comment]);
      }).join('');
    }).catch(function () {});
    return s;
  }

  /* ---------- 10 articles ---------- */
  var ARTICLES = [];
  function articlesSection() {
    if (!ARTICLES.length) return null;
    return h('<section class="oc-sec oc-articles"><div class="oc-container">' + head('مقالات ونصائح', ARTICLES.all || null, 'كل المقالات') +
      '<div class="oc-articles__row">' + ARTICLES.map(function (a) {
        return '<article class="oc-article"><a class="oc-article__img" href="' + a.url + '"><img loading="lazy" src="' + IMG + a.img + '" alt=""><span>' + a.tag + '</span></a>' +
          '<div class="oc-article__body"><small>' + ic('cal') + a.date + ' <i></i> أوبرا كار</small><a class="oc-article__title" href="' + a.url + '">' + a.title + '</a><a class="oc-article__more" href="' + a.url + '">اقرأ المزيد</a></div></article>';
      }).join('') + '</div></div></section>');
  }

  /* ---------- features bar (all pages, above footer) ---------- */
  var FEATS = [['shield', 'قطع أصلية وبديلة', 'جودة مضمونة لكل موديل'], ['lock', 'دفع آمن', 'مدى وأبل باي والبطاقات'], ['headset', 'دعم مباشر', 'نرد على استفساراتك بسرعة'], ['ret', 'استبدال واسترجاع', 'حسب سياسة المتجر']];
  function featuresBar() {
    var footer = $('footer.store-footer');
    if (!footer || $('.oc-feats')) return;
    footer.parentNode.insertBefore(h('<div class="oc-feats-wrap"><div class="oc-container"><div class="oc-feats">' + FEATS.map(function (f) {
      return '<div class="oc-feat"><span class="oc-feat__ic">' + ic(f[0]) + '</span><div><b>' + f[1] + '</b><small>' + f[2] + '</small></div></div>';
    }).join('') + '</div></div></div>'), footer);
  }

  /* ---------- footer additions ---------- */
  var PAY = ['mada', 'apple_pay', 'visa', 'master', 'tabby', 'tamara'];
  var PAGES = [];
  function footerExtras() {
    var f = $('footer.store-footer'); if (!f || f.dataset.oc) return; f.dataset.oc = '1';
    var menu = $('salla-menu', f);
    if (menu) {
      setTimeout(function () {
        if ($('.oc-flinks', f) || $$('a', menu).length) return;
        var links = [['الخطوط', C['الخطوط']], ['قطع الغيار والاكسسوارات', C['قطع الغيار والاكسسوارات']], ['اختر سيارتك', '/#oc-finder'], ['العروض', '/#oc-deals']].concat(PAGES);
        menu.parentNode.appendChild(h('<div class="oc-flinks">' + links.map(function (l) { return '<a href="' + l[1] + '">' + l[0] + '</a>'; }).join('') + '</div>'));
      }, 1500);
    }
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
    [heroSection(), finderSection(), kindsSection(), featuredSection(), bannersSection(), latestSection(), dealsSection(), modelsSection(), reviewsSection(), articlesSection()]
      .forEach(function (el) { if (el) main.insertBefore(el, anchor); });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -60px 0px' });
      $$('.oc-sec', main).forEach(function (el) { el.classList.add('oc-reveal'); io.observe(el); });
    }
    if (location.hash && /^#oc-/.test(location.hash)) { var t2 = $(location.hash); if (t2) setTimeout(function () { t2.scrollIntoView({ behavior: 'smooth' }); }, 300); }
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
    document.body.classList.add('oc-ready');
  }
  ready(function () {
    init();
    // Salla web components hydrate late; retry header pieces once
    setTimeout(addNavExtras, 1200); setTimeout(addNavExtras, 3500);
  });
})();
