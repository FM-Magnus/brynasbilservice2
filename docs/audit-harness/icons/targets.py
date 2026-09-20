import json,os
S=os.environ['S']+'/icons-phase0/'
src=json.load(open(S+'sources.json')); col=json.load(open(S+'collected.json'))
local=[i for i in src if i['kind']=='local']
OWN={'header':'components/layout/PublicHeader.tsx','footer':'components/layout/PublicFooter.tsx','cfc':'components/ui/ContactFormCard.tsx','/':'pages/landing/LandingPage.tsx','/kontakt':'pages/ContactPage.tsx','/om-oss':'pages/AboutPage.tsx','/bargning':'pages/BargningPage.tsx'}
def owner(r,route):
    if r['inHeader']: return OWN['header']
    if r['inFooter']: return OWN['footer']
    if any('bb-contact' in c for c in r['chain']) or 'bb-contact' in r['cls']: return OWN['cfc']
    return OWN.get(route)
MAP={('PublicHeader.tsx','PhoneIcon'):'PhoneIcon',('LandingPage.tsx','Icon:phone'):'PhoneIcon',('ContactFormCard.tsx','Icon:phone'):'PhoneIcon',
('PublicFooter.tsx','PinIcon'):'MapPinIcon',('LandingPage.tsx','Icon:pin'):'MapPinIcon',('ContactFormCard.tsx','Icon:pin'):'MapPinIcon',
('LandingPage.tsx','Icon:check'):'CheckIcon',('LandingPage.tsx','Icon:arrow'):'ArrowRightIcon',('BargningPage.tsx','FlowArrowIcon'):'ArrowRightIcon',('AboutPage.tsx','FlowArrowIcon'):'ArrowRightIcon',
('LandingPage.tsx','Icon:wrench'):'WrenchIcon',('LandingPage.tsx','Icon:monitor'):'MonitorIcon',('LandingPage.tsx','Icon:shield'):'ShieldIcon',('LandingPage.tsx','Icon:clock'):'ClockIcon',
('LandingPage.tsx','Icon:chat'):'ChatDotsIcon',('LandingPage.tsx','Icon:car'):'CarSaleIcon'}
out=[]
for d in local:
    k=(d['file'].split('/')[-1],d['name'])
    if k not in MAP: continue
    best=None
    for e in col:
        for r in e['svgs']:
            if owner(r,e['route'])==d['file'] and json.dumps(r['sig'],sort_keys=True)==json.dumps(d['sig'],sort_keys=True) and not r['hidden']:
                pref=(0 if (e['state']=='top' and e['vp']=='d1440') else 1 if e['state']=='menu-open' else 2)
                if best is None or pref<best[0]: best=(pref,e,r)
    if best:
        _,e,r=best; out.append(dict(file=d['file'].split('/')[-1],name=d['name'],shared=MAP[k],route=e['route'],vp=e['vp'],state=e['state'],idx=r['idx'],box=r['box']))
    else: out.append(dict(file=d['file'].split('/')[-1],name=d['name'],shared=MAP[k],missing=True))
json.dump(out,open(S+'compare_targets.json','w'),indent=1)
for o in out: print(o)
