from flask import (
    Flask,
    send_file,
)
from flask_cors import CORS
from werkzeug.security import safe_join
import os
import json

app = Flask(__name__)
CORS(app)

@app.route("/resourcesapi/<path:filename>")
def serve(filename):
    relpath = safe_join('resources', filename)
    if os.path.isdir(relpath):
        return json.dumps([x.name for x in os.scandir(relpath)]), 200
    elif os.path.isfile(relpath):
        return send_file(relpath)
    else:
        return "Not found", 404

app.run(host="0.0.0.0", port=5000)