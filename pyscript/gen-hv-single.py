import os
import json

hvdata = json.load(open('kanjimini.json',"r",encoding="utf-8"),encoding="utf-8")
for item in hvdata:
  w=item["w"]
  h=item["h"]
  fullpath=os.path.join("../data-hv",w+".json")
  json.dump(item, open(fullpath,"w", encoding="utf-8"), indent=2, ensure_ascii=False, sort_keys=True)