import { BASE_URL } from "./HttpClient.js"

// Get the 10 questions for the game. Returns as:
// [
//     {
//          question: "...",
//          answer: "...",
//          other: [...]
//     },
//     ...
// ]
export async function get10TriviaQuestions() {
    const newUrl = new URL(BASE_URL + '/trivia/question/10');
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': newUrl,
            'Access-Control-Allow-Credentials': true
        },
        withCredentials: true,
        credentials: 'include',
    };
    return fetch(newUrl, options)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error connecting to backend API: ' + error);
        });
}

// Get the answer for the question from the query. Returns as:
// {
//     answer: ""
// }
export async function getAnswer(question) {
    const newUrl = new URL(BASE_URL + '/trivia/question/answer');
    const params = {
        question: question
    };
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': newUrl,
            'Access-Control-Allow-Credentials': true
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify(params)
    };
    return fetch(newUrl, options)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error connecting to backend API: ' + error);
        });
}

// Update a user's ACS (will be returned at the same time?)
export async function updateACS(score) {
    const newUrl = new URL(BASE_URL + '/profile/update/ACS');
    const params = {
        ACS: score
    };
    const options = {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': newUrl,
            'Access-Control-Allow-Credentials': true
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify(params)
    };
    return fetch(newUrl, options)
        .then((response) => {
            return response.text;
        })
        .catch((error) => {
            console.log('Error connecting to backend API: ' + error);
        });
}



// ------------Admin controls-------------
// Make a new question with 4 possible answers, 1 of them being correct
// Input should be String, String, [String, String, String].
// Returns Mongodb.insertOne(...) output
export async function createQuestion(question, answer, other) {
    const newUrl = new URL(BASE_URL + '/trivia/create/question');
    // TODO: Change this when I see how a trivia question is stored and created in backend
    // Edited
    const params = {
        question: question,
        answer: answer,
        other: other
    };
    const options = {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': newUrl,
            'Access-Control-Allow-Credentials': true
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify(params)
    };
    return fetch(newUrl, options)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error connecting to backend API: ' + error);
        });
}

// Get all questions from the database
// Will return a list like get10TriviaQuestions().
export async function getAllTriviaQuestions() {
    const newUrl = new URL(BASE_URL + '/trivia/question/all');
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': newUrl,
            'Access-Control-Allow-Credentials': true
        },
        withCredentials: true,
        credentials: 'include',
    };
    return fetch(newUrl, options)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error connecting to backend API: ' + error);
        });
}

// Update a trivia question
// Input everything a question needs (like the const params), will return:
// {
//      "_id": "...",
//      "question": "...",
//      "answer": "...",
//      "other": [
//          "...", ...
//      ]
// }
export async function updateQuestion(questionid, question, answer, other) {
    const newUrl = new URL(BASE_URL + '/trivia/update/question');
    // TODO: Change this when I see how a trivia question is stored and updated in backend
    // Edited
    const params = {
        questionid: questionid,
        question: question,
        answer: answer,
        other: other
    };
    const options = {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': newUrl,
            'Access-Control-Allow-Credentials': true
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify(params)
    };
    return fetch(newUrl, options)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error connecting to backend API: ' + error);
        });
}

// Remove a question from the database
export async function deleteQuestion(question) {
    const newUrl = new URL(BASE_URL + '/trivia/delete/question');
    // TODO: Change this when I see how a question is deleted in the backend
    // Edited
    const params = {
        question: question
    };
    const options = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': newUrl,
            'Access-Control-Allow-Credentials': true
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify(params)
    };
    return fetch(newUrl, options)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log('Error connecting to backend API: ' + error);
        });
}