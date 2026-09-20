import json, os, collections
S=os.environ['S']+'/icons-phase0/'
src=json.load(open(S+'sources.json')); col=json.load(open(S+'collected.json'))
key=lambda sig: json.dumps(sig, sort_keys=True)
local=[i for i in src if i['kind']=='local']; shared=[i for i in src if i['kind']=='shared']
OWN={'header':'components/layout/PublicHeader.tsx','footer':'components/layout/PublicFooter.tsx','cfc':'components/ui/ContactFormCard.tsx',
     '/':'pages/landing/LandingPage.tsx','/kontakt':'pages/ContactPage.tsx','/om-oss':'pages/AboutPage.tsx','/bargning':'pages/BargningPage.tsx'}
def owner(rec,route):
    if rec['inHeader']: return OWN['header']
    if rec['inFooter']: return OWN['footer']
    if any('bb-contact' in c for c in rec['chain']) or 'bb-contact' in rec['cls']: return OWN['cfc']
    return OWN.get(route)
by_def=collections.defaultdict(list); shared_hits=collections.Counter(); unknown=collections.Counter()
skey={key(i['sig']):i['name'] for i in shared}
for e in col:
    for r in e['svgs']:
        o=owner(r,e['route']); k=key(r['sig']); hit=None
        if o:
            for d in local:
                if d['file']==o and key(d['sig'])==k: hit=d; break
        if hit: by_def[(hit['file'],hit['name'])].append((e,r))
        elif k in skey: shared_hits[skey[k]]+=1
        else: unknown[(o or '?',k[:60])]+=1
short=lambda f:f.split('/')[-1].replace('.tsx','')
rows=[]
for d in local:
    hits=by_def.get((d['file'],d['name']),[])
    top=[(e,r) for e,r in hits if e['state']=='top' or d['file'].endswith('PublicHeader.tsx')]
    routes=sorted({e['route'] for e,r in hits})
    inst=collections.Counter((e['vp']) for e,r in hits if e['state']=='top')
    sizes=sorted({(e['vp'],tuple(r['box'])) for e,r in hits if not r['hidden']})
    comp={p:sorted({r['computed'][p] for e,r in hits if not r['hidden']}) for p in ['stroke-width','stroke-linecap','fill','filter']}
    win=collections.defaultdict(set)
    for e,r in hits:
        for p,w in r['winners'].items(): win[p].add(f"{w['sel']} @{w['sheet'].split('/')[-1]}")
    rows.append(dict(d=d,routes=routes,inst=dict(inst),sizes=sizes,comp=comp,win={p:sorted(v) for p,v in win.items()},n=len(hits),hidden=sum(1 for e,r in hits if r['hidden'])))
json.dump(rows,open(S+'rows.json','w'),indent=1,default=list)
print('=== TABLE 1: inventory (rendered instances, all collected states)\n')
print(f"{'file':17}{'icon':20}{'defAttr sw/cap':15}{'inst(top d/m)':14}{'routes':7}{'rendered px (vp:WxH)':38}{'computed sw':12}{'cap':12}")
for r in rows:
    d=r['d']; a=d['svg']
    sw=a.get('strokeWidth','css'); cap=a.get('strokeLinecap','-')
    sz='; '.join(f"{v}:{w:g}x{h:g}" for v,(w,h) in r['sizes'][:4]) if r['sizes'] else '(not rendered)'
    print(f"{short(d['file']):17}{d['name']:20}{sw+'/'+cap:15}{str(r['inst'].get('d1440',0))+'/'+str(r['inst'].get('m390',0)):14}{len(r['routes']):<7}{sz[:37]:38}{','.join(r['comp']['stroke-width'])[:11]:12}{','.join(r['comp']['stroke-linecap'])[:11]:12}")
print('\nunattributed (shared/other) instances of shared icons by geometry:',dict(shared_hits.most_common(8)))
print('unknown-geometry svgs (owner,geom-prefix):',len(unknown),'kinds;',sum(unknown.values()),'instances')
