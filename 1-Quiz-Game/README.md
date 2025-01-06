# Quiz Game
Endpoints for a simple quiz game.

## Contents
- [Overview](#overview)
    - [Design Inspiration](#design-inspiration)
    - [Stack](#stack)
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Authentication](#authentication)
    - [Setup](#setup)
- [API Endpoints](#api-endpoints)
    - [Base URL](#base-url)
    - [Endpoints](#endpoints)
- [Common Errors](#common-errors)
- [Hosting](#hosting)
- [Conclusion](#conclusion)

## Overview
This is a quiz game, where the user is to be presented with a series of questions. Each question has four possible answers, and the user has to choose from one of them to get a score if correct.
It does not have a frontend implementation yet.

### Design Inspiration
The endpoints are mostly inspired by Erick Santos' quiz game design on [Behance](https://www.behance.net/gallery/175107523/Trivia-Game-UI-Case?tracking_source=search_projects|quiz+game) 

### Stack
- Language: JavaScript (Node.js), 
- Framework: Express.js
- Database: Sqlite

## Getting Started

### Installation
To install the project, you need to run the following commands in your terminal:
```bash
npm install
npm install --save-dev
```
This will install all the required packages and dev dependencies.

### Authentication
A player has to provide an email and name to play. It is designed to be easy and accessible to anyone.

### Setup
To set up the project, you need to run the following commands in your terminal:
```bash
cp .env.sample .env
```
This will create a new .env file and then you can set your values.

### Usage
To start the server locally, you can run the following command in the terminal:
```bash
npm run dev
```

## API Endpoints

### Base URL
- Local: http://localhost:4000

### Endpoints

- **POST /login**
    - **Description**: Login endpoint to get a token.
    - **Request Body**:
        - `email`: The player's email.
        - `name`: The player's name.
    - **Response**: A JSON object with a token.

- **POST /questions/create**
    - **Description**: Create a new question.
    - **Request Body**:
        - `question`: The question text.
        - `options`: An array of possible answers.
        - `answer`: The answer of the question.
        - `category`: The category of the question.
    - **Response**: A JSON object with the created question.

- **GET /questions/category**
    - **Description**: Get all questions in a category.
    - **Query Parameters**:
        - `category`: The category of the questions.
        - `amount`: The total question to return in response. Defaults to 10.
    - **Response**: A JSON object with the questions.

- **GET /questions/random**
    - **Description**: Gets questions at random.
    - **Query Parameters**:
        - `amount`: The total question to return in response. Defaults to 1.
    - **Response**: A JSON object with the random question.

- **GET /questions/question**
    - **Description**: Get a question sequencially based on category and sequence.
    - **Query Parameters**:
        - `category`: The category of the question.
        - `number`: The sequence of the question where 1 is the first question in that category.
    - **Response**: A JSON object with the question.

- **POST /questions/submit/{questionId}**
    - **Description**: Submit a question.
    - **Request Body**:
        - `answer`: The answer of the question.
    - **Response**: A JSON object with the result of the submission.

- **PUT /questions/update/{questionId}**
    - **Description**: Update a question.
    - **Request Body**:
        - `question` (optional): The updated question text.
        - `options` (optional): An array of possible answers.
        - `answer` (optional): The updated answer of the question.
        - `category` (optional): The updated category of the question.
    - **Response**: A JSON object with the updated question.

- **GET /questions/{questionId}**
    - **Description**: Get a question by id.
    - **Response**: A JSON object with the question.

- **GET /leaderboard**
    - **Description**: Get the leaderboard.
    - **Response**: A JSON object with the leaderboard.

- **GET /gamer**
    - **Description**: Get the gamer.
    - **Response**: A JSON object with the gamer.

## Common Errors
Errors that are handled:
- 401: Unauthorized request
- 404: Resource not found
- 500: Internal server error
- 400: Bad request

## Hosting
Yet to be hosted.

## Conclusion
This is a simple quiz game API and is still a work in progress. Documentations of requests and response samples can be found [here](https://www.postman.com/payload-explorer-19816481/apis/collection/nro8pdg/quiz-game) on Postman.