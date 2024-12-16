from flask import Flask, render_template
from monitoring_TT import monitoring_tt_bp
from monitoring_MRCH import monitoring_mrch_bp

# Initialize Flask app
app = Flask(__name__)

# Secret key for session management (e.g., flash messages)
app.secret_key = 'your_secret_key'

# Register the Blueprint
app.register_blueprint(monitoring_tt_bp, url_prefix='/monitoring_TT')
app.register_blueprint(monitoring_mrch_bp, url_prefix='/monitoring_MRCH')


# Home Page
@app.route('/')
def home():
    return render_template('index.html')

# Run the app
if __name__ == '__main__':
    app.run(debug=True, port=8080)
