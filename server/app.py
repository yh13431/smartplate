from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_cors import CORS
from recommend import recommend_recipe_names
from nutrients import get_nutrients
from pymongo import MongoClient
import os
from recipe_routes import get_database, save_user_info, save_recipe, get_user_recipes, delete_recipe, get_all_user_ids


load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
def get_database():
    MONGO_URI = os.getenv("MONGO_URI")
    client = MongoClient(MONGO_URI)
    return client['savedrecipes']




@app.route('/get-all-user-ids', methods=['GET'])
def get_all_user_ids_route():
    try:
        user_ids = get_all_user_ids()
        return jsonify({'userIds': user_ids})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/save-user-id', methods=['POST'])
def save_user_id():
    try:
        data = request.json
        user_id = data.get('email')

        if user_id:
            save_user_info(user_id)
            return jsonify({'message': 'User ID saved successfully'})
        else:
            return jsonify({'error': 'Invalid request data'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/get-user-recipes', methods=['GET'])
def get_user_recipes_route():
    try:
        user_id = request.args.get('userId')

        if user_id:
            recipes = get_user_recipes(user_id)
            return jsonify({'recipes': recipes})
        else:
            return jsonify({'error': 'User ID not provided in query parameters'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/save-recipe', methods=['POST'])
def save_recipe_route():
    try:
        data = request.json
        user_id = data.get('userId')
        recipe = data.get('recipe')

        if user_id and recipe:
            save_recipe(user_id, recipe)
            return jsonify({'message': 'Recipe saved successfully'})
        else:
            return jsonify({'error': 'Invalid request data'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/delete-recipe', methods=['DELETE'])
def delete_recipe_route():
    try:
        data = request.json
        user_id = data.get('userId')
        recipe = data.get('recipe')

        if user_id and recipe:
            delete_recipe(user_id, recipe)
            return jsonify({'message': 'Recipe deleted successfully'})
        else:
            return jsonify({'error': 'Invalid request data'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500




@app.route('/get_nutrients', methods=['POST'])
def get_nutrients_endpoint():
    return get_nutrients()




@app.route('/recipes', methods=['POST'])
def recommend_recipes_endpoint():
    user_input = request.json
    recommended_recipes = recommend_recipe_names(user_input)
    print("Recommended recipes:", recommended_recipes)
    return jsonify({'recipes': recommended_recipes})




if __name__ == '__main__':
    saved_db = get_database()
    app.run(debug=True)