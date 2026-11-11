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
  function inCat(name, n) { return 'products?source=categories&source_value[]=' + catId(C[name]) + '&per_page=' + (n || 12); }
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
      { n: 'كل المنتجات', q: 'products?source=latest&per_page=12' },
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
  var WHY = [
    ['medal', 'قطع أصلية وبديلة', 'نوفر القطع الأصلية والبديلة لأشهر موديلات تويوتا بجودة عالية وأسعار منافسة'],
    ['check', 'نتأكد من المطابقة', 'نراجع مطابقة كل قطعة لموديل سيارتك وسنة صنعها قبل الشحن'],
    ['stripe', 'خطوط بتصاميم خاصة', 'خطوط أصلية وتصاميم خاصة للاندكروزر والهايلوكس والشاص والربع حسب سنة الصنع'],
    ['headset', 'نرد على استفساراتك', 'نساعدك تختار القطعة الصحيحة ونرد عليك قبل الطلب وبعده']
  ];
  function aboutSection() {
    var c = function (w) { return '<div class="oc-why__card"><span class="oc-why__ic">' + ic(w[0]) + '</span><h3>' + w[1] + '</h3><p>' + w[2] + '</p></div>'; };
    return h('<section class="oc-sec oc-why" id="oc-about"><div class="oc-container">' + sHead('لماذا أوبرا كار', { center: true }) +
      '<div class="oc-why__grid"><div class="oc-why__col">' + c(WHY[0]) + c(WHY[1]) + '</div>' +
      '<div class="oc-why__pic"><img loading="lazy" src="' + IMG + 'art_orig.webp" alt="قطع غيار تويوتا"></div>' +
      '<div class="oc-why__col">' + c(WHY[2]) + c(WHY[3]) + '</div></div></div></section>');
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
