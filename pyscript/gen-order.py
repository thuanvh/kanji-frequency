import json
import os
data=["aozora.json","news.json", "twitter.json","wikipedia.json"]
for f in data:
  clist=[]
  fullpath = os.path.join("..",f)
  bname = os.path.splitext(f)[0]
  print(bname)
  data = json.load(open(fullpath,"r", encoding="utf-8"))
  for i in range(1,len(data)):
    clist.append(data[i][0])
  outputidx=0
  outputsize=100
  breakNow=False
  while not breakNow:
    startidx = outputidx * outputsize
    endidx = startidx + outputsize
    if endidx > len(clist):
      endidx = len(clist)
      breakNow=True
    print(startidx,endidx)
    json.dump(clist[startidx:endidx], open("../data-order/"+ bname + str(outputidx) + ".json","w",encoding="utf-8"), ensure_ascii=False)
    outputidx +=1# = outputidx +1


