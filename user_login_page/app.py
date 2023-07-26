from flask import Flask, render_template

app = Flask(__name__)

# Route for the home page (index)
@app.route("/")
def index():
    return render_template("index.html")

# Route for the login page
@app.route("/login")
def login():
    return render_template("login.html")

# Route for the profile page
@app.route("/profile")
def profile():
    return render_template("profile.html")

if __name__ == "__main__":
    app.run(debug=True)
