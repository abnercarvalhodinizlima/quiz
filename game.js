const question =  document.querySelector('#question');
const choices =  Array.from(document.querySelectorAll('.choice-text'));
const progressText =  document.querySelector('#progressText');
const scoreText =  document.querySelector('#score');
const progressBarFull =  document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Quando foi criado o primeiro smartphone da história?",
        choice1:"1997",
        choice2:"1994",
        choice3:"2000",
        choice4:"1998",
        answer:2,
    },
    {
        question: "Qual foi a primeira rede social da história da internet?",
        choice1:"Facebook",
        choice2:"Orkut",
        choice3:"MySpace",
        choice4:"Classmate",
        answer:4,
    },
    {
        question: "Em que ano foi criada a internet no mundo?",
        choice1:"1969",
        choice2:"1678",
        choice3:"1775",
        choice4:"1900",
        answer:1,
    },
    {
        question: "Qual a resolução de uma imagem Full HD?",
        choice1:"1920 x 1080",
        choice2:"1280 x 720",
        choice3:"1230 x 1080",
        choice4:"2560 x 1440",
        answer:1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecenScore', score)

        return window.location.assign('end.html')

    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()

