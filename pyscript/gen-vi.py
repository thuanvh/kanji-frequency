import json
import os
import urllib.request

for dirpath,dirnames,filenames in os.walk("data"):
  for f in filenames:
    char=os.path.splitext(f)[0]
    #print(char)    
    urlpath="https://mazii.net/api/search/"+urllib.request.quote(char)+"/10/1"
    #print(urlpath)
    #break
    with urllib.request.urlopen(urlpath) as response:
      data=json.loads(response.read().decode("utf-8"), encoding="utf-8")
      json.dump(data, open("data-vi/" + f,"w", encoding="utf-8"), indent=2, ensure_ascii=False, sort_keys=True)
      #print(data)
      #break
