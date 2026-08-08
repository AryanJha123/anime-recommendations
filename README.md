# Aryan's Anime Recommendation Project
https://aryan-anime-rec.vercel.app/

A simple React + Flask project that recommends anime to a user based on their AniList profile. Recommendations are done based on a pre-made cosine matrix of anime tags from this dataset: https://www.kaggle.com/datasets/calebmwelsh/anilist-anime-dataset/data?select=anilist_anime_data_complete.csv.
Data seems to be up to the end of 2025, so new entries are not included.

# Structure
anime-rec: the frontend 

app: the backend

data collection: the jupyter notebook used to create the cosine matrix and trim the dataset to a usable size for the backend

