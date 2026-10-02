"""How much of the photo still shows: compares v_<w>_with.png and v_<w>_without.png from visibility.cjs.
mean  = average absolute luma difference (0-255); seen = share of pixels differing by 10 or more;
rv    = mean / (mean luma of the card + 25): relative visibility, fair to dark and light cards alike.
Verdict (calibrated 2026-10-03 on slots Magnus approved or called faint): rv >= 0.05 VISIBLE (Bilservice tier cards 01/02 .06-.10,
Om oss CTA .14, guide dark cards .12); 0.03-0.05 FAINT (Felsokning and Dackservice white-veil cards .03); < 0.03 GONE
(Bargning pale card .016). Aim for VISIBLE on the one featured surface; FAINT is fine on a calm secondary surface.
Usage: OUT=./out python3 visibility.py"""
import glob,os,numpy as np
from PIL import Image
OUT=os.environ.get('OUT','./out')
for f in sorted(glob.glob(f'{OUT}/v_*_with.png')):
    a=np.asarray(Image.open(f).convert('L'),float); b=np.asarray(Image.open(f.replace('_with','_without')).convert('L'),float)
    h=min(a.shape[0],b.shape[0]); w=min(a.shape[1],b.shape[1]); d=np.abs(a[:h,:w]-b[:h,:w])
    rv=d.mean()/(a.mean()+25); v='VISIBLE' if rv>=0.05 else 'FAINT' if rv>=0.03 else 'GONE'
    print(os.path.basename(f).replace('_with.png',''),'mean %.1f  seen %.0f%%  rv %.3f  %s'%(d.mean(),100*(d>=10).mean(),rv,v))
