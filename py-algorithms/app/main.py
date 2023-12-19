from fastapi import FastAPI, HTTPException
from pdfminer.high_level import extract_text
from pydantic import BaseModel
from typing import List, Optional
import spacy
import os
import re
import nltk
import string

class CVRequest(BaseModel):
    filename: str
   
class CVResponse(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    phone_number: Optional[str]
    location: Optional[str]
    designations: List[str] = []
    college: List[str] = []
    degrees: List[str] = []
    work_experience: List[str] = []
    skills: List[str] = []
    
class JobRequest(BaseModel):
    job_description: str
    user_data: str

app = FastAPI()

# nlp_old refers to an older model that is loaded from the path "./old-model" (uses train_data.json).
# This model has been found to perform better on the specific task of parsing CVs in our application, 
# so it is still being used despite the availability of a newer model.
nlp_old = spacy.load("./old-model")
# nlp_new refers to a newer model that is loaded from the path "./new-model" (uses train_data2.json).
# This model has shown better results in tests, however, for the specific task of parsing CVs in our application,
# it has been found to perform worse than the older model.
nlp_new = spacy.load("./new-model")

# ---------------------------------
# ROUTES
# ---------------------------------

@app.post("/read_cv_info", response_model = CVResponse, responses = {
    200: {"model": CVResponse, "description": "Successful Response"},
    400: {"description": "Bad Request - Invalid Input"},
    500: {"description": "Internal Server Error"}
})
async def read_cv_info(request: CVRequest):
    """
    Parses the specified CV PDF file and extracts key information.

    This endpoint accepts the name of a CV file in PDF format, locates it within a predefined directory, 
    and processes it to extract relevant information like personal details, skills, education, and work experience.

    ### Request Body:
    - **filename** (str): The name of the CV file to process. The file should already exist in the server's 'pdfs' directory.
    
    ### Response:
    - **CVResponse**: A JSON object containing the extracted information. Each field represents a different aspect of the CV:
      - `first_name`, `last_name`, `email`, `phone_number`, `location`: The candidate's personal details. If a detail is not found, returns `None`.
      - `designations`, `college`, `degrees`, `work_experience`, `skills`: Arrays containing professional titles, colleges, degrees, work history, and skills. If no items are found, returns an `empty list ([])`.
    - Fields are either strings or lists, depending on their nature. Strings return `None` if not found, and lists return `[]`.

    ### Example Request 1:
    ```json
    {
      "filename": "example1.pdf"
    }
    ```

    ### Example Response 1:
    ```json
    {
        "first_name": "Kathy",
        "last_name": "James",
        "email": "Kathyjames@email.com",
        "phone_number": "(123) 456-7890",
        "location": "Tulsa",
        "designations": [
            "Programmer"
        ],
        "college": [
            "University of Alabama"
        ],
        "degrees": [
            "B.S. Computer Science"
        ],
        "work_experience": [],
        "skills": [
            "JavaScript HTML/ CSS Django SQL REST APIs Angular.js React.js Jest Eclipse Java CAREER OBJECTIVE Graduate of"
        ]
    }
    ```

    ### Example Request 2:
    ```json
    {
      "filename": "example3.pdf"
    }
    ```

    ### Example Response 2:
    ```json
    {
        "first_name": "Alice",
        "last_name": "Clark",
        "email": null,
        "phone_number": null,
        "location": "Delhi",
        "designations": [
            "AI / Machine Learning",
            "Software Engineer"
        ],
        "college": [
            "Indian Institute of Technology"
        ],
        "degrees": [],
        "work_experience": [
            "Microsoft"
        ],
        "skills": [
            "Machine Learning, Natural Language Processing, and Big Data Handling ADDITIONAL INFORMATION Professional Skills • Excellent analytical, problem solving, communication, knowledge transfer and interpersonal skills with ability to interact with individuals at all the levels • Quick learner and maintains cordial relationship with project manager and team members and good performer both in team and independent job environments • Positive attitude towards superiors &amp; peers • Supervised junior developers throughout project lifecycle and provided technical assistance"
        ]
    }
    ```

    ### Raises:
    - **HTTPException (400)**: If the file does not exist, is not readable, or is not a PDF.
    - **HTTPException (500)**: If there is an error in processing the CV file.
    
    ### Limitations:
    - Currently, only English language CVs from the Computer Science/IT field of work are supported.
    """
    directory = "./pdfs"
    filepath = os.path.join(directory, request.filename)
    
    validate_file(filepath)
    
    raw_text = extract_cv_text(filepath)
    processed_text = ' '.join(raw_text.strip().split())

    # The old model better with processed data
    doc_old = nlp_old(processed_text)
    # The new model works better with unprocessed data
    doc_new = nlp_new(raw_text)

    first_name, last_name = extract_names(doc_old)
    email = extract_email(processed_text)
    phone_number = extract_phone_number(processed_text)
    location = extract_location(doc_old)
    designations = extract_designations(doc_old)
    college = extract_college(doc_old)
    degrees = extract_degrees(doc_old)
    work_experience = extract_work_experience(doc_old)
    skills = extract_skills_old_model(doc_old)

    return {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "phone_number": phone_number,
        "location": location,
        "designations": designations,
        "college": college,
        "degrees": degrees,
        "work_experience": work_experience,
        "skills": skills
    }
    
@app.post("/job_match")
async def job_match(request: JobRequest):

    job_requirements = process_into_skills(request.job_description)
    
    user_skills = process_into_skills(request.user_data)
    
    return {
        "job_requirements": job_requirements,
        "user_skills": user_skills        
    }
    
# ---------------------------------
# HELPER FUNCTIONS
# ---------------------------------

def validate_file(filepath: str):
    """
    Validates the given file path.

    Checks if the file is readable and if it's a PDF. Raises an HTTPException
    if the file is not readable or not a PDF.

    Args:
        filepath (str): The path of the file to validate.
    """
    if not os.path.isfile(filepath):
        raise HTTPException(status_code=400, detail="File does not exist.")
    
    if not os.access(filepath, os.R_OK):
        raise HTTPException(status_code=400, detail="File is not readable.")
    
    if not filepath.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="File is not a PDF.")

def extract_cv_text(filepath: str):
    """
    Extracts the text from the CV at the given file path.

    Reads the text from the CV and checks if it's empty. Raises an HTTPException
    if there's an error reading the file or if the CV is empty.

    Args:
        filepath (str): The path of the CV file.

    Returns:
        str: The text of the CV.
    """
    try:
        cv_text = extract_text(filepath)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    if not cv_text.strip():
        raise HTTPException(status_code=400, detail="CV is empty.")
    
    return cv_text

def extract_names(doc: str):
    """
    Extracts the 'Name' entity from the given document.

    This function uses Named Entity Recognition (NER) to identify and extract the 'Name' entity from the document. 
    The 'Name' entity is a block of text in the document that has been labeled as 'Name' by the NER model.

    The function assumes that the first name is the first word in the 'Name' entity, and the last name is the last word.

    Args:
        doc (str): The text of the document. This should be the output of a Named Entity Recognition (NER) model, 
                   with entities labeled.

    Returns:
        tuple: A tuple containing the first name and last name found in the document. Both are strings. 
               If no 'Name' entity is found, the function returns (None, None).
    """
    names = [ent.text for ent in doc.ents if ent.label_ == 'Name']
    if names:
        full_name = names[0].split(' ')
        # Assume the first name is the first word
        first_name = full_name[0].lower().capitalize()
        # If there's more than one word, assume the last name is the last word
        last_name = full_name[-1].lower().capitalize() if len(full_name) > 1 else None
    else:
        first_name, last_name = None, None
        
    return first_name, last_name

def extract_email(cv_text: str):
    """
    Extracts the email address from the given CV text.

    Uses a regular expression to find the email address in the CV text.

    Args:
        cv_text (str): The text of the CV.

    Returns:
        str: The email address found in the CV, or None if no email address was found.
    """
    email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    matches = re.findall(email_regex, cv_text)
    return matches[0] if matches else None

def extract_phone_number(cv_text: str):
    """
    Extracts the phone number from the given CV text.

    Uses a regular expression to find the phone number in the CV text.

    Args:
        cv_text (str): The text of the CV.

    Returns:
        str: The phone number found in the CV, or None if no phone number was found.
    """
    phone_regex = r'(?:\+\d{1,3}\s?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}'
    matches = re.findall(phone_regex, cv_text)
    return matches[0] if matches else None

def extract_skills_old_model(doc: str):
    """
    Extracts the 'Skills' entities from the given document using the 'old model'.

    This function uses Named Entity Recognition (NER) to identify and extract the 'Skills' entities from the document. 
    The 'Skills' entities are blocks of text in the document that have been labeled as 'Skills' by the NER model.

    Args:
        doc (str): The text of the document. This should be the output of a Named Entity Recognition (NER) model, 
                   with entities labeled.

    Returns:
        list: A list of the 'Skills' entities found in the document. Each entity is a string containing the text 
              of the entity. If no 'Skills' entities are found, the function returns an empty list.
    """
    skills = [ent.text for ent in doc.ents if ent.label_ == 'Skills']
    return list(set(skills)) if skills else []

def extract_skills_new_model(doc: str):
    """
    Extracts the 'SKILLS' entities from the given document using the 'new model'.

    This function uses Named Entity Recognition (NER) to identify and extract the 'SKILLS' entities from the document. 
    The 'SKILLS' entities are blocks of text in the document that have been labeled as 'SKILLS' by the NER model.

    Args:
        doc (str): The text of the document. This should be the output of a Named Entity Recognition (NER) model, 
                   with entities labeled.

    Returns:
        list: A list of the 'SKILLS' entities found in the document. Each entity is a string containing the text 
              of the entity. If no 'SKILLS' entities are found, the function returns an empty list.
    """
    skills = [ent.text for ent in doc.ents if ent.label_ == 'SKILLS']
    return list(set(skills)) if skills else []

def extract_designations(doc: str):
    """
    Extracts the unique 'Designation' entities from the given document.

    This function uses Named Entity Recognition (NER) to identify and extract the 'Designation' entities from the document. 
    The 'Designation' entities are blocks of text in the document that have been labeled as 'Designation' by the NER model.

    Args:
        doc (str): The text of the document. This should be the output of a Named Entity Recognition (NER) model, 
                   with entities labeled.

    Returns:
        list: A list of the unique 'Designation' entities found in the document. Each entity is a string containing the text 
              of the entity. If no 'Designation' entities are found, the function returns an empty list.
    """
    designations = [ent.text for ent in doc.ents if ent.label_ == 'Designation']
    return list(set(designations)) if designations else []

def extract_college(doc: str):
    """
    Extracts the 'College Name' entities from the given document.

    This function uses Named Entity Recognition (NER) to identify and extract the 'College Name' entities from the document. 
    The 'College Name' entities are blocks of text in the document that have been labeled as 'College Name' by the NER model.

    Args:
        doc (str): The text of the document. This should be the output of a Named Entity Recognition (NER) model, 
                   with entities labeled.

    Returns:
        list: A list of the 'College Name' entities found in the document. Each entity is a string containing the text 
              of the entity. If no 'College Name' entities are found, the function returns an empty list.
    """
    colleges = [ent.text for ent in doc.ents if ent.label_ == 'College Name']
    return list(set(colleges)) if colleges else []

def extract_location(doc: str):
    """
    Extracts the 'Location' entity from the given document.

    This function uses Named Entity Recognition (NER) to identify and extract the 'Location' entity from the document. 
    The 'Location' entity is a block of text in the document that has been labeled as 'Location' by the NER model.

    Args:
        doc (str): The text of the document. This should be the output of a Named Entity Recognition (NER) model, 
                   with entities labeled.

    Returns:
        str: The 'Location' entity found in the document. If no 'Location' entity is found, the function returns None.
    """
    locations = [ent.text for ent in doc.ents if ent.label_ == 'Location']
    return locations[0] if locations else None

def extract_degrees(doc: str):
    """
    Extracts the 'Degree' entities from the given document.

    This function uses Named Entity Recognition (NER) to identify and extract the 'Degree' entities from the document. 
    The 'Degree' entities are blocks of text in the document that have been labeled as 'Degree' by the NER model.

    Args:
        doc (str): The text of the document. This should be the output of a Named Entity Recognition (NER) model, 
                   with entities labeled.

    Returns:
        list: A list of the 'Degree' entities found in the document. Each entity is a string containing the text 
              of the entity. If no 'Degree' entities are found, the function returns an empty list.
    """
    degrees = [ent.text for ent in doc.ents if ent.label_ == 'Degree']
    return list(set(degrees)) if degrees else []

def extract_work_experience(doc: str):
    """
    Extracts the 'Companies worked at' entities from the given document.

    This function uses Named Entity Recognition (NER) to identify and extract the 'Companies worked at' entities from the document. 
    The 'Companies worked at' entities are blocks of text in the document that have been labeled as 'Companies worked at' by the NER (2) model.

    Args:
        doc (str): The text of the document. This should be the output of a Named Entity Recognition (NER) model, 
                   with entities labeled.

    Returns:
        list: A list of the 'Companies worked at' entities found in the document. Each entity is a string containing the text 
              of the entity. If no 'Companies worked at' entities are found, the function returns an empty list.
    """
    work_experience = [ent.text for ent in doc.ents if ent.label_ == 'Companies worked at']
    return list(set(work_experience)) if work_experience else []

def process_into_skills(data: str):
    
    # For the 'new model' every word must be on a new line - otherwise it underperforms
    skills = data.replace(" ", "\n")
    
    # Extract skills from the provided data - we keep punctation characters as they are
    doc_with_punct = nlp_new(skills)
    # We extract the skills from data
    skills_with_punct = extract_skills_new_model(doc_with_punct)
    # Now we remove the punctation characters and spaces so we will be able to have unique skills only
    skills_with_punct = [skill.translate(str.maketrans('', '', string.punctuation + ' ')).replace(" ", "") for skill in skills_with_punct]
    
    # This time we directly remove all the punctation characters and spaces from the data
    doc_without_punct = nlp_new(skills.translate(str.maketrans('', '', string.punctuation)).replace(" ", ""))
    # We extract the skills from data
    skills_without_punct = extract_skills_new_model(doc_without_punct)
    
    # We combine the skills
    skills = list(skills_with_punct + skills_without_punct)
    # Make all the skills lowercase and remove unnecessary newlines
    skills = [skill[:-1].lower() if skill.endswith("\n") else skill.replace("\n", " ").lower() for skill in skills]
    
    # Keep only the unique ones
    return list(set(skills))