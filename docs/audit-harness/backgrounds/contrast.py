"""Per-element text contrast over the screenshots made by contrast.cjs.
Each text box is checked against its own computed colour: the brightest 5% of pixels for light text,
the darkest 5% for dark text. Target 4.5:1 body, 3:1 large. Usage: OUT=./out python3 contrast.py"""

import json,glob,numpy as np
from PIL import Image
def lin(c): c=c/255; return np.where(c<=0.03928,c/12.92,((c+0.055)/1.055)**2.4)
def L(rgb): r=lin(np.asarray(rgb,float)); return 0.2126*r[...,0]+0.7152*r[...,1]+0.0722*r[...,2]
for f in sorted(glob.glob((__import__('os').environ.get('OUT','./out')+'/c_*.json'))):
    d=json.load(open(f)); im=Image.open(f.replace('.json','.png')).convert('RGB'); W,H=im.size
    worst=99; wb=None
    for x,y,w,h,r,g,b in d['boxes']:
        x0,y0,x1,y1=max(0,int(x)),max(0,int(y)),min(W,int(x+w)),min(H,int(y+h))
        if x1<=x0 or y1<=y0: continue
        l=L(np.asarray(im.crop((x0,y0,x1,y1))).reshape(-1,3)); n=max(1,len(l)//20)
        li=float(L(np.array([r,g,b])))
        if li>0.4: c=(li+0.05)/(np.sort(l)[-n:].mean()+0.05)
        else: c=(np.sort(l)[:n].mean()+0.05)/(li+0.05)
        if c<worst: worst=c; wb=(int(x),int(y),(r,g,b))
    print(f.split('/')[-1][:-5],'worst element contrast %.2f'%worst,wb)
