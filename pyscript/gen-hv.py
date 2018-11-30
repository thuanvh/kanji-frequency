import os
import json

hvdata = json.load(open('kanjimini.json',"r",encoding="utf-8"),encoding="utf-8")
for item in hvdata:
  w=item["w"]
  h=item["h"]
  fullpath=os.path.join("data",w+".json")
  if os.path.exists(fullpath):
    data=json.load(open(fullpath,"r",encoding="utf-8"),encoding="utf-8")
    data["hanviet"]=h
    json.dump(data, open(fullpath,"w", encoding="utf-8"), indent=2, ensure_ascii=False, sort_keys=True)
  else:
    data={
      "constituent": "",
      "frameNoV4": "",
      "frameNoV6": "",
      "heisigComment": "",
      "heisigStory": "",
      "hint": "",
      "id": "",
      "jlpt": "",
      "jouYou": "",
      "kanji": w,
      "keyword": "",
      "koohiiStory1": "",
      "koohiiStory2": "",
      "kunYomi": "",
      "lessonNo": "",
      "myStory": "",
      "onYomi": "",
      "readingExamples": "",
      "strokeCount": "",
      "strokeDiagram": "",
      "words": "",
      "hanviet": h
    }
    json.dump(data, open(fullpath,"w", encoding="utf-8"), indent=2, ensure_ascii=False, sort_keys=True)