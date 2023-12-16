## Building the Application
Navigate to the directory containing the `docker-compose.yml` file. Before running the application, it's important to build the Docker images that the application will use. Run:

```bash
docker compose build
```

## Running the Application

To run the application, run the following command in your terminal:

```bash
docker compose up
```

If you want to run the services in the background, you can use the -d option:
```bash
docker compose up -d
```

## Stopping the Application

To stop the application and remove the containers, networks, etc., run the following command in your terminal:
```bash
docker compose down
```

## Accessing the API

Once the application is running, you can access the interactive API documentation by navigating to `http://localhost:5000/docs` in your web browser.
The interactive documentation is powered by Swagger UI.

## Creating a custom NER model

To create a custom Named Entity Recognition (NER) model for parsing CVs, there is a Jupyter notebook `NER_custom_model.ipynb` that guides you through the process.