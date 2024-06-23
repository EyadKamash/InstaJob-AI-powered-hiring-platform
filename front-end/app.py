from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from transformers import T5ForConditionalGeneration, T5Tokenizer
import pke
import torch
import nltk
nltk.download('punkt')
nltk.download('brown')
nltk.download('wordnet')
nltk.download('stopwords')
nltk.download('omw-1.4')
from nltk.corpus import wordnet as wn
from nltk.tokenize import sent_tokenize
from nltk.corpus import stopwords
import string
from flashtext import KeywordProcessor
import traceback
from sense2vec import Sense2Vec
from sentence_transformers import SentenceTransformer
from similarity.normalized_levenshtein import NormalizedLevenshtein
from sklearn.metrics.pairwise import cosine_similarity
from collections import OrderedDict
from quest_gen import get_question, summarizer, get_keywords, get_nouns_multipartite, sense2vec_get_words, mmr, get_distractors, get_distractors_wordnet

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="src/Pages") ##directory 

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
question_model = T5ForConditionalGeneration.from_pretrained('ramsrigouthamg/t5_squad_v1').to(device)
question_tokenizer = T5Tokenizer.from_pretrained('ramsrigouthamg/t5_squad_v1')

summary_model = T5ForConditionalGeneration.from_pretrained('t5-base')
summary_tokenizer = T5Tokenizer.from_pretrained('t5-base')
summary_model = summary_model.to(device)

s2v = Sense2Vec().from_disk('s2v_old')
sentence_transformer_model = SentenceTransformer('msmarco-distilbert-base-v3')

normalized_levenshtein = NormalizedLevenshtein()

@app.get("/")
async def hello_world(request: Request):
    return templates.TemplateResponse("Questions.js", {"request": request}) ##page redirect

@app.post("/generate_question")
async def generate_question(request: Request):
    data = await request.json()
    context = data.get('context')
    answer = data.get('answer')
    radiobutton = data.get('radiobutton')

    question = get_question(context, answer, question_model, question_tokenizer, device)
    summarized_text = summarizer(context, summary_model, summary_tokenizer, device)

    np = get_keywords(context, summarized_text)

    questions = []
    for answer in np:
        ques = get_question(summarized_text, answer, question_model, question_tokenizer, device)
        if radiobutton == "Wordnet":
            distractors = get_distractors_wordnet(answer)
        else:
            distractors = get_distractors(answer.capitalize(), ques, s2v, sentence_transformer_model, 40, 0.2, normalized_levenshtein)
        question_data = {
            'question': ques,
            'answer': answer,
            'distractors': distractors[:4]
        }
        questions.append(question_data)

    summary = "Summary: " + summarized_text
    for answer in np:
        summary = summary.replace(answer, "<b>" + answer + "</b>")
        summary = summary.replace(answer.capitalize(), "<b>" + answer.capitalize() + "</b>")

    response = {'questions': questions, 'summary': summary}
    return response

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, port=5002)
