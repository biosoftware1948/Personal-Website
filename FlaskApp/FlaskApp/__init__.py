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

@app.route("/.well-known/acme-challenge/<challenge>")
def letsencrypt_check(challenge):
    challenge_dictionary = {
            "AqHWwPuqUyy9ghCTbkz-OQAS5E2X2pLseFipXtX6W6Y":
            "AqHWwPuqUyy9ghCTbkz-OQAS5E2X2pLseFipXtX6W6Y.lWwPcj0C7stKhHWAa7b8EAJSvK7HzgHWKtLRy1kKSfk",
            "6cMPtuDn8KKs3amdeBGcYgqjj3PcXjjRVsrqajyBKFY":
            "6cMPtuDn8KKs3amdeBGcYgqjj3PcXjjRVsrqajyBKFY.lWwPcj0C7stKhHWAa7b8EAJSvK7HzgHWKtLRy1kKSfk"
            }
    return Response(challenge_dictionary[challenge], mimetype='text/plain')


if __name__ == "__main__":
    context = SSL.Context(SSL.SSLv23_METHOD)
    context.use_privatekey_file('etc/letsencrypt/live/mattfindlay.com/privkey.pem')
    context.use_certificate_file('/etc/letsencrypt/live/mattfindlay.com/fullchain.pem')
    app.run(ssl_context=(context))
