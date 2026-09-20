# usage: S=... TARGETS=targets_x.json AFTER=collected_x_after.json python3 reaudit.py
import json,os
S=os.environ['S']+'/icons-phase0/'
before=json.load(open(S+'collected.json')); after=json.load(open(S+os.environ['AFTER'])); tar=json.load(open(S+os.environ['TARGETS']))
def recs(col,route): return {(e['vp'],e['state'],r['idx']):r for e in col if e['route']==route for r in e['svgs']}
bad=0; cache={}
for t in tar:
    b=cache.setdefault(('b',t['route']),recs(before,t['route'])); a=cache.setdefault(('a',t['route']),recs(after,t['route']))
    k=(t['vp'],t['state'],t['idx']); rb,ra=b[k],a[k]
    wb={p:(w['sel'],w['sheet']) for p,w in rb['winners'].items()}; wa={p:(w['sel'],w['sheet']) for p,w in ra['winners'].items()}
    if wb!=wa: bad+=1; print('WINNER CHANGED',t['name'],t['vp'],{p:(wb.get(p),wa.get(p)) for p in set(wb)|set(wa) if wb.get(p)!=wa.get(p)})
    if rb['box']!=ra['box']: bad+=1; print('BOX CHANGED',t['name'],rb['box'],ra['box'])
    if [x['sel'] for x in rb['rules']]!=[x['sel'] for x in ra['rules']]: bad+=1; print('MATCHED RULE SET CHANGED',t['name'])
counts={r:(len(cache[('b',r)]),len(cache[('a',r)])) for r in {t['route'] for t in tar}}
print('instances compared:',len(tar),'| winning-rule/box/matched-rule changes:',bad,'| svg count per route before/after:',counts)
