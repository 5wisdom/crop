from unicodedata import name
from flask import Flask, request
from flask_cors import CORS
import os
from predictCrop import predictCrop

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './images'
CORS(app)
@app.route('/',methods=['POST'])
def hello_world():
    file = request.files.get('photo')
    target = os.path.join(app.config['UPLOAD_FOLDER'], 'test')
    if not os.path.isdir(target):
        os.mkdir(target)
    filename = file.filename
    destination = "/".join([target, filename])
    file.save(destination)

    return {"result":predictCrop(filename)}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port= '8080')

