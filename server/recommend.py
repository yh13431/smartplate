import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

recipes_df = pd.read_csv('epi_r.csv')

def recommend_recipe_names(user_input):
    filtered_recipes = recipes_df[
        (recipes_df['calories'] <= user_input['calories']) &
        (recipes_df['protein'] <= user_input['protein']) &
        (recipes_df['fat'] <= user_input['fat'])
    ]

    # convert recipe names to vectors
    vectorizer = TfidfVectorizer()
    name_vectors = vectorizer.fit_transform(filtered_recipes['title'])

    # calculate cosine similarity between user input and recipes
    user_vector = vectorizer.transform([f"{user_input['calories']} {user_input['protein']} {user_input['fat']}"])
    similarities = cosine_similarity(user_vector, name_vectors).flatten()

    # get indices of top similar recipes
    top_indices = similarities.argsort()[-5:]

    # return recommended recipe names
    recommended_recipe_names = filtered_recipes.iloc[top_indices][['title', 'calories', 'protein', 'fat']].to_dict(orient='records')

    return recommended_recipe_names