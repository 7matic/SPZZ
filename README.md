# SPZZ
![UL FRI](res/img/fri-outside.jpg)
~
*Repository is dedicated to the final project for the undergraduate Software Engineering course at the University of Ljubljana, Faculty of Computer and Information Science (UL FRI).*
~

## Collaborators:
- Kris Petrič
- Amadej Miličev
- Nejc Vene
- Gašper Rifel
- Sašo Primožič
- Matic Zadobovšek

---

## ❗Project Title: {Spletna platforma za zaposlovanje (SPZZ)}

### 📝 Project Description: 
- {TBD}

---

### 🚀 Technologies: 
- {TBD}

### 🔖 Repository Structure: 
- {TBD}

### ✅ Installation Guide: 

## Important Notice

This repository uses Git Large File Storage (LFS) to handle large files. To ensure that the repository works properly, you need to have Git LFS installed and set up on your machine.

Follow these steps:

1. Download and install Git LFS from the [official website](https://git-lfs.github.com/).
2. Run `git lfs install` to set up Git LFS.
3. Run `git lfs pull` to download the large files.

If you don't follow these steps, some files in the repository will not work correctly.

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

## Accesing the SvelteKit app
The app is accesible on `http://localhost:5173`.

## Accesing the phpmyadmin instance to access the database
The phpmyadmin client is accesible on `http://localhost:8080`.

## Creating a custom NER model

To create a custom Named Entity Recognition (NER) model for parsing CVs, there is a Jupyter notebook `NER_custom_model.ipynb` that guides you through the process.

---
