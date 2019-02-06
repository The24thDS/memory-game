// ⚫ the idea it is to create a Card memory game without using any library
// ⚫ I'll aproach this challenge with a 4x4 grid => a total of 16 cards with 8 unique cards
// ⚫ I've decided to use RoboHash for card images creating unique images from the index

const gameHolder = document.getElementById("game")

const image = (hash, set) => `https://robohash.org/${hash}.jpg?size=150x150&set=set${set}`

const generateCard = (imgLink) => `<div class="card back" onclick="check(event)"><img onload="imageLoaded()" onerror="cantLoad()" src=${imgLink} /></div>`

const state = []
let currentlyLoading

const initiateLoading = () => {
    currentlyLoading = 16
    gameHolder.classList.add("loading")
}

const cleanState = () => {while(state.length) state.pop()}

const startGame = (set) => {
    gameHolder.innerHTML = ''
    cleanState()
    const uniqueCards =  Array.apply(null, Array(8)).map( (card, index) => generateCard( image(index, set) ) )
    const cards = uniqueCards.concat(uniqueCards)
    cards.sort( () => Math.random() > Math.random() )
    cards.forEach(card => {
        gameHolder.innerHTML += card
    })
    initiateLoading()
}

const imageLoaded = () => {
    currentlyLoading--
    if(!currentlyLoading)
        gameHolder.classList.remove("loading")
}

const cantLoad = () => {
    gameHolder.classList.remove("loading")
    gameHolder.classList.add("error")
}

const endGame = () => {
    gameHolder.classList.add("end")
}

let foundPairs = 0
let clicks = 0

const check = (event) => {
    clicks++
    event.target.classList.replace("back", "front")
    state.push({
        card: event.target,
        imgSrc: event.target.firstChild.currentSrc
    })
    if(state.length===2)
    {
        if(state[0].imgSrc===state[1].imgSrc) {
            foundPairs++
            cleanState()
            if(foundPairs===8) endGame()
        }
        else {
            window.setTimeout(()=>{
                state.forEach(el => {
                    el.card.classList.replace("front", "back")
                })
                cleanState()
            },800)
        }
    }
}

startGame(4)