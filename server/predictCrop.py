from fileinput import filename
from keras.models import load_model
import tensorflow
import numpy as np
from keras.utils import load_img, img_to_array
import matplotlib.pyplot as plt
import os

plantType = {
    'Strawberry' : "딸기" ,
    'WaterMelon' : "수박" ,
    'KoreanMelon' : "참외" ,
    'Grape' : "포도"
} 


def predictCrop(imgFileName, crop):
  model1 = tensorflow.keras.models.load_model('/Users/jihye/croptest/face-detection/server/files/딸기흰가루병mnet2.h5')
  model2 = tensorflow.keras.models.load_model('/Users/jihye/croptest/face-detection/server/files/수박흰가루병mnet2.h5')
  model3 = tensorflow.keras.models.load_model('/Users/jihye/croptest/face-detection/server/files/참외노균병mnet2.h5')
  model4 = tensorflow.keras.models.load_model('/Users/jihye/croptest/face-detection/server/files/참외흰가루병mnet2.h5')
  model5 = tensorflow.keras.models.load_model('/Users/jihye/croptest/face-detection/server/files/포도노균병mnet2.h5')
  model6 = tensorflow.keras.models.load_model('/Users/jihye/croptest/face-detection/server/files/고추마일드모틀바이러스병mnet2.h5')
  model7 = tensorflow.keras.models.load_model('/Users/jihye/croptest/face-detection/server/files/참외_1000_CNN_50.h5')

  sample_dir = '/Users/jihye/croptest/face-detection/server/images/test/'+ imgFileName
  #sample_dir = os.path.join(os.path.abspath("./images"),'딸기흰가루병1.png')
  # predicting images
  img = load_img(sample_dir, target_size=(200, 200))
  x = img_to_array(img)
  x = np.expand_dims(x, axis=0)
  images = np.vstack([x])

  path = sample_dir
  img = load_img(path, target_size=(200, 200))
  x = img_to_array(img)
  # plt.imshow(x/255.)
  x = np.expand_dims(x, axis=0)
  images = np.vstack([x])

  classes = ""

  if(crop == '딸기'):
    classes = model1.predict(images, batch_size=10)
    print(classes[0])
    if classes[0]<0.6:
      return "정상"
    else:
      return "딸기흰가루병"

  if(crop == '수박'):
    classes = model2.predict(images, batch_size=10)
    print(classes[0])
    if classes[0]<0.6:
      return "정상"
    else:
      return "수박흰가루병"
  
    
  if(crop == '참외'):
    classes = model3.predict(images, batch_size=10)
    print(classes[0])
    if classes[0]<0.6:
      return "정상"
    else:
      return "참외노균병"

  if(crop == '포도'):
    classes = model5.predict(images, batch_size=10)
    print(classes[0])
    if classes[0]<0.6:
      return "정상"
    else:
      return "포도흰가루병"

  if(crop == '고추'):
    classes = model6.predict(images, batch_size=10)
    print(classes[0])
    if classes[0]<0.6:
      return "정상"
    else:
      return "고추마일드모틀바이러스병"      

# disease = []
# for model in models:
#     classes = model[list(model.keys())[0]].predict(images, batch_size=10)
#     if(classes[0] > 0,5):
#         disease =  list(model.values())[0]
#         print(classes[0])
#         print("이상없")
# if len(disease) == 0:
#     print("정상")
# else:
#     print(disease[0])
#     print("이상없")
# 현재 넘어온 사진이 딸기인지 참외인지 구분
# 이 함수로 넘어올때 내가찍은사진이 수박인지 딸기인지 참외인지 포도인지
# 리스트 를 순회하고 모든 결과값이 0.5 미만 이라면 정상
# 0.5 이상이라면 가장 높은 값의 병을 리턴
