/* ──────────────────────────────────────────
   Clock
   ────────────────────────────────────────── */

const clkEl = document.getElementById('clock');
const clkDigital = document.getElementById('clk-digital');
const clkAnalog = document.getElementById('clk-analog');
const clkMinimal = document.getElementById('clk-minimal');
const clkHandH = document.getElementById('clk-hand-h');
const clkHandM = document.getElementById('clk-hand-m');
const clkHandS = document.getElementById('clk-hand-s');

const clkStyleRep = nodecg.Replicant('clkStyle', { defaultValue: 'digital' });
const clkVisibleRep = nodecg.Replicant('clkVisible', { defaultValue: false });
const clkSizeRep = nodecg.Replicant('clkSize', { defaultValue: 1.5 });
const clkBgRep = nodecg.Replicant('clkBgColor', { defaultValue: '#0a0a14' });
const clkTextRep = nodecg.Replicant('clkTextColor', { defaultValue: '#ffffff' });
const clkAccentRep = nodecg.Replicant('clkAccentColor', { defaultValue: '#e5243b' });

let clkStyle = 'digital';

function pad(n) { return String(n).padStart(2, '0'); }

// Build analog face tick marks
(function buildTicks() {
    const svg = document.getElementById('clk-svg');
    for (let i = 0; i < 12; i++) {
        const a = i * 30 * Math.PI / 180;
        const major = i % 3 === 0;
        const r1 = major ? 38 : 41;
        const r2 = 45;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', 50 + r1 * Math.sin(a));
        line.setAttribute('y1', 50 - r1 * Math.cos(a));
        line.setAttribute('x2', 50 + r2 * Math.sin(a));
        line.setAttribute('y2', 50 - r2 * Math.cos(a));
        line.setAttribute('class', major ? 'clk-tick-major' : 'clk-tick');
        svg.insertBefore(line, clkHandH);
    }
})();

function clkTick() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    // Digital
    clkDigital.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);

    // Minimal
    clkMinimal.textContent = pad(h) + ':' + pad(m);

    // Analog
    const hDeg = (h % 12) * 30 + m * 0.5;
    const mDeg = m * 6 + s * 0.1;
    const sDeg = s * 6;
    clkHandH.setAttribute('transform', 'rotate(' + hDeg + ', 50, 50)');
    clkHandM.setAttribute('transform', 'rotate(' + mDeg + ', 50, 50)');
    clkHandS.setAttribute('transform', 'rotate(' + sDeg + ', 50, 50)');
}

setInterval(clkTick, 1000);
clkTick();

function clkSetStyle(v) {
    clkStyle = v;
    clkEl.className = clkEl.className.replace(/clk-style-\S+/g, '');
    clkEl.classList.add('clk-style-' + v);
}

clkStyleRep.on('change', clkSetStyle);

clkVisibleRep.on('change', (v) => {
    clkEl.classList.toggle('state-visible', v);
    clkEl.classList.toggle('state-hidden', !v);
});

clkBgRep.on('change', (v) => {
    const r = parseInt(v.slice(1, 3), 16);
    const g = parseInt(v.slice(3, 5), 16);
    const b = parseInt(v.slice(5, 7), 16);
    clkEl.style.setProperty('--clk-bg', 'rgba(' + r + ',' + g + ',' + b + ', 0.85)');
});

clkSizeRep.on('change', (v) => { clkEl.style.setProperty('--clk-size', v); });
clkTextRep.on('change', (v) => { clkEl.style.setProperty('--clk-text', v); });
clkAccentRep.on('change', (v) => { clkEl.style.setProperty('--clk-accent', v); });

/* ──────────────────────────────────────────
   Lower Third
   ────────────────────────────────────────── */

const ltEl = document.getElementById('lower-third');
const ltTagText = document.getElementById('lt-tag-text');
const ltTagBlock = document.getElementById('lt-tag-block');
const ltTitle = document.getElementById('lt-title-text');
const ltSubtitle = document.getElementById('lt-subtitle-text');
const ltTitleBlock = document.getElementById('lt-title-block');
const ltSubtitleBlock = document.getElementById('lt-subtitle-block');

const ltStyleRep = nodecg.Replicant('ltStyle', { defaultValue: 'classic' });
const ltVisibleRep = nodecg.Replicant('ltVisible', { defaultValue: false });
const ltTagRep = nodecg.Replicant('ltTag', { defaultValue: '' });
const ltTitleRep = nodecg.Replicant('ltTitle', { defaultValue: '' });
const ltSubtitleRep = nodecg.Replicant('ltSubtitle', { defaultValue: '' });
const ltBgRep = nodecg.Replicant('ltBgColor', { defaultValue: '#0a0a14' });
const ltTextRep = nodecg.Replicant('ltTextColor', { defaultValue: '#ffffff' });
const ltAccentRep = nodecg.Replicant('ltAccentColor', { defaultValue: '#e5243b' });
const ltAlignRep = nodecg.Replicant('ltAlign', { defaultValue: 'right' });

let ltVisible = false;

function ltShow() {
    if (ltVisible) return;
    ltVisible = true;
    ltEl.classList.remove('state-hidden');
    void ltEl.offsetWidth;
    ltEl.classList.add('state-visible');
}

function ltHide() {
    if (!ltVisible) return;
    ltVisible = false;
    ltEl.classList.remove('state-visible');
    ltEl.classList.add('state-hidden');
}

function ltUpdateContent() {
    ltTagBlock.classList.toggle('has-content', !!ltTagText.textContent.trim());
    ltTitleBlock.classList.toggle('has-content', !!ltTitle.textContent.trim());
    ltSubtitleBlock.classList.toggle('has-content', !!ltSubtitle.textContent.trim());
}

ltVisibleRep.on('change', (v) => {
    if (v) ltShow(); else ltHide();
});

ltStyleRep.on('change', (v) => {
    ltEl.className = ltEl.className.replace(/style-\S+/, '');
    ltEl.classList.add('style-' + v);
    if (ltVisible) {
        ltEl.classList.remove('state-visible');
        void ltEl.offsetWidth;
        ltEl.classList.add('state-visible');
    }
});

ltTagRep.on('change', (v) => { ltTagText.textContent = v; ltUpdateContent(); });
ltTitleRep.on('change', (v) => { ltTitle.textContent = v; ltUpdateContent(); });
ltSubtitleRep.on('change', (v) => { ltSubtitle.textContent = v; ltUpdateContent(); });

ltBgRep.on('change', (v) => {
    const r = parseInt(v.slice(1, 3), 16);
    const g = parseInt(v.slice(3, 5), 16);
    const b = parseInt(v.slice(5, 7), 16);
    ltEl.style.setProperty('--lt-bg', 'rgba(' + r + ',' + g + ',' + b + ', 0.92)');
});

ltTextRep.on('change', (v) => { ltEl.style.setProperty('--lt-text', v); });
ltAccentRep.on('change', (v) => { ltEl.style.setProperty('--lt-accent', v); });

ltAlignRep.on('change', (v) => {
    ltEl.classList.remove('align-left', 'align-right');
    ltEl.classList.add('align-' + v);
});

/* ──────────────────────────────────────────
   Crawl
   ────────────────────────────────────────── */

const mqBar = document.getElementById('marquee-bar');
const mqContent = document.getElementById('mq-content');
const mqTrack = document.getElementById('mq-track');

const mqVisibleRep = nodecg.Replicant('mqVisible', { defaultValue: false });
const mqTextRep = nodecg.Replicant('mqText', { defaultValue: '' });
const mqSpeedRep = nodecg.Replicant('mqSpeed', { defaultValue: 80 });
const mqFontSizeRep = nodecg.Replicant('mqFontSize', { defaultValue: 1.1 });
const mqBgRep = nodecg.Replicant('mqBgColor', { defaultValue: '#0a0a14' });
const mqTextColorRep = nodecg.Replicant('mqTextColor', { defaultValue: '#ffffff' });
const mqAccentRep = nodecg.Replicant('mqAccentColor', { defaultValue: '#e5243b' });

const SEPARATOR = '\u2003\u2503\u2003';
let mqAnimId = null;
let mqSpeed = 80;
let mqXPos = 0;
let mqVisible = false;

function mqBuild(text) {
    if (!text || !text.trim()) return '';
    return text.split('|').map(function(s) { return s.trim(); }).filter(Boolean).join(SEPARATOR);
}

function mqStart() {
    if (mqAnimId) cancelAnimationFrame(mqAnimId);
    const trackWidth = mqTrack.offsetWidth;
    const textWidth = mqContent.offsetWidth;
    if (textWidth === 0) return;

    mqXPos = trackWidth;
    var last = performance.now();

    function tick(now) {
        var dt = (now - last) / 1000;
        last = now;
        mqXPos -= mqSpeed * dt;
        if (mqXPos < -textWidth) mqXPos = trackWidth;
        mqContent.style.transform = 'translateX(' + mqXPos + 'px)';
        mqAnimId = requestAnimationFrame(tick);
    }
    mqAnimId = requestAnimationFrame(tick);
}

function mqStop() {
    if (mqAnimId) { cancelAnimationFrame(mqAnimId); mqAnimId = null; }
}

function mqShow() {
    if (mqVisible) return;
    mqVisible = true;
    mqBar.classList.remove('state-hidden');
    mqBar.classList.add('state-visible');
}

function mqHide() {
    if (!mqVisible) return;
    mqVisible = false;
    mqBar.classList.remove('state-visible');
    mqBar.classList.add('state-hidden');
}

NodeCG.waitForReplicants(mqVisibleRep, mqTextRep).then(function() {
    function mqApply() {
        var v = mqVisibleRep.value;
        var text = mqTextRep.value;
        if (v && text && text.trim()) {
            mqContent.textContent = mqBuild(text);
            requestAnimationFrame(function() { mqStart(); mqShow(); });
        } else {
            mqHide();
            mqStop();
        }
    }

    mqApply();

    mqVisibleRep.on('change', function() { mqApply(); });

    mqTextRep.on('change', function(v) {
        if (v && v.trim()) {
            mqContent.textContent = mqBuild(v);
            if (mqVisible) requestAnimationFrame(function() { mqStart(); });
        }
    });
});

mqSpeedRep.on('change', function(v) { mqSpeed = v; });

mqFontSizeRep.on('change', function(v) {
    mqContent.style.fontSize = v + 'vw';
    if (mqVisible) requestAnimationFrame(function() { mqStart(); });
});

mqBgRep.on('change', function(v) {
    var r = parseInt(v.slice(1, 3), 16);
    var g = parseInt(v.slice(3, 5), 16);
    var b = parseInt(v.slice(5, 7), 16);
    mqBar.style.setProperty('--mq-bg', 'rgba(' + r + ',' + g + ',' + b + ', 0.92)');
});

mqTextColorRep.on('change', function(v) { mqBar.style.setProperty('--mq-text', v); });
mqAccentRep.on('change', function(v) { mqBar.style.setProperty('--mq-accent', v); });
