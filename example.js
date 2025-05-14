
const user = {
    id: 1,
    uid: 'referf',
    username: 'aro',
    password: 'hash',
    quizhistory: [ 
        {uid:'dfsdsfsdf', answer: 4},
        {uid:'dfsdsfrgesdf', answer: 1},
        {uid:'d4324fsdf', answer: 1},
        {uid:'dffvdfdsfsdf', answer: 3},
     ],
    createdQuizes: ['uid1', 'uid2'],
    role: 'ADMIN',
}



const quiz = {
    id: 1,
    uid: 'dfsdsfsdf',
    image: 'someimage',
    question: "какой это год ?",
    answers: [
    { id: 1, text: 2024, isCorrect: false },
    { id: 2, text: 2025, isCorrect: true },
    { id: 3, text: 2024, isCorrect: false },
    { id: 4, text: 2024, isCorrect: false }
  ],
    createruid: "45345fe",
    createdat: Date.now()
}


console.log(JSON.stringify(user))