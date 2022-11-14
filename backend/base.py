from flask import Flask , request , jsonify , flash
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql://root:@127.0.0.1/employee_details'
app.config['SECRET_KEY'] = 'kjehgfjkb lfkhwesjfkbkjfg'
CORS(app)   
db = SQLAlchemy(app)
 
class basic(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(80),nullable=False)
    lname = db.Column(db.String(120),nullable=False)
    email = db.Column(db.String(120), unique=True , nullable=False)
    password = db.Column(db.String(120),nullable=False)
    salary = db.Column(db.Integer, nullable=False)

         
    

@app.route('/' , methods = ['GET' , 'POST'])
def my_profile():
    email = request.json['email']
    password = request.json['password']     
    print(request.json)
    
    user = basic.query.filter_by(email = email).first() 
    
    if user : 
        if user.password == password : 
            flash("Logged in Successfully!" , category = 'success')
            print(user.id)
        else : 
            flash("Incorrect password , try again ",category = 'error') 
            return jsonify({"error" : "Incorrect Password try again!"})
    else : 
        flash("Email does not exist ,  Register first !" , category = "error")
        
    
    
    flash("login successful !!!")
    
    # res = {
    #     email : user.email 
    # }
    
    # return res 
    return jsonify({"hello" : "world"})

@app.route('/signup', methods = ['GET','POST'])
def signup():
    email = request.json['email']
    fname = request.json['fname']
    lname = request.json['lname']
    password = request.json['password']
    password2 = request.json['password2']
    salary = 0 
    # if password != password2 : 
    #     flash(" Password doesnt match , try again reload" , category = "error")
    #     return jsonify({"error" : "Passwords do not match"})
    
    user = basic.query.filter_by(email = email).first() 
    
    if user : 
        print(user.email , email)
        if user.email == email : 
            flash("email is already taken", category = "error")
            return jsonify({"error" : " Email is already taken!!"})
    
    entry = basic(fname=fname,lname=lname,email=email,password=password,salary=salary)
    print(entry)
    db.session.add(entry)
    db.session.commit()
    print(email , fname , lname , password , password2)
    return jsonify({"error": " Account Successfully Created"})

@app.route('/userpage' , methods = ['GET','POST'])
def userpage():
    type = request.json['type']
    salary = request.json['salary']
    email = request.json['email']
    user = basic.query.filter_by(email = email).first()
    user.salary = salary 
    db.session.commit()
    print(type , salary ,email)
    return jsonify({" hope ": " Your received the data NOOOO"})


    