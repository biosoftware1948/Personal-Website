from flask import Flask, render_template,send_from_directory, Response, send_file
from OpenSSL import SSL


app = Flask(__name__, static_folder='static')

@app.route("/")
def hello():
    return render_template("home.html")

@app.route("/resume")
def show_resume():
    return send_file('static/PDFs/Matthew_Findlay_Resume.pdf', attachment_filename="Matthew Findlay Resume.pdf")

@app.route("/robots.txt")
def handle_robots():
    return send_from_directory("static", "robots.txt")

if __name__ == "__main__":
    app.run()
