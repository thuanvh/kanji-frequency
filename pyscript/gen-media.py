import json
import shutil
import os
mediamapfile = "C:\\Users\\Thuan\\Downloads\\01_NihongoShark_com_Kanji\\media"
mediafolder = "C:\\Users\\Thuan\\Downloads\\01_NihongoShark_com_Kanji"
outputfolder = "..\\media\\"
data = json.load(open(mediamapfile,"r", encoding="utf-8"))
os.mkdir(outputfolder)
for i in range(0,len(data)):
  srcfile = str(i)
  dstfile = data[str(i)]
  print("copy", mediafolder + "\\" + srcfile, outputfolder + "\\" + dstfile)
  shutil.copy(mediafolder + "\\" + srcfile, outputfolder + "\\" + dstfile)