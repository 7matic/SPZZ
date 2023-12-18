# Use the official Python 3.11 slim image from Docker Hub as the base image.
FROM python:3.11-slim-bookworm

# Set the working directory in the Docker container to /code. 
WORKDIR /code

# Copy the current directory on the host machine to the /code directory in the Docker container.
ADD . /code

# Install the Python dependencies specified in requirements.txt.
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Expose port 5000 in the Docker container.
EXPOSE 5000

# This command will start FastAPI application. 
# The --reload option enables hot reloading, which means the server will automatically update when code changes.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000", "--reload"]