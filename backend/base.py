from flask import Flask , request , jsonify , flash
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash , check_password_hash

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql://root:@127.0.0.1/employee_details'
app.config['SECRET_KEY'] = 'Any_random key works '
CORS(app)   
db = SQLAlchemy(app) 
 
class basic(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(80),nullable=False)
    # lname = db.Column(db.String(120),nullable=False)
    email = db.Column(db.String(120), unique=True , nullable=False)
    password = db.Column(db.String(120),nullable=False)
    type = db.Column(db.String(15),nullable=False)
    salary = db.Column(db.Integer, nullable=False)
    last_login= db.Column(db.DateTime,default = datetime.now) 

         
    

@app.route('/' , methods = ['GET' , 'POST'])
def my_profile():
    email = request.json['email']
    password = request.json['password']  
    
    print(request.json)
    
    user = basic.query.filter_by(email = email).first() 
    
    if user : 
        if check_password_hash(user.password,password) : 
            print(user.id)
            
        else : 
            flash("Incorrect password , try again ",category = 'error') 
            return jsonify({"error" : "Incorrect Password try again!"})
    else : 
        flash("Email does not exist ,  Register first !" , category = "error")
        return jsonify({"error" : "Email does not exist ,  Register first !"})
        
    
    return jsonify({"success" : "Successfully Logged in!"})

@app.route('/signup', methods = ['GET','POST'])
def signup():
    email = request.json['email']
    fname = request.json['fname']
    lname = request.json['lname']
    password = request.json['password']
    password2 = request.json['password2']
    salary = 0 
    type=""
    
    password = generate_password_hash(password,method='sha256')
    
    user = basic.query.filter_by(email = email).first() 
    
    if user : 
        print(user.email , email)
        if user.email == email : 
            flash("email is already taken", category = "error")
            return jsonify({"error" : " Email is already taken!!"})
    
    entry = basic(fname=fname,email=email,password=password,type=type,salary=salary)
    print(entry)
    db.session.add(entry)
    db.session.commit()
    print(email , fname , password , password2)
    return jsonify({"success": " Account Successfully Created"})

@app.route('/userpage' , methods = ['GET','POST'])
def userpage():
    type = request.json['type']
    salary = request.json['salary']
    email = request.json['email']
    user = basic.query.filter_by(email = email).first()
    user.type = type
    user.salary = salary 
    print(user)
    db.session.commit()
    print(type , salary ,email)
    return jsonify({"Sucess": "Data successfully stored in Database"})


    