from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
def get_database():
    MONGO_URI = os.getenv("MONGO_URI")
    client = MongoClient(MONGO_URI)
    return client['savedrecipes']


# save and get user emails
def get_all_user_ids():
    saved_db = get_database()
    users_collection = saved_db['users']
    user_ids_cursor = users_collection.find({}, {'_id': 0, 'userId': 1})
    
    user_ids = [user['userId'] for user in user_ids_cursor]
    
    return user_ids

def save_user_info(user_id):
    saved_db = get_database()
    users_collection = saved_db['users']
    existing_user = users_collection.find_one({'userId': user_id})

    if not existing_user:
        users_collection.insert_one({'userId': user_id, 'recipes': []})
        print(f"User ID {user_id} created successfully")
    else:
        print(f"User ID {user_id} already exists")

def get_user_recipes(user_id):
    saved_db = get_database()
    users_collection = saved_db['users']
    user = users_collection.find_one({'userId': user_id}, {'_id': 0, 'recipes': 1})

    if user:
        return user.get('recipes', [])
    else:
        return []

def save_recipe(user_id, recipe):
    saved_db = get_database()
    users_collection = saved_db['users']
    users_collection.update_one({'userId': user_id}, {'$push': {'recipes': recipe}})
    print(f"Recipe saved for user ID {user_id}")
    
def delete_recipe(user_id, recipe):
    saved_db = get_database()
    users_collection = saved_db['users']

    users_collection.update_one({'userId': user_id}, {'$pull': {'recipes': recipe}})
    print(f"Recipe deleted for user ID {user_id}")