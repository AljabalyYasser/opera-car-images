import json,sys,re
base=sys.argv[1]
cats=json.load(open('/tmp/claude-0/-home-claude/145923c1-d1c4-5e89-a5dd-5fffd307b266/scratchpad/theme/caturls.json'))
cfg=json.load(open('src/content.json'))
js=open('src/opera.js').read().replace('__IMG__',base+'theme/img/').replace('__CATS__',json.dumps(cats,ensure_ascii=False)).replace('__ARTICLES__',json.dumps(cfg['articles'],ensure_ascii=False)).replace('__PAGES__',json.dumps(cfg['pages'],ensure_ascii=False)).replace('__TREE__',open('/tmp/claude-0/-home-claude/145923c1-d1c4-5e89-a5dd-5fffd307b266/scratchpad/theme/tree.json').read())
open('dist/opera.js','w').write(js)
open('dist/opera.css','w').write(open('src/opera.css').read())
print(len(js), len(open('dist/opera.css').read()))
