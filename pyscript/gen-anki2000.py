import pandas as pd
import json
import os

datadict =json.load(open("all2000.json","r", encoding="utf-8"))
sorted_by_value = sorted(datadict.items(), 
  key=lambda kv: int(kv[1]["id"]))
clist=[]
#i=0
for k in sorted_by_value:
  clist.append(k[0])
  #i+=1
  #if i== 10 : break
outputidx=0
outputsize=100
breakNow=False
bname="anki2k"
while not breakNow:
  startidx = outputidx * outputsize
  endidx = startidx + outputsize
  if endidx > len(clist):
    endidx = len(clist)
    breakNow=True
  print(startidx,endidx)
  json.dump(clist[startidx:endidx], open("../data-order/"+ bname + str(outputidx) + ".json","w",encoding="utf-8"), ensure_ascii=False)
  outputidx +=1# = outputidx +1


