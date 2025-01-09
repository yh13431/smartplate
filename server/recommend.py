import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler

recipes_df = pd.read_csv('epi_r.csv')

def recommend_recipe_names(user_input):
    # vectorise inputted macronutrients
    user_vector = [[user_input['calories'], user_input['protein'], user_input['fat']]]

    # vectorise macronutrients of recipes from dataset
    recipes_vectors = recipes_df[['calories', 'protein', 'fat']].values
    
    # standardise macronutrient data and user input
    scaler = StandardScaler()
    recipes_vectors_scaled = scaler.fit_transform(recipes_vectors)
    user_vector_scaled = scaler.transform(user_vector)

    # compute cosine similarity between the user input and each recipe vector
    similarities = cosine_similarity(user_vector_scaled, recipes_vectors_scaled).flatten()

    # get indices of top 5 most similar recipes
    top_indices = similarities.argsort()[-5:][::1]

    # return recommended recipe names and their macronutrient values
    recommend_recipe_names = recipes_df.iloc[top_indices][['title', 'calories', 'protein', 'fat']].to_dict(orient='records')
    if not recommend_recipe_names:
        return [{'message': 'No recipes match the criteria'}]

    return recommend_recipe_names
