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
  var TOPBAR = ['شحن مجاني للطلبات فوق ٦٠٠ ريال', 'توصيل سريع داخل جدة', 'قسط مشترياتك مع تابي وتمارا', 'شحن سريع لكل مناطق المملكة'];

  function modeBtn(extra) {
    var b = h('<button type="button" class="oc-mode ' + (extra || '') + '" aria-label="تبديل الوضع الداكن والفاتح">' + ic('moon', 'oc-mode__moon') + ic('sun', 'oc-mode__sun') + '</button>');
    b.addEventListener('click', toggleMode);
    return b;
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

    // extra nav links
    var rootLi = $('custom-main-menu li.root-level', header);
    if (rootLi && rootLi.parentNode) {
      var ul = rootLi.parentNode;
      var home = h('<li class="oc-nav-extra root-level"><a href="/">الرئيسية</a></li>');
      ul.insertBefore(home, ul.firstChild);
      ul.appendChild(h('<li class="oc-nav-extra root-level"><a href="/#oc-finder">' + ic('car') + 'اختر سيارتك</a></li>'));
      ul.appendChild(h('<li class="oc-nav-extra oc-nav-hot root-level"><a href="/#oc-deals">' + ic('fire') + 'العروض</a></li>'));
    }

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

  /* ---------- product cards ---------- */
  function isOriginal(name) { return /اصلي|أصلي/.test(name); }
  function card(p) {
    var price = p.sale_price && p.is_on_sale ? p.sale_price : p.price;
    var reg = p.regular_price && p.regular_price > price ? p.regular_price : 0;
    var off = reg ? Math.round((1 - price / reg) * 100) : 0;
    var img = (p.image && p.image.url) || p.thumbnail || '';
    var cat = (p.category && p.category.name) || '';
    return '<article class="oc-card" data-id="' + p.id + '">' +
      '<a class="oc-card__img" href="' + esc(p.url) + '"><img loading="lazy" src="' + esc(img) + '" alt="' + esc(p.name) + '"></a>' +
      (off ? '<span class="oc-badge">خصم ' + num(off) + '٪</span>' : '') +
      (isOriginal(p.name) ? '<span class="oc-tag">أصلي</span>' : '') +
      '<div class="oc-card__body">' +
      '<span class="oc-card__cat">' + esc(cat) + '</span>' +
      '<a class="oc-card__title" href="' + esc(p.url) + '">' + esc(p.name) + '</a>' +
      '<div class="oc-price"><b>' + num(price) + ' ' + SAR + '</b>' + (reg ? '<s>' + num(reg) + ' ' + SAR + '</s>' : '') + '</div>' +
      '<button type="button" class="oc-add" data-id="' + p.id + '">' + ic('bag') + '<span>أضف للسلة</span></button>' +
      '</div></article>';
  }
  function addSecondImages(scope) {
    $$('.oc-card', scope).forEach(function (el) {
      var id = el.dataset.id;
      api('products/' + id + '/details').then(function (r) {
        var imgs = (r && r.data && r.data.images) || [];
        if (imgs.length > 1 && imgs[1].url) {
          var a = $('.oc-card__img', el);
          a.appendChild(h('<img class="oc-card__img2" loading="lazy" src="' + esc(imgs[1].url) + '" alt="">'));
          a.classList.add('has-2');
        }
      }).catch(function () {});
    });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.oc-add'); if (!b) return;
    e.preventDefault();
    var id = +b.dataset.id;
    b.classList.add('is-busy');
    var done = function () { b.classList.remove('is-busy'); b.classList.add('is-done'); setTimeout(function () { b.classList.remove('is-done'); }, 1600); };
    try {
      var pr = window.salla && salla.cart && (salla.cart.quickAdd ? salla.cart.quickAdd(id) : salla.cart.addItem({ id: id, quantity: 1 }));
      if (pr && pr.then) pr.then(done, function () { b.classList.remove('is-busy'); }); else done();
    } catch (err) { b.classList.remove('is-busy'); }
  });

  function slider(track, prev, next) {
    var step = function () { var c = track.querySelector(':scope > *'); return c ? c.getBoundingClientRect().width + 20 : 300; };
    prev.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
  }
  function head(title, sub, link, linkText) {
    return '<div class="oc-head"><div><h2>' + title + '</h2>' + (sub ? '<p>' + sub + '</p>' : '') + '</div>' +
      (link ? '<a class="oc-more" href="' + link + '">' + (linkText || 'عرض الكل') + ic('left') + '</a>' : '') + '</div>';
  }

  /* ---------- home: hero ---------- */
  var SLIDES = [
    { k: 'خطوط تويوتا بتصاميم حصرية', t: 'خطوط تعطي سيارتك<br><em>هوية جديدة</em>', p: 'تصاميم لاندكروزر وهايلوكس وشاص وربع حسب موديل سيارتك وسنة صنعها', img: 'hero_lc.webp', a: [['تسوق الخطوط', C['الخطوط']], ['اختر سيارتك', '#oc-finder']] },
    { k: 'قطع غيار واكسسوارات', t: 'كل ما تحتاجه سيارتك<br><em>في مكان واحد</em>', p: 'قطع أصلية وبديلة لأشهر موديلات تويوتا بأسعار منافسة', img: 'hero_parts.webp', a: [['تسوق القطع', C['قطع الغيار والاكسسوارات']], ['اختر سيارتك', '#oc-finder']] },
    { k: 'عروض أوبرا كار', t: 'عروض حصرية<br><em>لفترة محدودة</em>', p: 'خصومات على مختارات من الخطوط والقطع وشحن مجاني للطلبات فوق ٦٠٠ ريال', img: 'hero_hilux.webp', a: [['شاهد العروض', '#oc-deals'], ['تسوق الخطوط', C['الخطوط']]] }
  ];
  var SERVICES = [
    ['truck', 'شحن سريع', 'لكل مناطق المملكة'],
    ['bolt', 'توصيل سريع', 'داخل جدة'],
    ['gift', 'شحن مجاني', 'للطلبات فوق ٦٠٠ ريال'],
    ['card', 'قسّطها', 'مع تابي وتمارا']
  ];

  function heroSection() {
    var s = h('<section class="oc-hero" aria-label="الواجهة">' +
      '<div class="oc-hero__bg"><i></i><i></i><i></i></div>' +
      '<div class="oc-container oc-hero__in">' +
      '<div class="oc-hero__slides">' + SLIDES.map(function (sl, i) {
        return '<div class="oc-slide' + (i === 0 ? ' is-active' : '') + '">' +
          '<div class="oc-slide__text"><span class="oc-kicker">' + sl.k + '</span><h2>' + sl.t + '</h2><p>' + sl.p + '</p>' +
          '<div class="oc-btns"><a class="oc-btn oc-btn--primary" href="' + sl.a[0][1] + '">' + sl.a[0][0] + ic('left') + '</a><a class="oc-btn oc-btn--ghost" href="' + sl.a[1][1] + '">' + sl.a[1][0] + '</a></div></div>' +
          '<div class="oc-slide__media"><span class="oc-slide__ring"></span><img src="' + IMG + sl.img + '" alt="" ' + (i ? 'loading="lazy"' : 'fetchpriority="high"') + '></div>' +
          '</div>';
      }).join('') + '</div>' +
      '<div class="oc-hero__ctrl"><button type="button" class="oc-hero__arrow" data-d="-1" aria-label="السابق">' + ic('right') + '</button>' +
      '<div class="oc-hero__dots">' + SLIDES.map(function (_, i) { return '<button type="button" aria-label="شريحة ' + (i + 1) + '" class="' + (i === 0 ? 'is-on' : '') + '"><i></i></button>'; }).join('') + '</div>' +
      '<button type="button" class="oc-hero__arrow" data-d="1" aria-label="التالي">' + ic('left') + '</button></div>' +
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
    $$('.oc-hero__arrow', s).forEach(function (b) { b.addEventListener('click', function () { go(cur + (+b.dataset.d)); }); });
    var x0 = null;
    s.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    s.addEventListener('touchend', function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) go(cur + (dx > 0 ? 1 : -1)); x0 = null; });
    restart();
    return s;
  }

  /* ---------- home: vehicle finder ---------- */
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
  function finderSection() {
    var years = []; for (var y = 2026; y >= 1990; y--) years.push(y);
    var s = h('<section class="oc-finder-wrap" id="oc-finder"><div class="oc-container"><div class="oc-finder">' +
      '<div class="oc-finder__title"><span class="oc-finder__ic">' + ic('car') + '</span><div><b>اختر سيارتك</b><small>ونعرض لك القطع والخطوط المناسبة لها</small></div></div>' +
      '<label class="oc-field"><span>الموديل</span><select data-f="m"><option value="">اختر الموديل</option>' + MODELS.map(function (m, i) { return '<option value="' + i + '">' + m.n + '</option>'; }).join('') + '</select></label>' +
      '<label class="oc-field"><span>سنة الصنع</span><select data-f="y"><option value="">اختر السنة</option>' + years.map(function (y) { return '<option>' + y + '</option>'; }).join('') + '</select></label>' +
      '<label class="oc-field"><span>تبحث عن</span><select data-f="t"><option value="parts">قطع الغيار والاكسسوارات</option><option value="st">الخطوط</option></select></label>' +
      '<button type="button" class="oc-btn oc-btn--primary oc-finder__go">' + ic('search') + 'اعرض المنتجات</button>' +
      '<p class="oc-finder__msg" hidden></p>' +
      '</div></div></section>');
    var fm = $('[data-f=m]', s), fy = $('[data-f=y]', s), ft = $('[data-f=t]', s), msg = $('.oc-finder__msg', s);
    function sync() {
      var m = MODELS[fm.value]; var opt = ft.querySelector('[value=st]');
      opt.disabled = !!(m && !m.st);
      if (opt.disabled && ft.value === 'st') ft.value = 'parts';
      msg.hidden = true;
    }
    fm.addEventListener('change', sync);
    $('.oc-finder__go', s).addEventListener('click', function () {
      var m = MODELS[fm.value];
      if (!m) { msg.textContent = 'اختر موديل سيارتك أولا'; msg.hidden = false; fm.focus(); return; }
      var url = m.parts;
      if (ft.value === 'st' && m.st) {
        var y = +fy.value;
        if (!y && m.st.length > 1) { msg.textContent = 'اختر سنة الصنع عشان نعرض لك الخطوط المناسبة'; msg.hidden = false; fy.focus(); return; }
        m.st.forEach(function (r) { if (!y || (y >= r[0] && y <= r[1])) url = url === m.parts ? r[2] : url; });
      }
      location.href = url;
    });
    return s;
  }

  /* ---------- home: shop by category ---------- */
  var KINDS = [
    ['الشمعات والكشافات', 'شمعات', 'https://cdn.salla.sa/azeyQR/09fbd581-ed7d-4845-87e8-f1cf6851b87b-500x500-PgcGfy8EBN05LydUnxjyOhTQOJF1IV3jVMZoyR5o.jpg'],
    ['الشبك', 'شبك', 'https://cdn.salla.sa/azeyQR/49dd4ee2-36a6-4e36-86b4-872d52ac4b18-500x500-Jrsl76LbVFKRf85Z11gXLftbyYeCFBQ6wLD5kUw0.jpg'],
    ['الصدامات', 'صدام', 'https://cdn.salla.sa/azeyQR/417f3092-00dc-43e6-85ae-f477352b2187-500x500-LcKrzMVsSmz6ROeo2Pq5X14xH5qxGM9bXltqjODw.jpg'],
    ['المرايات', 'مراية', 'https://cdn.salla.sa/azeyQR/73f70e75-7dd8-42e2-9196-c2cceeb3a265-500x500-VD1Fq0GqRTp826NH6A0AKigZPCgg4xx1vfXK1B2O.jpg'],
    ['الدعسات', 'دعسات', 'https://cdn.salla.sa/azeyQR/af27cda8-20d7-4096-bc4b-76293c878412-500x500-u289EM7vucDlVAqFyI9fAcPSw3U5DsOZo6B5fsKy.jpg'],
    ['الديكورات', 'ديكور', 'https://cdn.salla.sa/azeyQR/ea1cc8c4-c4ef-45cb-a095-1b36a9322d48-500x500-ckZvWCSAgO8jqz8Iy6SKfyKnWDEDF7g71Iwe1I5f.jpg'],
    ['الفرشات', 'فرشات', 'https://cdn.salla.sa/azeyQR/64c3b49a-7da1-4e79-8e71-2a9a83dfd966-500x500-Lh1pTRRNLV0xEW88qZLe1vgcr0YSU9ZciJPnsUED.jpg'],
    ['الدركسونات', 'دركسون', 'https://cdn.salla.sa/azeyQR/908a35d8-4a1f-4be7-8cfb-a2b56392bf7a-500x500-KI79WXKHjxjCToKskET0PYjXCEOeuy3uTezITqIV.jpg'],
    ['المسجلات', 'مسجل', 'https://cdn.salla.sa/azeyQR/880b1ea5-6b1a-4724-aabf-16f05c5a1720-500x500-szfDZ9TQzmIOyFiURX9SkekD1PG6kbgCE2JCJ9Rj.jpg'],
    ['العلامات', 'علامة', 'https://cdn.salla.sa/azeyQR/e1ce7dd2-fe3b-4102-831d-944fe333e449-500x500-Ar01PnblryNHtCnIeAPj0dg5EYEYOEKjjv8ii1HM.jpg']
  ];
  function kindsSection() {
    return h('<section class="oc-sec oc-kinds"><div class="oc-container">' + head('تسوق حسب القسم', 'اختر نوع القطعة اللي تدور عليها') +
      '<div class="oc-kinds__row">' + KINDS.map(function (k) {
        return '<a class="oc-kind" href="/search?q=' + encodeURIComponent(k[1]) + '"><span class="oc-kind__img"><img loading="lazy" src="' + k[2] + '" alt=""></span><b>' + k[0] + '</b></a>';
      }).join('') + '</div></div></section>');
  }

  /* ---------- home: featured ---------- */
  function featuredSection() {
    var s = h('<section class="oc-sec oc-featured"><div class="oc-container">' + head('الأكثر طلبا', 'مختارات من أكثر الخطوط والقطع طلبا عند عملائنا', C['قطع الغيار والاكسسوارات']) +
      '<div class="oc-featured__grid">' +
      '<a class="oc-promo" href="#oc-deals" style="background-image:url(' + IMG + 'deals_tall.webp)"><span class="oc-kicker">عروض حصرية</span><b>خصومات تصل إلى ٢٥٪</b><small>على مختارات من الخطوط والقطع</small><span class="oc-btn oc-btn--light">تسوق الآن</span></a>' +
      '<div class="oc-slider"><div class="oc-track"><div class="oc-skel"></div><div class="oc-skel"></div><div class="oc-skel"></div><div class="oc-skel"></div></div>' +
      '<button type="button" class="oc-arrow oc-arrow--prev" aria-label="السابق">' + ic('right') + '</button><button type="button" class="oc-arrow oc-arrow--next" aria-label="التالي">' + ic('left') + '</button></div>' +
      '</div></div></section>');
    var track = $('.oc-track', s);
    slider(track, $('.oc-arrow--prev', s), $('.oc-arrow--next', s));
    api('products?source=selected&' + FEATURED.map(function (id) { return 'source_value[]=' + id; }).join('&')).then(function (r) {
      var list = (r && r.data) || [];
      list.sort(function (a, b) { return FEATURED.indexOf(+a.id) - FEATURED.indexOf(+b.id); });
      track.innerHTML = list.map(card).join('');
      addSecondImages(track);
    }).catch(function () { s.remove(); });
    return s;
  }

  /* ---------- home: banners ---------- */
  function bannersSection() {
    var B = [
      ['لاندكروزر هايلوكس شاص ربع', 'الخطوط', 'تبدأ من ١٤٩ ريال', C['الخطوط'], 'ban_stripes.webp'],
      ['أصلية وبديلة', 'قطع الغيار', 'لأشهر موديلات تويوتا', C['قطع الغيار والاكسسوارات'], 'ban_parts.webp'],
      ['ديكورات ومسجلات وفرشات', 'الاكسسوارات', 'لمسات تفرق في سيارتك', C['اكسسوارات تويوتا عامة'], 'ban_acc.webp']
    ];
    return h('<section class="oc-sec oc-banners"><div class="oc-container"><div class="oc-banners__row">' + B.map(function (b) {
      return '<a class="oc-banner" href="' + b[3] + '"><span class="oc-banner__bg" style="background-image:url(' + IMG + b[4] + ')"></span><span class="oc-banner__txt"><span class="oc-kicker">' + b[0] + '</span><b>' + b[1] + '</b><small>' + b[2] + '</small><span class="oc-btn oc-btn--light">تسوق الآن</span></span></a>';
    }).join('') + '</div></div></section>');
  }

  /* ---------- home: deals with countdown ---------- */
  function nextFriday() {
    var d = new Date(); var add = (5 - d.getDay() + 7) % 7 || 7;
    d.setDate(d.getDate() + add); d.setHours(23, 59, 59, 0); return d;
  }
  function dealCard(p, end) {
    var price = p.is_on_sale && p.sale_price ? p.sale_price : p.price;
    var reg = p.regular_price > price ? p.regular_price : 0;
    var off = reg ? Math.round((1 - price / reg) * 100) : 0;
    return '<article class="oc-deal" data-end="' + end.getTime() + '">' +
      '<a class="oc-deal__img" href="' + esc(p.url) + '"><img loading="lazy" src="' + esc(p.image && p.image.url) + '" alt="' + esc(p.name) + '"></a>' +
      (off ? '<span class="oc-badge">خصم ' + num(off) + '٪</span>' : '') +
      '<div class="oc-deal__body"><span class="oc-card__cat">' + esc(p.category && p.category.name) + '</span>' +
      '<a class="oc-card__title" href="' + esc(p.url) + '">' + esc(p.name) + '</a>' +
      '<div class="oc-price"><b>' + num(price) + ' ' + SAR + '</b>' + (reg ? '<s>' + num(reg) + ' ' + SAR + '</s>' : '') + '</div>' +
      '<div class="oc-timer"><span><b data-u="d">٠</b><small>يوم</small></span><span><b data-u="h">٠</b><small>ساعة</small></span><span><b data-u="m">٠</b><small>دقيقة</small></span><span><b data-u="s">٠</b><small>ثانية</small></span></div>' +
      '<button type="button" class="oc-add oc-add--line" data-id="' + p.id + '">' + ic('bag') + '<span>أضف للسلة</span></button>' +
      '</div></article>';
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
    var s = h('<section class="oc-sec oc-deals" id="oc-deals"><div class="oc-container">' + head('عروض حصرية', 'خصومات لفترة محدودة الحق عليها قبل نهاية العداد', '/search?q=' + encodeURIComponent('خط'), 'كل العروض') +
      '<div class="oc-slider"><div class="oc-track oc-track--deals"><div class="oc-skel oc-skel--wide"></div><div class="oc-skel oc-skel--wide"></div></div>' +
      '<button type="button" class="oc-arrow oc-arrow--prev" aria-label="السابق">' + ic('right') + '</button><button type="button" class="oc-arrow oc-arrow--next" aria-label="التالي">' + ic('left') + '</button></div>' +
      '</div></section>');
    var track = $('.oc-track', s);
    slider(track, $('.oc-arrow--prev', s), $('.oc-arrow--next', s));
    api('products?source=offers&per_page=10').then(function (r) {
      var list = (r && r.data) || [];
      if (list.length >= 2) return list;
      return api('products?source=selected&' + DEALS_FALLBACK.map(function (id) { return 'source_value[]=' + id; }).join('&')).then(function (x) { return (x && x.data) || []; });
    }).then(function (list) {
      var fb = nextFriday();
      track.innerHTML = list.map(function (p) { return dealCard(p, p.discount_ends ? new Date(String(p.discount_ends).replace(' ', 'T')) : fb); }).join('');
      tick(track); setInterval(function () { tick(track); }, 1000);
    }).catch(function () { s.remove(); });
    return s;
  }

  /* ---------- home: models strip ---------- */
  var CARS = [
    ['لاندكروزر', 'car_lc.webp', C['لاندكروزر']], ['برادو', 'car_prado.webp', C['برادو']], ['هايلوكس', 'car_hilux.webp', C['هايلوكس وفورشنر']],
    ['شاص', 'car_shas.webp', C['شاص وربع']], ['ربع', 'car_rab3.webp', C['شاص وربع']], ['اف جي كروزر', 'car_fj.webp', C['اف جي كروزر']],
    ['كامري', 'car_camry.webp', C['كامري']], ['كورولا', 'car_corolla.webp', C['كورولا ويارس']]
  ];
  function modelsSection() {
    var items = CARS.map(function (c) { return '<a class="oc-model" href="' + c[2] + '"><img loading="lazy" src="' + IMG + c[1] + '" alt=""><b>' + c[0] + '</b></a>'; }).join('');
    return h('<section class="oc-sec oc-models"><div class="oc-container">' + head('تسوق حسب موديل سيارتك', 'قطع وخطوط مخصصة لكل موديل من تويوتا') + '</div>' +
      '<div class="oc-marquee"><div class="oc-marquee__track">' + items + items + '</div></div></section>');
  }

  /* ---------- home: testimonials ---------- */
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
    var initials = r[0].split(' ').map(function (w) { return w.replace(/^ال/, '').charAt(0); }).slice(0, 2).join('');
    var stars = ''; for (var i = 0; i < 5; i++) stars += '<span class="' + (i < r[2] ? 'on' : '') + '">' + STAR + '</span>';
    return '<article class="oc-review"><div class="oc-review__top"><span class="oc-avatar">' + esc(initials) + '</span><div><b>' + esc(r[0]) + '</b><small>' + ic('pin') + esc(r[1]) + '</small></div><span class="oc-quote">”</span></div>' +
      '<div class="oc-stars">' + stars + '</div><p>' + esc(r[3]) + '</p></article>';
  }
  function reviewsSection() {
    var s = h('<section class="oc-sec oc-reviews"><div class="oc-container">' + head('آراء عملائنا', 'تجارب حقيقية من عملاء أوبرا كار في مختلف مدن المملكة') +
      '<div class="oc-slider"><div class="oc-track oc-track--reviews">' + REVIEWS.map(reviewCard).join('') + '</div>' +
      '<button type="button" class="oc-arrow oc-arrow--prev" aria-label="السابق">' + ic('right') + '</button><button type="button" class="oc-arrow oc-arrow--next" aria-label="التالي">' + ic('left') + '</button></div>' +
      '</div></section>');
    var track = $('.oc-track', s);
    slider(track, $('.oc-arrow--prev', s), $('.oc-arrow--next', s));
    // live Salla reviews take over once the store has enough of them
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

  /* ---------- features bar (all pages, above footer) ---------- */
  var FEATS = [['shield', 'قطع أصلية وبديلة', 'جودة مضمونة لكل موديل'], ['lock', 'دفع آمن', 'مدى وأبل باي والبطاقات'], ['chat', 'دعم مباشر', 'نتأكد لك من مطابقة القطعة'], ['ret', 'استبدال واسترجاع', 'حسب سياسة المتجر']];
  function featuresBar() {
    var footer = $('footer.store-footer');
    if (!footer || $('.oc-feats')) return;
    footer.parentNode.insertBefore(h('<div class="oc-feats-wrap"><div class="oc-container"><div class="oc-feats">' + FEATS.map(function (f) {
      return '<div class="oc-feat"><span class="oc-feat__ic">' + ic(f[0]) + '</span><div><b>' + f[1] + '</b><small>' + f[2] + '</small></div></div>';
    }).join('') + '</div></div></div>'), footer);
  }

  /* ---------- footer additions ---------- */
  function footerExtras() {
    var f = $('footer.store-footer'); if (!f || f.dataset.oc) return; f.dataset.oc = '1';
    var menu = $('salla-menu', f);
    if (menu) {
      var add = function () {
        if ($('.oc-flinks', f)) return;
        var hasLinks = $$('a', menu).length > 0;
        if (hasLinks) return;
        menu.parentNode.appendChild(h('<div class="oc-flinks"><a href="' + C['الخطوط'] + '">الخطوط</a><a href="' + C['قطع الغيار والاكسسوارات'] + '">قطع الغيار والاكسسوارات</a><a href="' + C['اكسسوارات تويوتا عامة'] + '">اكسسوارات تويوتا</a><a href="/#oc-finder">اختر سيارتك</a><a href="/#oc-deals">العروض</a></div>'));
      };
      setTimeout(add, 1500);
    }
    var pays = $('salla-payments', f);
    var pill = h('<div class="oc-pay" aria-label="طرق الدفع"><span>مدى</span><span>VISA</span><span>Mastercard</span><span>Apple Pay</span><span class="t">tabby</span><span class="m">tamara</span></div>');
    if (pays) { if (!$('li', pays)) { pays.style.display = 'none'; pays.parentNode.insertBefore(pill, pays); } }
  }

  /* ---------- home assembly ---------- */
  function buildHome() {
    if (!document.body.classList.contains('index')) return;
    var main = $('#main-content');
    if (!main || main.dataset.oc) return;
    main.dataset.oc = '1';
    var latest = $('.s-block--latest-products', main);
    var anchor = latest || main.firstChild;
    [heroSection(), finderSection(), kindsSection(), featuredSection(), bannersSection(), dealsSection(), modelsSection()].forEach(function (el) { main.insertBefore(el, anchor); });
    if (latest) {
      latest.classList.add('oc-latest');
      var t = $('.s-block__title', latest);
      if (t) t.innerHTML = head('وصل حديثا', 'آخر ما أضفناه من قطع وخطوط');
      latest.parentNode.insertBefore(reviewsSection(), latest.nextSibling);
    } else {
      main.appendChild(reviewsSection());
    }
    // reveal on scroll
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
      try {
        if (window.salla && salla.cart && salla.cart.api && salla.cart.api.details) {
          return salla.cart.api.details().then(function (r) { var c = r && r.data && (r.data.cart || r.data); update(+(c && (c.sub_total || c.total)) || 0); });
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
    setTimeout(buildHeader, 1200);
  });
})();
