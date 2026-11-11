/* Opera Car: writes the new product descriptions through the Salla dashboard product editor, one product at a time */
(function () {
  if (window.__ocRun) return;
  var S = window.__ocRun = { done: [], fail: [], cur: null, stop: false, log: [] };
  try { var saved = JSON.parse(localStorage.getItem('oc-desc-done') || '[]'); S.done = saved; } catch (e) {}
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var waitFor = async function (fn, ms) { var t = Date.now(); while (Date.now() - t < ms) { try { var v = fn(); if (v) return v; } catch (e) {} await sleep(150); } return null; };
  // watch the dashboard's own save responses without touching their headers
  var last = { url: '', method: '', status: 0, t: 0 };
  var xo = XMLHttpRequest.prototype.open, xs = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (m, u) { this.__oc = { m: m, u: u }; return xo.apply(this, arguments); };
  XMLHttpRequest.prototype.send = function () { var x = this; x.addEventListener('loadend', function () { if (x.__oc) { last = { url: String(x.__oc.u), method: String(x.__oc.m).toUpperCase(), status: x.status, t: Date.now() }; } }); return xs.apply(this, arguments); };
  var fo = window.fetch;
  window.fetch = function (input, init) {
    var u = typeof input === 'string' ? input : (input && input.url) || '', m = ((init && init.method) || (input && input.method) || 'GET').toUpperCase();
    return fo.apply(this, arguments).then(function (res) { last = { url: u, method: m, status: res.status, t: Date.now() }; return res; });
  };
  var editorBox = function () {
    var lab = [].slice.call(document.querySelectorAll('label, span, div, p')).find(function (e) { return e.children.length < 3 && e.textContent.trim() === 'وصف المنتج' && e.offsetParent; });
    if (!lab) return null;
    var box = lab; for (var i = 0; i < 6 && box; i++) { box = box.parentElement; if (box && box.querySelector('textarea.s-editor__html-source')) return box; }
    return null;
  };
  var htmlBtn = function (box) { return [].slice.call(box.querySelectorAll('button, span, div')).find(function (e) { return e.children.length === 0 && /<\/?HTML>/.test(e.textContent.trim()); }); };
  var saveBtn = function (box) {
    var all = [].slice.call(document.querySelectorAll('button')).filter(function (b) { return b.offsetParent && b.textContent.trim() === 'حفظ'; });
    var r = box.getBoundingClientRect();
    return all.filter(function (b) { return b.getBoundingClientRect().top >= r.bottom - 5; }).sort(function (a, b) { return a.getBoundingClientRect().top - b.getBoundingClientRect().top; })[0];
  };
  async function one(id, html) {
    S.cur = id;
    history.pushState({}, '', '/products/' + id); dispatchEvent(new PopStateEvent('popstate', { state: {} }));
    var ok = await waitFor(function () { return document.title.indexOf('#' + id) > -1 && editorBox(); }, 20000);
    if (!ok) throw new Error('editor did not open');
    await sleep(1500);
    var box = editorBox(); if (!box) throw new Error('no editor');
    box.scrollIntoView({ block: 'center' });
    var ta = box.querySelector('textarea.s-editor__html-source');
    if (!ta.offsetParent) { var hb = htmlBtn(box); if (!hb) throw new Error('no html button'); hb.click(); await sleep(400); }
    ta = box.querySelector('textarea.s-editor__html-source');
    var set = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
    set.call(ta, html); ta.dispatchEvent(new Event('input', { bubbles: true })); ta.dispatchEvent(new Event('change', { bubbles: true }));
    await sleep(300);
    var hb2 = htmlBtn(box); if (hb2) { hb2.click(); await sleep(500); }
    var sb = saveBtn(box); if (!sb) throw new Error('no save button');
    var t0 = Date.now(); sb.click();
    var res = await waitFor(function () { return last.t > t0 && /admin\/v2\/products\/\d+/.test(last.url) && last.method !== 'GET' ? last : null; }, 15000);
    if (!res) {
      // the save may finish before the follow up read, check the refresh read of this product
      res = await waitFor(function () { return last.t > t0 && last.url.indexOf('/products/' + id) > -1 ? last : null; }, 5000);
    }
    if (!res) throw new Error('no save response');
    if (res.status >= 400) throw new Error('save status ' + res.status);
    await sleep(800);
  }
  window.__ocStart = async function (ids, data) {
    S.stop = false; S.total = ids.length;
    for (var i = 0; i < ids.length; i++) {
      if (S.stop) break;
      var id = ids[i]; if (S.done.indexOf(id) > -1) continue;
      try { await one(id, data[id]); S.done.push(id); try { localStorage.setItem('oc-desc-done', JSON.stringify(S.done)); } catch (e) {} }
      catch (e) { S.fail.push([id, String(e.message || e)]); S.log.push(id + ' ' + e.message); await sleep(1500); }
    }
    S.cur = null; S.finished = Date.now();
  };
})();
