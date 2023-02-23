
const getRandomNumInRange = (min, max) => {
    const randomNum = (Math.random() * (max - min) + min).toFixed(0)
    return randomNum
}

const getTask = () => {
    const symbol = (Math.random() > 0.5) ? "+" : "-"
    const task = `${getRandomNumInRange(0, 100)} ${symbol} ${getRandomNumInRange(0, 100)}`
    gameState.rightAnswer = eval(task)
    return task
}

const toggleGameState = () => {
    gameState.taskInProcess = !gameState.taskInProcess
}

const gameElements = document.getElementById("my_game").children
const title = gameElements[0]
const userTask = gameElements[1]
const useAnswer = gameElements[2]
const btnGame = gameElements[3]
const gameState = {
    taskInProcess: false,
    rightAnswer: null,
}

const startGameFunc = () => {
    if (!gameState.taskInProcess) {
        title.innerText = "Игра началась!"
        useAnswer.value = null
        userTask.innerText = getTask()
        useAnswer.hidden = false
    } else {
        const isRight = gameState.rightAnswer == useAnswer.value
        userTask.innerText = userTask.innerText + " = " + gameState.rightAnswer
        title.innerText = (isRight) ? "Вы победили!" : "Вы проиграли!"
    }
    toggleGameState()
    btnGame.innerText = (gameState.taskInProcess) ? "Проверить!" : "Начать заново!"
}

btnGame.addEventListener("click", startGameFunc)
useAnswer.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        startGameFunc()
    } else if (e.key === "Escape") {
        useAnswer.hidden = true
    }
})

const choosedEl = document.querySelectorAll(".choosed_block-container > div")
const counterEl = document.querySelector(".choosed_block span")

const choosedState = {
    countElements: 0,
    setCountValue(value) {
        this.countElements += value
        counterEl.innerText = this.countElements
    }
}

const eventFunc = (e) => {
    if (e.target.className === "") {
        e.target.className = "choosed_element"
        choosedState.setCountValue(1)
    } else {
        e.target.className = ""
        choosedState.setCountValue(-1)
    }
}

for (let i = 0; i < choosedEl.length; i++) {
    choosedEl[i].addEventListener("click", eventFunc)
}

const postBlock = document.querySelector(".posts_block-container")
const showPostsBTN = document.querySelector(".posts_block button")

function addPost(title, body) {
    const postTitle = document.createElement("h3")
    const postBody = document.createElement("span")
    const postItem = document.createElement("p")

    postTitle.innerText = title
    postBody.innerText = body

    postItem.append(postTitle, postBody)
    postBlock.append(postItem)
}

function getPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => {
            for (item of data) {
                addPost(item.title, item.body)
            }
        })
        .catch(err => console.log(err.message))
    hidePosts()
}

getPosts()
function hidePosts() { postBlock.hidden = true }
function showPosts() { postBlock.hidden = false }

const toggleBlogState = () => {
    blogState.taskInProcess = !blogState.taskInProcess
}

const blogState = {
    taskInProcess: false,
}

const blogFunc = () => {
    if (!blogState.taskInProcess) {
        showPosts()
        showPostsBTN.innerText = "Скрыть посты"
    } else {
        hidePosts()
        showPostsBTN.innerText = "Показать посты"
    }
    toggleBlogState()
}

showPostsBTN.addEventListener("click", blogFunc)

// function createPost(title, body, userId) {
//     fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         body: JSON.stringify({
//             title,
//             body,
//             userId,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//     })
//         .then(res => res.json())
//         .catch(err => console.log(err.message));
// }
// createPost(title, body, 15)