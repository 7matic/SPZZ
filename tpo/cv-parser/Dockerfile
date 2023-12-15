FROM python:3.11-slim-bookworm

WORKDIR /code

ADD . /code

RUN pip install --no-cache-dir --upgrade -r requirements.txt

RUN python -m spacy download en_core_web_sm

EXPOSE 5000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000", "--reload"]