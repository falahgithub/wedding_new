from flask import Flask, render_template 
from flask_socketio import SocketIO, emit
 
app = Flask(__name__)
socketio = SocketIO(app)

@app.route("/")
def home():
    return render_template("index.html")

@socketio.on("wish")
def connect(wish):
    print(wish)
    with open("wishes.docx", "a", encoding='utf-8') as file:
        file.write(wish + "\n")
    
@socketio.on("connect")
def connect():
    with open("wishes.docx", encoding="utf-8") as file:
        lines = file.readlines()
        print(lines)
        for line in lines:
            print(line.split("\n")[0])
            emit("wishes_to_print", line.split("\n")[0])
        # print(lines[0].split("\n")[0])

@socketio.on("number")
def number(number):
    print(number)
    with open("numbers.txt", "a", encoding='utf-8') as file:
        file.write(number +"\n")                                     

if __name__=="__main__":
    app.run(debug=True)