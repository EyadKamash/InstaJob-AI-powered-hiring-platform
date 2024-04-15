from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
import pdfplumber

app = Flask(__name__, template_folder='src/Pages')
CORS(app)  # Allow CORS for all routes

# Load the trained model
file_path = os.path.abspath('model2.pkl')

with open(file_path, 'rb') as f:
    model = pickle.load(f)

# Load the fitted TF-IDF vectorizer
with open('tfidf.pkl', 'rb') as f:
    TFIDF = pickle.load(f)

# Define a function to extract text from PDF
def extract_text_from_pdf(pdf_file):
    with pdfplumber.open(pdf_file) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
    return text

# Define route for the home page
@app.route('/')
def home():
    return render_template('LandingPage.js')

# Define route for form submission
@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        # Get the uploaded file
        uploaded_file = request.files['cv']
        if uploaded_file.filename != '':
            # Extract text from the PDF
            pdf_text = extract_text_from_pdf(uploaded_file)
            # Transform text using TF-IDF vectorizer
            TFIDF_file = TFIDF.transform([pdf_text])
            # Make prediction using the model
            predicted_job = model.predict(TFIDF_file)[0]
            category_mapping = {
                15: "Java Developer",
                23: "Testing",
                8: "DevOps Engineer",
                20: "Python Developer",
                24: "Web Designing",
                12: "HR",
                13: "Hadoop",
                3: "Blockchain",
                10: "ETL Developer",
                18: "Operations Manager",
                6: "Data Science",
                22: "Sales",
                16: "Mechanical Engineer",
                1: "Arts",
                7: "Database",
                11: "Electrical Engineering",
                14: "Health and fitness",
                19: "PMO",
                4: "Business Analyst",
                9: "DotNet Developer",
                2: "Automation Testing",
                17: "Network Security Engineer",
                21: "SAP Developer",
                5: "Civil Engineer",
                0: "Advocate",
            }
            category_name = category_mapping.get(predicted_job, "Unknown")
            print("Predicted Category:", category_name)
            print(predicted_job)
            # Return prediction result as JSON
            return jsonify(prediction=category_name)

    return jsonify(error='Please upload a file.')

if __name__ == '__main__':
    app.run(debug=True)
