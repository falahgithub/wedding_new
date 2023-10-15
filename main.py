from flask import Flask, render_template 
from flask_socketio import SocketIO, emit
import requests
 
app = Flask(__name__)
socketio = SocketIO(app)

sheet_endpoint_1 = "https://api.sheety.co/c5eec0a10c42539c48b9e5b67ec1c290/weddingSheet1/sheet1"
sheet_endpoint_2 = "https://api.sheety.co/c5eec0a10c42539c48b9e5b67ec1c290/weddingSheet1/sheet2"


header = {
    "Authorization": "Basic VGVhbS1HcmVlbi1DYXJkOnRlYU0tZ3JlZU4tY2FyRA=="
}

@app.route("/")
def home():
    return render_template("index.html")

@socketio.on("wish")
def connect(wish):
    print(wish)

    data_obj = {"sheet1":{
                        "comments":wish
        }}
    requests.post(sheet_endpoint_1,headers=header, json=data_obj)
    # with open("wishes.docx", "a", encoding='utf-8') as file:
    #     file.write(wish + "\n")
    
@socketio.on("connect")
def connect():
    response = requests.get(sheet_endpoint_1, headers=header)
    data = response.json()
    print(data)
    print("Sheety data", data["sheet1"])
    for line in data["sheet1"]:
        print(line["comments"])
        emit("wishes_to_print", line["comments"])




    # with open("wishes.docx", encoding="utf-8") as file:
    #     lines = file.readlines()
    #     print(lines)
    #     for line in lines:
    #         print(line.split("\n")[0])
            # emit("wishes_to_print", line.split("\n")[0])
        # print(lines[0].split("\n")[0])

@socketio.on("number")
def number(number):
    print(number)
    
    data_obj = {"sheet2":{
                        "numbers":number
        }}
    requests.post(sheet_endpoint_2,headers=header, json=data_obj)
    # with open("numbers.txt", "a", encoding='utf-8') as file:
    #     file.write(number +"\n")                                     

if __name__=="__main__":
    app.run(debug=True)