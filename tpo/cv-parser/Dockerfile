# This Dockerfile is used to build a Docker image for a CV parser application.
# It uses the python:3.11-slim-bookworm base image and sets the working directory to /code.
# The current directory contents are added to the container at /code.
# The required packages specified in requirements.txt are installed using pip.
# Port 5000 is exposed to allow access to the application.
# The CMD instruction specifies the command to run when the container starts, which is to run the Uvicorn server with the app.main:app module, listening on host 0.0.0.0 and port 5000.

FROM python:3.11-slim-bookworm

WORKDIR /code

ADD . /code

RUN pip install --no-cache-dir --upgrade -r requirements.txt

EXPOSE 5000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000"]