from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    # 여기에 안면인식 정보를 받아들인다.
    # 받아들인 안면인식 정보를 기반으로 감정을 분석한다.
    # 분석한 감정을 응답해준다
    # sad, happy, angry
    return {'화남': '30%'}

if __name__ == '__main__':
    app.run()