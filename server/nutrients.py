import os
import requests
from flask import request, jsonify

def get_nutrients():
    try:
        # get input data
        data = request.get_json()
        ingredients_query = data.get('query')
        
        # API endpoint and request payload
        api_url = 'https://trackapi.nutritionix.com/v2/natural/nutrients'
        headers = {
            'Content-Type': 'application/json',
            'x-app-id': os.getenv('NUTRITIONIX_APP_ID'),
            'x-app-key': os.getenv('NUTRITIONIX_APP_KEY'),
        }
        payload = {"query": ingredients_query}

        # API call
        response = requests.post(api_url, headers=headers, json=payload)
        
        # Return data
        if response.status_code == 200:
            nutrition_data = response.json().get('foods', [])
            formatted_response = format_nutrition_facts(nutrition_data)
            return jsonify(formatted_response)   
        else:
            return jsonify({"error": f"Error {response.status_code}: {response.text}"}), response.status_code
    except Exception as e:
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500



# get macros and return to frontend
def format_nutrition_facts(food_items):
    formatted_data = []
    total_calories = 0
    total_protein = 0
    total_carbohydrates = 0
    total_fats = 0

    for item in food_items:
        formatted_item = {
            "food_name": item.get("food_name"),
            "servings": item.get("serving_qty"),
            "calories": item.get("nf_calories"),
            "protein": item.get("nf_protein"),
            "carbohydrates": item.get("nf_total_carbohydrate"),
            "fats": item.get("nf_total_fat")
        }
        total_calories += formatted_item["calories"]
        total_protein += formatted_item["protein"]
        total_carbohydrates += formatted_item["carbohydrates"]
        total_fats += formatted_item["fats"]
        formatted_data.append(formatted_item)

    totals = {
        "total_calories": total_calories,
        "total_protein": total_protein,
        "total_carbohydrates": total_carbohydrates,
        "total_fats": total_fats
    }
    return {"foods": formatted_data, "totals": totals}