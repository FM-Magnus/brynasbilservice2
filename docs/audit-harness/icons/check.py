#!/usr/bin/env python3
"""Preflight for icon-pool SVGs (also run before any new SVG is imported by hand or by an agent).

Fails on: no viewBox, <script>/<image>/<foreignObject>/<style>/event handlers, external references,
files over 25 KB, colours outside the allowed palette.
"""
import re, sys
from pathlib import Path

POOL = Path(__file__).resolve().parents[3] / 'client' / 'src' / 'assets' / 'images' / 'icons' / 'pool'
ALLOWED = {'#071416', '#0ab2c1', '#047784', '#ffffff', '#d48202', '#fca311', '#f09505'}
bad = []
for f in sorted(POOL.glob('*.svg')):
    s = f.read_text()
    if 'viewBox=' not in s: bad.append((f.name, 'no viewBox'))
    if re.search(r'<(script|image|foreignObject|style)\b|\son\w+=|href=|url\(', s, re.I): bad.append((f.name, 'forbidden element or reference'))
    if len(s) > 25_000: bad.append((f.name, f'{len(s)} bytes'))
    stray = {c.lower() for c in re.findall(r'#[0-9a-fA-F]{6}', s)} - ALLOWED
    if stray: bad.append((f.name, f'colours {sorted(stray)}'))
for n, why in bad: print(f'FAIL {n}: {why}')
print(f'checked {len(list(POOL.glob("*.svg")))} files, {len(bad)} problems')
sys.exit(1 if bad else 0)
