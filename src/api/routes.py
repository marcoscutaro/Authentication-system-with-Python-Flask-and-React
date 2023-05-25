from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)
# Register and Login implementation
@api.route('/register', methods=['POST'])
def register_user():
    body = request.json
    user_already_exist = User.query.filter_by(email = body["email"]).first()
    if user_already_exist:
        return jsonify({"msg" : "Email already in use"}), 403 
    user = User(email= body["email"], password= body["password"])
    db.session.add(user)
    db.session.commit()

    return jsonify({"msg" : "Registered"}), 200

@api.route('/login', methods=['POST']) 
def login_user():
    body = request.json
    user = User.query.filter_by(email= body["email"], password= body["password"]).first()
    if user:
         token = create_access_token(identity=user.id)
         return jsonify({"token" : token}), 200
    
    return jsonify({"msg" : "Error with credentials"}), 403


# @api.route("/token", methods=["POST"])
# def create_token():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     # Query your database for username and password
#     user = User.query.filter_by(email=email, password=password).first()
#     if not user:
#         # the user was not found on the database
#         return jsonify({"msg": "Bad email or password"}), 401
    
#     # create a new token with the user id inside
#     access_token = create_access_token(identity=user.id)
#     return jsonify({ "token": access_token, "user_id": user.id })










# User routes

# Read all the users
# Method GET
# Path '/users'
@api.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    users = User.query.all()
    return jsonify({"users": [user.serialize() for user in users]}), 200

# Read a user by the id
# Method GET
# Path '/users/<int:user_id>'
@api.route('/user', methods=['GET'])
@jwt_required()
def get_user_by_id(user_id):
    user_id = get_jwt_identity()
    print(user_id)
    user = User.query.get(user_id)
    if user:
        serialized_user = user.serialize()
        return jsonify({"user": serialized_user}), 200
    else:
        return jsonify({"error": "User not found"}), 404





@api.route('/protected', methods=['GET'])
@jwt_required()
def get_protected_info():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        serialized_user = user.serialize()
        return jsonify({"user": serialized_user}), 200
    else:
        return jsonify({"error": "User not found"}), 404


# Create a user
# Method POST
# Path '/users'
@api.route('/users', methods=['POST'])
def create_user():
    # get request data
    data = request.get_json()

    # Create a new user object
    user = User(username=data['username'], avatar=data['avatar'], email=data['email'], name=data['name'], surname=data['surname'], password=data['password'])

    # Add new user to the database
    db.session.add(user)
    db.session.commit()

    # Serialize user object to JSON
    serialized_user = user.serialize()

    # Return serialized User as JSON response
    return jsonify({'user': serialized_user}), 201

# Update a user by the id
# Method PUT
# Path '/users/<int:user_id>'
@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user_by_id(user_id):
    # Fetch user from the database
    user = User.query.get(user_id)
    # Check if the user with the given id exists
    if user:
        # Update the User's attributes from the request data
        user.username =  request.json.get('name', user.username)
        user.avatar =  request.json.get('avatar', user.avatar)
        user.email =  request.json.get('email', user.email)
        user.name =  request.json.get('name', user.name)
        user.surname =  request.json.get('surname', user.surname)
        # TODO Complete all user's atributes that are also missing from the model

        # Commit the changes to the database
        db.session.commit() 

        # Serialize updated User object to a dictionary
        serialized_user = user.serialize()

        # Return the serialized User as JSON response
        return jsonify({'user': serialized_user}), 200
    else:
        return jsonify({"error": "User not found"}), 404

# Delete user by the id
# Method DELETE
# Path '/users/<int:user_id>'
@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user_by_id(user_id):
    # Fetch the user from the database
    user = User.query.get(user_id)

    # Check if the user with the given id exists
    if user:
        # Delete from the database
        db.session.delete(user)
        db.session.commit()

        # Return a success message as JSON
        return jsonify({'message': 'User deleted successfully'}), 200
    else:
        return jsonify({"error": "User not found"}), 404







