# ## to capitalize the first letter of each sentence
from nltk.tokenize import sent_tokenize
def postprocesstext(content):
  final=""
  for sent in sent_tokenize(content):
    sent = sent.capitalize()
    final = final + " " + sent
  return final

# ## to summarize the passage
def summarizer(text, model, tokenizer, device):
  text = text.strip().replace("\n", " ")
  text = "Summarize: " + text
  max_len = 512
  encoding = tokenizer.encode_plus(text, max_length=max_len, pad_to_max_length=False, truncation=True, return_tensors="pt").to(device)
  input_ids, attention_mask = encoding["input_ids"], encoding["attention_mask"]
  outs = model.generate(input_ids=input_ids,
                        attention_mask=attention_mask,
                        early_stopping=True,
                        num_beams=3,
                        num_return_sequences=1,
                        no_repeat_ngram_size=2,
                        min_length=75,
                        max_length=300)
  dec = [tokenizer.decode(ids, skip_special_tokens=True) for ids in outs]
  summary = dec[0]
  summary = postprocesstext(summary)
  summary = summary.strip()

  return summary

# # to get keyphrases using MultipartiteRank
from nltk.corpus import stopwords
import string
import pke
import traceback
import spacy

def get_nouns_multipartite(content):
    out = []
    try:
        extractor = pke.unsupervised.MultipartiteRank()
        extractor.load_document(input=content, language='en')
        pos = {'PROPN', 'NOUN'}
        stoplist = list(string.punctuation)
        stoplist += ['-lrb-', '-rrb-', '-lcb-', '-rcb-', '-lsb-', '-rsb-']
        stoplist += stopwords.words('english')
        extractor.candidate_selection(pos=pos)
        extractor.candidate_weighting(alpha=1.1,
                                      threshold=0.75,
                                      method='average')
        keyphrases = extractor.get_n_best(n=15)

        for val in keyphrases:
            out.append(val[0])
    except:
        out = []
        traceback.print_exc()
    
    return out

# # to get Important words by comparing keywords in original passage and summarized passage
from flashtext import KeywordProcessor
def get_keywords(originaltext, summarytext):
  keywords = get_nouns_multipartite(originaltext)
  print("Keywords in unsummarized passage: ", keywords)
  keyword_processor = KeywordProcessor()
  for keyword in keywords:
    keyword_processor.add_keyword(keyword)

  keywords_found = keyword_processor.extract_keywords(summarytext)
  keywords_found = list(set(keywords_found)) 

  print("Keywords in summarized passage: ", keywords_found)
  
  important_keywords = []
  for keyword in keywords:
    if keyword in keywords_found:
      important_keywords.append(keyword)

  return important_keywords

# Filtering the words according to their sense
def filter_same_sense_words(original,wordlist):
  filtered_words=[]
  base_sense =original.split('|')[1]
  print (base_sense)
  for eachword in wordlist:
    if eachword[0].split('|')[1] == base_sense:
      filtered_words.append(eachword[0].split('|')[0].replace("_", " ").title().strip())
  return filtered_words

# Returns the highest similarity based on the levenshtein distance
from similarity.normalized_levenshtein import NormalizedLevenshtein
def get_highest_similarity_score(wordlist,wrd,normalized_levenshtein):
  score=[]
  for each in wordlist:
    score.append(normalized_levenshtein.similarity(each.lower(),wrd.lower()))
  return max(score)


# Use SENSE2VEC to get the final distractors
def sense2vec_get_words(word,s2v,topn,question, normalized_levenshtein):
    output = []
    print ("word ",word)
    try:
      sense = s2v.get_best_sense(word, senses= ["NOUN", "PERSON","PRODUCT","LOC","ORG","EVENT","NORP","WORK OF ART","FAC","GPE","NUM","FACILITY"])
      most_similar = s2v.most_similar(sense, n=topn)
      # print (most_similar)
      output = filter_same_sense_words(sense,most_similar)
      print ("Similar ",output)
    except:
      output =[]

    threshold = 0.6
    final=[word]
    checklist =question.split()
    for x in output:
      if get_highest_similarity_score(final,x, normalized_levenshtein)<threshold and x not in final and x not in checklist:
        final.append(x)

    return final[1:]

# Maximal Marginal Relevance--> to check whether the words are relevant to the context
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
def mmr(doc_embedding, word_embeddings, words, top_n, lambda_param):

    # Extract similarity within words, and between words and the document
    word_doc_similarity = cosine_similarity(word_embeddings, doc_embedding)
    word_similarity = cosine_similarity(word_embeddings)

    # Initialize candidates and already choose best keyword/keyphrase
    keywords_idx = [np.argmax(word_doc_similarity)]
    candidates_idx = [i for i in range(len(words)) if i != keywords_idx[0]]

    for _ in range(top_n - 1):
        # Extract similarities within candidates and
        # between candidates and selected keywords/phrases
        candidate_similarities = word_doc_similarity[candidates_idx, :]
        target_similarities = np.max(word_similarity[candidates_idx][:, keywords_idx], axis=1)

        # Calculate MMR
        mmr = (lambda_param) * candidate_similarities - (1-lambda_param) * target_similarities.reshape(-1, 1)
        mmr_idx = candidates_idx[np.argmax(mmr)]

        # Update keywords & candidates
        keywords_idx.append(mmr_idx)
        candidates_idx.remove(mmr_idx)

    return [words[idx] for idx in keywords_idx]



# Get distractors by Sense2Vec
def get_distractors (word,origsentence,sense2vecmodel,sentencemodel,top_n,lambdaval, normalized_levenshtein):
  distractors = sense2vec_get_words(word,sense2vecmodel,top_n,origsentence, normalized_levenshtein)
  print ("distractors ",distractors)
  if len(distractors) ==0:
    return distractors
  distractors_new = [word.capitalize()]
  distractors_new.extend(distractors)

  embedding_sentence = origsentence+ " "+word.capitalize()
  keyword_embedding = sentencemodel.encode([embedding_sentence])
  distractor_embeddings = sentencemodel.encode(distractors_new)

  max_keywords = min(len(distractors_new),5)
  filtered_keywords = mmr(keyword_embedding, distractor_embeddings,distractors_new,max_keywords,lambdaval)
  final = [word.capitalize()]
  for wrd in filtered_keywords:
    if wrd.lower() !=word.lower():
      final.append(wrd.capitalize())
  final = final[1:]
  return final

# Refine the distractors using wordnet
from nltk.corpus import wordnet as wn
def get_distractors_wordnet(word):
    distractors=[]
    try:
      syn = wn.synsets(word,'n')[0]

      word= word.lower()
      orig_word = word
      if len(word.split())>0:
          word = word.replace(" ","_")
      hypernym = syn.hypernyms()
      if len(hypernym) == 0:
          return distractors
      for item in hypernym[0].hyponyms():
          name = item.lemmas()[0].name()
          if name == orig_word:
              continue
          name = name.replace("_"," ")
          name = " ".join(w.capitalize() for w in name.split())
          if name is not None and name not in distractors:
              distractors.append(name)
    except:
      print ("Wordnet distractors not found")
    return distractors


def get_question(context, answer, model, tokenizer, device):
    text = "context: {} answer: {}".format(context, answer)
    encoding = tokenizer.encode_plus(text, max_length=384, pad_to_max_length=False, truncation=True, return_tensors="pt").to(device)
    input_ids, attention_mask = encoding["input_ids"], encoding["attention_mask"]

    outs = model.generate(input_ids=input_ids, attention_mask=attention_mask, early_stopping=True, num_beams=5, num_return_sequences=1, no_repeat_ngram_size=2, max_length=72)

    dec = [tokenizer.decode(ids, skip_special_tokens=True) for ids in outs]

    Question = dec[0].replace("question:", "")
    Question = Question.strip()
    return Question