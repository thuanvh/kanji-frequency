from os import listdir
from os.path import isfile, join

import cv2
import os
import subprocess


mypath = "../media"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f)) and f.startswith("E") and f.endswith(".png")]
for f in onlyfiles:
  print(f)
  fullpath = join(mypath,f)
  img = cv2.imread(fullpath)
  print(img.shape)
  h = img.shape[0]
  w = img.shape[1]
  count = int(w/h + 0.5)
  print(h,"*",w,"Count:",count)
  output_path = "../media_gif"
  if not os.path.exists(output_path) :
    os.mkdir(output_path)
  temp_path = "../media_pngele"
  if not os.path.exists(temp_path) :
    os.mkdir(temp_path)
  fname = os.path.splitext(os.path.basename(f))[0]
  imglist = []
  for i in range(count):
    print("image ele ", i)
    img_ele = img[:,h*i:h*(i+1),:]
    img_name = join(temp_path, fname +"." + str(i) + ".png")
    cv2.imwrite(img_name, img_ele)
    imglist.append(img_name)

  params = ["magick", "-loop", "0", "-delay", "100", join(output_path, fname + ".gif")]
  params[-1:-1] = imglist
  print(params)
  subprocess.run(params)
  #convert -loop 0 -delay 100 in1.png in2.png out.gif

