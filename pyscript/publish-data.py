# import csv
# with open('anki-nihon.csv', 'rb') as f:
#   reader = csv.reader(f)
#   your_list = list(reader)

# print(your_list)

import pandas as pd
import json

k=json.load(open("allraw.json","r", encoding="utf-8"))
json.dump(k, open("../all2000.json","w", encoding="utf-8"))