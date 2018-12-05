import os
import json
import re

for dirpath, dirnames, filenames in os.walk("data"):
  for fname in filenames:
    fullpath = os.path.join(dirpath, fname)
    data=json.load(open(fullpath,"r",encoding="utf-8"),encoding="utf-8")
    w=data["words"]
    if type(w) is str:      
      allw=[]
      w=w.strip()
      if len(w) > 0 :
        w=w.split("<br>")
        for l in w :
          #print(l)
          #a = re.split('\(|\)|:', l)
          a=[]
          for i in range(0,len(l)):
            if l[i]=='(':
              a.append(l[0:i])
              break
          start=i+1
          for j in range(start,len(l)):
            if l[j]==')':
              a.append(l[start:j])
              break
          a.append(l[(j+2):len(l)].strip())
          #print(a)
          allw.append(a)
      data["words"]=allw
      json.dump(data, open(fullpath,"w", encoding="utf-8"), indent=2, ensure_ascii=False, sort_keys=True)
      #break