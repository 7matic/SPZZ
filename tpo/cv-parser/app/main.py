from fastapi import FastAPI, HTTPException
from pdfminer.high_level import extract_text
from pydantic import BaseModel
import spacy
import os
import re

class Filename(BaseModel):
    filename: str

app = FastAPI()

nlp = spacy.load("./model-best")

# ---------------------------------
# R O U T E S
# ---------------------------------

@app.post("/read_cv_info")
async def read_cv_info(file: Filename):
    directory = "./pdfs"
    filepath = os.path.join(directory, file.filename) + ".pdf"
    
    cv_text = extract_text(filepath)
    text = cv_text
    
    text = text.strip()
    text = ' '.join(text.split())
    
    doc = nlp(text)
    for ent in doc.ents:
        print(ent.text, "       ->>>>>>>> ", ent.label_)
    
    #validate_file(filepath)
    #cv_text = extract_cv_text(filepath)
    #doc = nlp(cv_text) 
    #first_name, last_name = extract_names(doc)
    #email = extract_email(cv_text)
    #phone_number = extract_phone_number(cv_text)

    #return {"first_name": first_name, "last_name": last_name, "email": email, "phone_number": phone_number}

# ---------------------------------
# H E L P E R   F U N C T I O N S
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
    Extracts the first and last name from the given spaCy Doc.

    Uses spaCy's Named Entity Recognition to extract the first and last name
    from the CV text. If no names are found, returns None for both the first
    and last name.

    Args:
        doc (str): The spaCy Doc to extract names from.

    Returns:
        tuple: A tuple containing the first name and last name as strings.
    """
    
    names = [ent.text for ent in doc.ents if ent.label_ == 'PERSON']
    if names:
        full_name = names[0].split(' ')
        first_name = full_name[0].lower().capitalize()
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

def extract_skills(cv_text: str, skills_list: list):
    """
    Extracts the skills from the given CV text.

    Checks if any of the skills in the skills list are present in the CV text.

    Args:
        cv_text (str): The text of the CV.
        skills_list (list): A list of known skills.

    Returns:
        list: The skills found in the CV.
    """
    
    cv_skills = []
    for skill in skills_list:
        if skill.lower() in cv_text.lower():
            cv_skills.append(skill)

    return cv_skills