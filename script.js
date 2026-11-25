// ===== CONFIGURE THESE =====
// 1. Create a free form at https://formspree.io using YOUR email, then paste its URL here
//    (looks like https://formspree.io/f/abcdwxyz). Messages are then emailed to your inbox.
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
// ===========================

document.getElementById('year').textContent = new Date().getFullYear();

const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1 }) : null;
document.querySelectorAll('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('in')));

// typing effect on the hero headline
const typed = document.getElementById('typed');
if (typed && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const words = ['digital products', 'web applications', 'MERN apps', 'real solutions'];
  let w = 0, i = words[0].length, del = true;
  setInterval(() => {
    const word = words[w];
    if (del) { i--; if (i <= 0) { del = false; w = (w + 1) % words.length; } }
    else { i++; if (i >= words[w].length) { del = true; } }
    typed.textContent = words[w].slice(0, Math.max(i, 0));
  }, 90);
}

const form = document.getElementById('contact-form');
if (form) {
  const status = document.getElementById('status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.website.value) return; if (!form.checkValidity()) { form.reportValidity(); return; } // honeypot
    if (FORM_ENDPOINT.includes('YOUR_FORM_ID')) { status.textContent = 'Form not configured yet: set FORM_ENDPOINT in script.js.'; status.style.color = 'var(--accent)'; return; }
    const btn = form.querySelector('button'); btn.disabled = true; status.style.color = 'var(--muted)'; status.textContent = 'Sending…';
    try {
      const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      if (!r.ok) throw new Error();
      form.reset(); status.textContent = 'Thanks! Your message has been sent.';
    } catch { status.style.color = 'var(--accent)'; status.textContent = 'Could not send. Please try again later.'; }
    btn.disabled = false;
  });
}
