# usage: FILES="pages/ContactPage.tsx" NAMES="MailIcon,SendIcon,ChevronDownIcon" OUT=targets_contact.json python3 make_targets.py
import json,os
S=os.environ['S']+'/icons-phase0/'
src=json.load(open(S+'sources.json')); col=json.load(open(S+'collected.json'))
files=os.environ['FILES'].split(','); names=set(os.environ['NAMES'].split(',')) if os.environ.get('NAMES') else None
local=[i for i in src if i['kind']=='local' and i['file'] in files and (names is None or i['name'] in names)]
OWN={'header':'components/layout/PublicHeader.tsx','footer':'components/layout/PublicFooter.tsx','cfc':'components/ui/ContactFormCard.tsx','/':'pages/landing/LandingPage.tsx','/kontakt':'pages/ContactPage.tsx','/om-oss':'pages/AboutPage.tsx','/bargning':'pages/BargningPage.tsx'}
def owner(r,route):
    if r['inHeader']: return OWN['header']
    if r['inFooter']: return OWN['footer']
    if any('bb-contact' in c for c in r['chain']) or 'bb-contact' in r['cls']: return OWN['cfc']
    return OWN.get(route)
out=[]
for e in col:
    for r in e['svgs']:
        o=owner(r,e['route'])
        for d in local:
            if d['file']==o and json.dumps(d['sig'],sort_keys=True)==json.dumps(r['sig'],sort_keys=True) and not r['hidden']:
                out.append(dict(name=d['name'],file=d['file'],route=e['route'],vp=e['vp'],state=e['state'],idx=r['idx'],baseline=r['computed'],baselineChild=r['childComputed']))
json.dump(out,open(S+os.environ['OUT'],'w'),indent=1)
print(len(out),'instances;',len({(o['route'],o['vp'],o['state']) for o in out}),'page states')
