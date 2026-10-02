"""Morning review: builds OUT/index.html with before | after per route (1440 and 390) from shots.cjs output, and,
if OUT/log.md exists, lists it on top. Usage: OUT=./review python3 morning.py"""
import glob,os
from PIL import Image
OUT=os.environ.get('OUT','./review')
names=sorted({os.path.basename(f) for f in glob.glob(f'{OUT}/before/*.png')} & {os.path.basename(f) for f in glob.glob(f'{OUT}/after/*.png')})
os.makedirs(f'{OUT}/pairs',exist_ok=True); rows=[]
for n in names:
    a=Image.open(f'{OUT}/before/{n}').convert('RGB'); b=Image.open(f'{OUT}/after/{n}').convert('RGB')
    s=0.32 if n.endswith('1440.png') else 0.5
    a=a.resize((int(a.width*s),int(a.height*s))); b=b.resize((int(b.width*s),int(b.height*s)))
    m=Image.new('RGB',(a.width+b.width+12,max(a.height,b.height)),(255,0,255)); m.paste(a,(0,0)); m.paste(b,(a.width+12,0))
    m.save(f'{OUT}/pairs/{n[:-4]}.jpg',quality=78); rows.append(n[:-4])
log=open(f'{OUT}/log.md').read() if os.path.exists(f'{OUT}/log.md') else ''
html='<!doctype html><meta charset=utf-8><title>Before / after</title><body style="font:15px system-ui;background:#111;color:#eee;margin:20px"><h1>Before | after</h1><pre style="white-space:pre-wrap">%s</pre>'%log
for r in rows: html+=f'<h2>{r}</h2><img src="pairs/{r}.jpg" style="max-width:100%">'
open(f'{OUT}/index.html','w').write(html); print(len(rows),'pairs ->',f'{OUT}/index.html')
