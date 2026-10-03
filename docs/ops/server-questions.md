# Questions for Johnny: what the server already does (2026-10-03)

Purpose: the site can load faster, but nothing should be optimised that the server already handles (stack: Cloudflare → nginx → Apache → Express, see [`../BACKEND.md`](../BACKEND.md)). Each question is a yes/no or one line and needs no change on his side. The answers decide what we do in the frontend and which `_headers` rules we write for the Netlify preview ([`netlify.md`](netlify.md)).

1. Is **Brotli** on in Cloudflare? (15–20 % smaller JS/CSS than gzip.)
2. Does the site run **HTTP/3** towards Cloudflare (Network → Protocols)?
3. Are **Polish, Mirage or Rocket Loader** on for this site? (They can rewrite images and JS and distort measurements.)
4. What is the **final address**, and does the site sit at the root or stay under `/brynasbilservice/`? (Decides `base`, canonical links, sitemap.)
5. Which headers does `/assets/*` get today? Ask for `curl -sI -H "Accept-Encoding: br,gzip" <url of any .js under /assets/>` (shows cache, compression, HTTP version, security headers at once). Untested against the live server.
6. Does Cloudflare cache **HTML** pages, or only static files?

Message sent or to send: opens with "Jag undrar för att det verkar som att sajten kan laddas snabbare, och jag vill inte optimera sådant som servern redan sköter."

## What fits now, while the site is still in development
Safe and reversible: Brotli, HTTP/3, Early Hints, long `immutable` cache on the hashed `/assets/*`, `noindex` + blocking `robots.txt`, mild security headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`), real 404 status for unknown paths, Cloudflare Polish/Mirage/Rocket Loader off.

## What waits until content and domain are fixed
`no-cache` on `index.html` (needs a deploy routine), HTML caching in Cloudflare (needs purge on deploy), prerendering (biggest LCP/SEO gain, best when the copy is final), sitemap/canonical (needs the final address), HSTS with preload (hard to undo), a strict CSP (build it against the real third parties, start in report-only), analytics and a cookie banner (decision first).

## Later, backend side
CORS and `Cache-Control` for `/api/*` (admin `no-store`, public lists `max-age=60`), rate limiting on `/api/bookings`, spam protection on forms, error format, outgoing mail (SMTP, SPF, DKIM, DMARC), deploy method (can Johnny take a finished `dist/` zip).
