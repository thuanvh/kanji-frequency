# import csv
# with open('anki-nihon.csv', 'rb') as f:
#   reader = csv.reader(f)
#   your_list = list(reader)

# print(your_list)

import pandas as pd
import json
import os

#datadict =json.load(open("allraw.json","r", encoding="utf-8"))
#json.dump(k, open("../all2000.json","w", encoding="utf-8"))

for dirpath,dirnames,filenames in os.walk("data"):
  for f in filenames:
    fullpath = os.path.join(dirpath,f)
    data = json.load(open(fullpath,"r", encoding="utf-8"))
    data.pop("frameNoV4",None)
    data.pop("frameNoV6",None)
    data.pop("heisigComment",None)
    data.pop("heisigStory",None)
    data.pop("hint",None)
    data.pop("id",None)
    data.pop("jlpt",None)
    data.pop("jouYou",None)
    data.pop("koohiiStory1",None)
    data.pop("koohiiStory2",None)
    data.pop("lessonNo",None)
    data.pop("strokeCount",None)
    json.dump(data, open("../data/" + f,"w", encoding="utf-8"))
