import re, json, glob, os
ROOT=os.environ.get('REPO', os.getcwd()) + '/client/src/'
GEOM={'d','points','cx','cy','r','x','y','width','height','rx','ry','x1','y1','x2','y2'}
def sig(fragment):
    out=[]
    for m in re.finditer(r'<(path|circle|rect|line|polyline|polygon|ellipse)\b([^>]*?)/?>', fragment):
        attrs={k:v for k,v in re.findall(r'([a-zA-Z0-9]+)="([^"]*)"', m.group(2)) if k in GEOM}
        out.append([m.group(1), sorted(attrs.items())])
    return out
def svg_attrs(fragment):
    m=re.search(r'<svg\b([^>]*)>', fragment, re.S)
    if not m: return {}
    a=m.group(1)
    r={}
    for k in ['viewBox','fill','stroke','strokeLinecap','strokeLinejoin']:
        mm=re.search(k+r'=(?:"([^"]*)"|\{([^}]*)\})',a)
        if mm: r[k]=mm.group(1) or mm.group(2)
    mm=re.search(r'strokeWidth=(?:"([^"]*)"|\{([^}]*)\})',a)
    if mm: r['strokeWidth']=mm.group(1) or mm.group(2)
    return r
icons=[]
def add(kind,file,name,frag,extra=None):
    d={'kind':kind,'file':file,'name':name,'sig':sig(frag),'svg':svg_attrs(frag)}
    if extra: d.update(extra)
    icons.append(d)
# named functions (local + shared)
def named(path,kind):
    t=open(ROOT+path).read()
    for m in re.finditer(r'function (\w+)\(([^)]*)\)\s*\{(.*?)\n\}', t, re.S):
        n,args,body=m.groups()
        if '<svg' in body and (n.endswith('Icon')):
            add(kind,path,n,body,{'args':args.strip()[:60], 'static_uses':len(re.findall(r'<'+n+r'\b',t))})
for p in ['pages/BargningPage.tsx','pages/AboutPage.tsx','components/layout/PublicHeader.tsx','components/layout/PublicFooter.tsx','pages/ContactPage.tsx']:
    named(p,'local')
for p in sorted(glob.glob(ROOT+'components/icons/*.tsx')):
    named(os.path.relpath(p,ROOT),'shared')
# Landing switch-based Icon
t=open(ROOT+'pages/landing/LandingPage.tsx').read()
blk=t[t.index('const paths: Record<IconName'):t.index('return <svg {...common}>')]
common=re.search(r'const common = \{(.*?)\}\n',t,re.S).group(1)
for m in re.finditer(r'^\s{4}(\w+): (.*),$', blk, re.M):
    n,frag=m.groups()
    uses=len(re.findall(r"name=\"%s\""%n,t))+len(re.findall(r"icon: '%s'"%n,t))
    add('local','pages/landing/LandingPage.tsx','Icon:'+n,frag,{'svg':{'viewBox':'0 0 24 24','fill':'none','stroke':'currentColor','strokeWidth':'2','strokeLinecap':'round','strokeLinejoin':'round'},'static_uses':uses})
# ContactFormCard switch-based Icon
t=open(ROOT+'components/ui/ContactFormCard.tsx').read()
common=re.search(r'const common = \{(.*?)\n  \}',t,re.S).group(1)
cs={'viewBox':'0 0 24 24','fill':'none','stroke':'currentColor','strokeWidth':'2','strokeLinecap':'round','strokeLinejoin':'round'}
for m in re.finditer(r"case '(\w+)':\s*return \((.*?)\n      \)",t,re.S):
    n,frag=m.groups()
    add('local','components/ui/ContactFormCard.tsx','Icon:'+n,frag,{'svg':cs,'static_uses':len(re.findall(r'name="%s"'%n,t))+len(re.findall(r'Icon name="%s"'%n,t))})
json.dump(icons,open(os.environ['S']+'/icons-phase0/sources.json','w'),indent=1)
print(len(icons),'icons parsed;', sum(i['kind']=='local' for i in icons),'local;',sum(i['kind']=='shared' for i in icons),'shared')
for i in icons:
    if i['kind']=='local': print(f"{i['file'].split('/')[-1]:22} {i['name']:20} stroke={i['svg'].get('strokeWidth','(css)'):6} cap={i['svg'].get('strokeLinecap','-'):6} sig={len(i['sig'])} uses={i.get('static_uses','?')}")
