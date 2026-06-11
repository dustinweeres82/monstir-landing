// Landing target for Supabase's email-confirmation link.
//
// Served as a Route Handler (not a page) on purpose: route handlers bypass the
// root layout and ship NO client JavaScript — no React runtime, no Bugsnag, no
// fonts-from-Google. That matters here because Supabase redirects to this URL
// with a live session token in the URL fragment (`#access_token=...`). The
// fragment never reaches the server, but any JS on the page could read
// `window.location.hash`, so this page must contain ZERO JavaScript.
//
// Everything (fonts, mascot) is self-hosted from /public.

export const dynamic = "force-static";

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>Email confirmed · Monstir</title>
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
    :root { --lime:#C5F215; --ink:#1A1A1A; }
    * { box-sizing:border-box; margin:0; }
    body { min-height:100vh; display:grid; place-items:center; padding:24px;
           background:var(--lime); color:var(--ink);
           font-family:'Nunito',system-ui,-apple-system,sans-serif; text-align:center; }
    .card { max-width:420px; }
    img  { width:160px; height:auto; margin-bottom:24px; }
    h1   { font-family:'Fredoka',system-ui,sans-serif; font-weight:600; font-size:32px; margin-bottom:12px; }
    p    { font-size:17px; line-height:1.5; color:#3A3A3A; }
    .hint { margin-top:20px; font-size:14px; color:#5A5A5A; }
  </style>
</head>
<body>
  <main class="card">
    <img src="/logomark.png" alt="" />
    <h1>You're all set! ✓</h1>
    <p>Your Monstir account is verified. Hop back into the app and log in to start your family's adventure.</p>
    <p class="hint">You can close this tab.</p>
  </main>
</body>
</html>
`;

export function GET() {
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      // Belt-and-suspenders alongside the <meta> tag.
      "x-robots-tag": "noindex",
    },
  });
}
