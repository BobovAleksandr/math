let startButton = document.querySelector('.start-button')
let startScreen = document.querySelector('.main__start')
let trainerScreen = document.querySelector('.main__trainer')
let homeButton = document.querySelector('.home-button')
let taskField = document.querySelector('.main__task-text')
let answerField = document.querySelector('.main__answer')
let answerButton = document.querySelector('.footer-button')
let numberTitle = document.querySelector('.task-title')
let form = document.querySelector('.main__form')
let statusField = document.querySelector('.footer__status')

let isAddition = false
let isSubstraction = false
let isMultiply = false
let isDevide = false

let isOneDigit = false
let isTwoDigit = false
let isThreeDigit = false

let currentAnswer = null
let currentTaskNumber = 1

let numbers = []
let actions = []

let wrongStatuses = ['👎','😐','😕','🙊','😮']
let correctStatuses = ['👍','👌','😎','🥳','😀','💪']

function fillNumbersArray() {
  if (isOneDigit) {
    for (i = 1; i < 10; i++) {
      numbers.push(i)
    }
  }
  if (isTwoDigit) {
    for (i = 10; i < 100; i++) {
      numbers.push(i)
    }
  }
  if (isThreeDigit) {
    for (i = 100; i < 1000; i++) {
      numbers.push(i)
    }
  }
}

function fillActionsArray() {
  if (isAddition) {
    actions.push('+')
  }
  if (isSubstraction) {
    actions.push('-')
  }
  if (isMultiply) {
    actions.push('x')
  }
  if (isDevide) {
    actions.push('/')
  }
}

function getRandomNumber(array) {
  return array[Math.floor(Math.random() * array.length)]
}

startButton.addEventListener('click', () => {
  startScreen.classList.add('hidden')
  trainerScreen.classList.remove('hidden')
  fillNumbersArray()
  fillActionsArray()
  getNewTask()
})

homeButton.addEventListener('click', () => {
  startScreen.classList.remove('hidden')
  trainerScreen.classList.add('hidden')
  numbers.length = 0
  actions.length = 0
})

let checkboxes = document.getElementsByClassName('checkbox')

for (let checkbox of checkboxes) {
  checkbox.addEventListener('change', () => {
    if (checkbox.classList.contains('addition-checkbox')) {
      isAddition = !isAddition
    }
    if (checkbox.classList.contains('substraction-checkbox')) {
      isSubstraction = !isSubstraction
    }
    if (checkbox.classList.contains('multiply-checkbox')) {
      isMultiply = !isMultiply
    }
    if (checkbox.classList.contains('devide-checkbox')) {
      isDevide = !isDevide
    }
    if (checkbox.classList.contains('one-digit-checkbox')) {
      isOneDigit = !isOneDigit
    }
    if (checkbox.classList.contains('two-digit-checkbox')) {
      isTwoDigit = !isTwoDigit
    }
    if (checkbox.classList.contains('three-digit-checkbox')) {
      isThreeDigit = !isThreeDigit
    }
    if ((isAddition || isSubstraction || isMultiply || isDevide) && (isOneDigit || isTwoDigit || isThreeDigit)) {
      startButton.disabled = false
    } else {
      startButton.disabled = true
    }
  })
}

function getNewTask() {
  let firstNumber = getRandomNumber(numbers)
  let secondNumber = null
  let action = actions[Math.floor(Math.random() * actions.length)]
  if (action === '-') {
    let newNumbers = numbers.filter(number => number <= firstNumber)
    secondNumber = getRandomNumber(newNumbers)
  } else if (action === '/') {
    let newNumbers = numbers.filter(number => firstNumber % number === 0)
    secondNumber = getRandomNumber(newNumbers)
  } else {
    secondNumber = getRandomNumber(numbers)
  }
  taskField.textContent = `${firstNumber} ${action} ${secondNumber}`
  if (action === '+') {
    currentAnswer = firstNumber + secondNumber
  } else if (action === '-') {
    currentAnswer = firstNumber - secondNumber
  } else if (action === 'x') {
    currentAnswer = firstNumber * secondNumber
  } else if (action === '/') {
    currentAnswer = firstNumber / secondNumber
  } 
  numberTitle.textContent = `Пример №${currentTaskNumber}`
  currentTaskNumber++
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (+answerField.value === +currentAnswer && answerField.value != '') {
    getNewTask()
    answerField.value = ''
    statusField.textContent = correctStatuses[Math.floor(Math.random() * correctStatuses.length)]
    statusField.classList.add('transformed')
    setTimeout(() => {
      statusField.classList.remove('transformed')
    }, 1000)
  } else if (answerField.value != '') {
    answerField.value = ''
    statusField.textContent = wrongStatuses[Math.floor(Math.random() * wrongStatuses.length)]
    statusField.classList.add('transformed')
    setTimeout(() => {
      statusField.classList.remove('transformed')
    }, 1000)
  }
  answerField.focus()
})



