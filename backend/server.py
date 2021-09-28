#!/usr/bin/python3

from flask import Flask

app = Flask(__name__)

@app.route('/')
def top():
    name = "test"
    return name + "\n"

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8000) 
