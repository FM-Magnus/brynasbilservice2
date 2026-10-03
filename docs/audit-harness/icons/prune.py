#!/usr/bin/env python3
"""List (or delete with --delete) icon-pool files that no source file references.

A file counts as used if its file name appears anywhere under client/src outside the pool folder
(TSX/TS/CSS imports or url()). Vite ships only imported files, so unused ones cost no bundle bytes;
this is the "clean out the leftovers before final deploy" step.
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
SRC = ROOT / 'client' / 'src'
POOL = SRC / 'assets' / 'images' / 'icons' / 'pool'

text = ''.join(
    p.read_text(errors='ignore')
    for p in SRC.rglob('*')
    if p.is_file() and POOL not in p.parents and p.suffix in {'.ts', '.tsx', '.css', '.html', '.json'}
)
files = sorted(POOL.glob('*.svg'))
unused = [f for f in files if f.name not in text]
print(f'{len(files) - len(unused)} used, {len(unused)} unused of {len(files)}')
if '--delete' in sys.argv:
    for f in unused:
        f.unlink()
    print(f'deleted {len(unused)} files')
else:
    for f in unused[:20]:
        print('  ', f.name)
    if len(unused) > 20:
        print(f'   ... and {len(unused) - 20} more (run with --delete to remove all unused)')
