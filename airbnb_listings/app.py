import pandas as pd
import numpy as np
import plotly
import plotly.plotly as py
import plotly.graph_objs as go
import os

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

SQLALCHEMY_TRACK_MODIFICATIONS = False
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/project2.sqlite"
db = SQLAlchemy(app)

Base = automap_base()
Base.prepare(db.engine, reflect=True)

@app.route("/")
def home_page():
    return render_template("index.html")

@app.route("/project_analysis.html")
def renderHTML():
    return render_template("project_analysis.html")

@app.route("/getCityDetails")
def getCityDetails():
    data = [{
        "location": { "coordinates":[40.7, -73.95]},
        "location": { "coordinates":[40.6, -73.85]}
}]
    return jsonify(data)  

@app.route("/api/table_analysis")
def table_analysis():
    results = pd.read_sql("select * from listings", con=db.engine)
    csv_results = results.to_csv()
    return csv_results
     
if __name__ == "__main__":
    app.run(debug=True)