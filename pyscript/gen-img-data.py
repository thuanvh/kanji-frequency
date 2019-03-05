import os
import json
import re

for dirpath, dirnames, filenames in os.walk("data"):
  for fname in filenames:
    fullpath = os.path.join(dirpath, fname)
    data=json.load(open(fullpath,"r",encoding="utf-8"),encoding="utf-8")
    strokeDiagram=data["strokeDiagram"]    
    #print(strokeDiagram)
    if (type(strokeDiagram) is str) and (strokeDiagram != ""):            
      strokeDiagram = re.sub(r"^.*\"(?P<name>.*)\".*$","\g<name>",strokeDiagram)
      data["strokeDiagram"]=strokeDiagram
      #print(strokeDiagram)
      json.dump(data, open(fullpath,"w", encoding="utf-8"), indent=2, ensure_ascii=False, sort_keys=True)
      #break