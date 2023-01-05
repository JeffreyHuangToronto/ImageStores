import requests
img_path = 'jpeg.jpg'
url = 'http://localhost:3000/img'
files = {'file': ('images.png', open(img_path, 'rb'), 'image/jpeg')}
r = requests.post(url, files=files)
print(r.text)
