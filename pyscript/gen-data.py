# import csv
# with open('anki-nihon.csv', 'rb') as f:
#   reader = csv.reader(f)
#   your_list = list(reader)

# print(your_list)

import pandas as pd
import json

df = pd.read_csv('anki-nihon.csv', delimiter=',')
tuples =[tuple(x) for x in df.values]
dicts = df.to_dict()
#print(dicts.keys())
#print(len(dicts['flds']))
#print(dicts['flds'][0])
str1 = dicts['flds'][0]
#print(hex(ord(str1[3])))
str2 = str1.replace(str1[3],'__')
#print(str2)
str3 = str1.split('\x1f')
#print(str3)
alldict=dict()
for i in range(0, len(dicts['flds'])):
  #print(i)
  data = (dicts['flds'][i].split('\x1f'))
  key = data[4]
  alldict[key]=data
#print(alldict, file=open("all2000.json","w", encoding="utf-8"))
json.dump(alldict, open("all2000.json","w", encoding="utf-8"))
#print(alldict)


# import mpu.pd
# df = mpu.pd.example_df()

# tuples=[[row[col] for col in df.columns] for row in df.to_dict('')

