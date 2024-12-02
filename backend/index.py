import logging

from datetime                       import datetime, timedelta 
from auth                           import auth
from patients                       import patients
from core.config                    import get_settings
from flask_cors                     import CORS
from flask                          import Flask, request, make_response, jsonify
from flask_jwt_extended             import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt, verify_jwt_in_request

settings = get_settings()

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

app = Flask(settings.PROJECT_NAME)
CORS(app, supports_credentials=True, resources={r"/*": { "origins": "*", "allow_headers": "*", "expose_headers": "*", "methods": ["GET","POST","PATCH","PUT","DELETE"]}})

app.config['SECRET_KEY'] = 'ru3ieQ0fqu8LbhqODbkhoe0sq3YjybSm'
app.config["JWT_SECRET"] = 'ikRgjkhi15HJiU78-OLKfjngiu'
app.config["JWT_ACCESS_TOEKEN_EXPIRES"] = timedelta(hours=10)
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(hours=10)
app.config["PROPAGATE_EXCEPTIONS}"] = True

jwt = JWTManager(app)

# # Set up CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route("/api")
def index():
    return "Hello, World!"

@app.route("/verify_token", methods=["POST"], endpoint="verify_token")
@jwt_required() 
def index():
    return jsonify({"valid": True})

@jwt.expired_token_loader
def my_expired_token_callback(jwt_header, jwt_payload):
    return jsonify(code="dave", err="I can't let you do that"), 401

@app.route('/api/account/login', methods=['POST'])
def login():
    data = request.json
    user = auth.login(data)
    if user:
        access_token = create_access_token(identity=user["id"])
        # token = jwt.encode({'public_id': user.id, 'exp' : datetime.utcnow() + timedelta(minutes=50)}, app.config['SECRET_KEY'])
        return make_response(jsonify({'serviceToken': access_token} | {"user": user}), 201)
    else:
        return make_response('Unable to verify', 403, {'WWW-Authenticate': 'Basic realm: "Authentication Failed"'})
    
@app.route('/api/account/register', methods=['POST'])
def register():
    data = request.json
    user = auth.register(data)
    if user:
        token = jwt.encode({'public_id': user.id, 'exp' : datetime.utcnow() + timedelta(minutes=50)}, app.config['SECRET_KEY'])
        return make_response(jsonify({'serviceToken': token.decode('UTF-8')} | user), 201)
    else:
        return make_response('Unable to verify', 403, {'WWW-Authenticate': 'Basic realm: "Authentication Failed"'})

@app.route("/api/patient/list", methods=["GET", "OPTIONS"])
@jwt_required() 
def get_patients():
    session_data = get_jwt_identity()
    print(session_data)
    r = patients.get_patients()
    return make_response(jsonify(r), r["status_code"])

@app.route('/api/patient/insert', methods=["POST"])
# @jwt_required()
def insert_patient():
    new_patient = request.json["patient"]
    r = patients.insert_patient(new_patient)
    return make_response(jsonify(r), r["status_code"])

if __name__ == '__main__':  
   app.run(debug=True, use_reloader=True)