from flask import Flask
import numpy as np
import pandas as pd
import requests
import json
import os

app = Flask(__name__)

@app.route('/')
def hello():
    print("Hello")

with open(os.path.join(app.root_path, 'matrix.npy'), 'rb') as f:
    cosine_sim = np.load(f)
indices = pd.read_csv(os.path.join(app.root_path, 'indices.csv'))

def get_recommendations(title, a_list, cosine_sim=cosine_sim, num_recommend = 10):
    if title in indices['title_romaji'].values:
        num_recd = 0
        raw_recd = 1
        top_similar = []
        idx = (indices['title_romaji'] == title).idxmax()
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        while num_recd <= num_recommend:
            top_rec = sim_scores[raw_recd]
            if indices['title_romaji'].iloc[top_rec[0]] not in a_list and "Season" not in indices['title_romaji'].iloc[top_rec[0]]:
                top_similar.append(sim_scores[raw_recd])
                num_recd += 1
            raw_recd += 1
        movie_indices = [i[0] for i in top_similar]
        return indices['title_romaji'].iloc[movie_indices]

@app.route('/rec')
def rec(username = 'aryantestlist'):
    query = '''
    query ($type: MediaType!, $userName: String!) {
        MediaListCollection(type: $type, userName: $userName) {
        lists {
            name
            entries {
            id
            media {
                title {
                romaji
                }
            }
            }
        }
        }
    }
    '''
    
    variables = {
        'type': 'ANIME',
        'userName':username
    }
    
    url = 'https://graphql.anilist.co'
    
    response = requests.post(url, json={'query': query, 'variables': variables})
    
    json_data = json.loads(response.content)
    anime_list = []
    for j in json_data['data']['MediaListCollection']['lists']:
        if j['name'] != "Dropped" and j['name'] != "Planning":
            for show in j['entries']:
                anime_list.append(str(show['media']['title']['romaji']))
    for show in anime_list:
        if show not in indices['title_romaji'].values:
            print(show)
            anime_list.remove(show)
    
    total_recs = {}
    for title in anime_list:  
        recs = list(get_recommendations(title, anime_list, num_recommend = 10))
        for rec in recs:
            if rec not in anime_list:
                if rec in total_recs:
                    total_recs[rec] += recs.index(rec)
                else:
                    total_recs[rec] = recs.index(rec)
    b = dict(sorted(total_recs.items(), key=lambda item: item[1], reverse=True))
    return b