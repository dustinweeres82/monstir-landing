// Landing target for Supabase's password-reset link.
//
// Served as a Route Handler (not a page) so it bypasses the root layout: no
// React runtime, no Bugsnag, no analytics. Supabase redirects here with a live
// recovery session in the URL fragment (`#access_token=...`), so the ONLY
// JavaScript allowed on this page is supabase-js itself — and it must be
// self-hosted, never loaded from a CDN. The bundle at /vendor/supabase.js is a
// single self-contained ESM build produced from the npm package (see
// scripts/build-supabase.sh). Fonts are self-hosted from /public too.

export const dynamic = "force-static";

const SUPABASE_URL = "https://vxdoxtbuwfoghlugfpjp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_vmWTTJK1Mb2koko7ZJ-Xwg_iaBwhvyG";

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>Reset password · Monstir</title>
  <style>
    @font-face {
      font-family: 'Fredoka';
      src: url('/fonts/fredoka-latin-600-normal.woff2') format('woff2');
      font-weight: 600; font-style: normal; font-display: swap;
    }
    @font-face {
      font-family: 'Nunito';
      src: url('/fonts/nunito-latin-400-normal.woff2') format('woff2');
      font-weight: 400; font-style: normal; font-display: swap;
    }
    @font-face {
      font-family: 'Nunito';
      src: url('/fonts/nunito-latin-700-normal.woff2') format('woff2');
      font-weight: 700; font-style: normal; font-display: swap;
    }
    :root { --lime:#C5F215; --ink:#1A1A1A; --err:#B3261E;
            --purple:#7B3FF2; --purple-dark:#6230D4; }
    * { box-sizing:border-box; margin:0; }
    body { min-height:100vh; display:grid; place-items:center; padding:24px;
           background:var(--lime); color:var(--ink);
           font-family:'Nunito',system-ui,-apple-system,sans-serif; text-align:center; }
    .card { width:100%; max-width:380px; }
    h1 { font-family:'Fredoka',system-ui,sans-serif; font-weight:600; font-size:28px; margin-bottom:8px; }
    p  { font-size:16px; line-height:1.5; color:#3A3A3A; margin-bottom:20px; }
    input { width:100%; background:#fff; border:2px solid var(--ink); border-radius:100px;
            padding:16px 22px; font-size:16px; margin-bottom:12px; font-family:inherit; }
    /* Purple primary button — matches the rest of the landing page. */
    button { width:100%; background:var(--purple); color:#fff; border:2px solid var(--ink);
             border-radius:100px; padding:16px; font-size:17px; font-weight:700; cursor:pointer;
             font-family:inherit; transition:background-color .15s ease; }
    button:hover { background:var(--purple-dark); }
    button:disabled { opacity:.6; cursor:default; }
    .err { color:var(--err); font-size:14px; font-weight:700; min-height:18px; margin-bottom:8px; }
    [hidden] { display:none; }
  </style>
</head>
<body>
  <main class="card">
    <p id="loading">Checking your reset link…</p>

    <section id="form" hidden>
      <h1>Set a new password</h1>
      <p>Choose a new password for your Monstir account.</p>
      <input id="pw"  type="password" placeholder="New password" autocomplete="new-password" />
      <input id="pw2" type="password" placeholder="Confirm new password" autocomplete="new-password" />
      <div class="err" id="err"></div>
      <button id="submit">Update password</button>
    </section>

    <section id="done" hidden>
      <h1>Password updated! 🎉</h1>
      <p>Head back to the Monstir app and log in with your new password.</p>
    </section>

    <section id="invalid" hidden>
      <h1>Link expired</h1>
      <p>This reset link has expired or has already been used. Open the Monstir app, tap
         <strong>Forgot password</strong>, and we'll send a fresh one.</p>
    </section>
  </main>

  <!-- supabase-js, self-hosted from npm. NEVER load from a CDN. -->
  <script type="module">
    import { createClient } from '/vendor/supabase.js';

    const supabase = createClient(
      '${SUPABASE_URL}',
      '${SUPABASE_ANON_KEY}',
      { auth: { detectSessionInUrl: true, persistSession: false } },
    );

    const $ = id => document.getElementById(id);
    const show = s => ['loading','form','done','invalid'].forEach(x => $(x).hidden = x !== s);

    let ready = false;
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') { ready = true; show('form'); }
    });

    // Fallback: if no recovery session materialized, show "expired" — never a blank form.
    setTimeout(async () => {
      if (ready) return;
      const { data: { session } } = await supabase.auth.getSession();
      show(session ? 'form' : 'invalid');
    }, 1500);

    $('submit').addEventListener('click', async () => {
      const pw = $('pw').value, pw2 = $('pw2').value;
      $('err').textContent = '';
      if (pw.length < 6) { $('err').textContent = 'Password must be at least 6 characters.'; return; }
      if (pw !== pw2)    { $('err').textContent = "Passwords don't match."; return; }
      $('submit').disabled = true;
      const { error } = await supabase.auth.updateUser({ password: pw });
      $('submit').disabled = false;
      if (error) { $('err').textContent = error.message; return; }
      await supabase.auth.signOut();
      show('done');
    });
  </script>
</body>
</html>
`;

export function GET() {
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex",
    },
  });
}
