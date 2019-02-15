/* eslint-disable init-declarations */
// ⚫ the idea it is to create a Card memory game without using any library
// ⚫ I'll aproach this challenge with a 4x4 grid => a total of 16 cards with 8 unique cards

const gameHolder = document.getElementById("game")
const water = document.getElementById("water")
const drop = document.getElementById("drop")
const wrong = document.getElementById("wrong")
const clickContainer = document.getElementById("clicks")
const timeContainer = document.getElementById("time")

const generateCard = imgLink => `<div class="card back" onclick="check(event)"><img onload="imageLoaded()" onerror="cantLoad()" src=${imgLink} /></div>`

const state = []

const cleanState = () => {while(state.length) state.pop()}

const startGame = () => {
    gameHolder.innerHTML = ''
    cleanState()
    const uniqueCards =  Array.apply(null, Array(8)).map( (card, index) => generateCard( `images/${index}.svg` ) )
    const cards = uniqueCards.concat(uniqueCards)
    cards.sort( () => Math.random() > Math.random() )
    cards.forEach(card => {
        gameHolder.innerHTML += card
    })
}
const startTime = () => {
    let seconds = 0;
    window.setInterval(() => {
        timeContainer.innerHTML = ++seconds
    }, 1000)
}

const endGame = () => {
    gameHolder.classList.add("end")
}

let foundPairs = 0
let clicks = 0
let waterLevel = Number(getComputedStyle(water).getPropertyValue("--size").replace("px", ""))

// eslint-disable-next-line no-unused-vars
const check = (event) => {
    if(!clicks) startTime()
    if (state.length < 2) {
        drop.currentTime = 0
        drop.play()
        clickContainer.innerHTML = ++clicks
        event.target.classList.replace("back", "front")
        state.push({
            card: event.target,
            imgSrc: event.target.firstChild.currentSrc
        })
        if (state.length === 2) {
            if (state[0].imgSrc === state[1].imgSrc) {
                foundPairs++
                cleanState()
                if (foundPairs === 8) endGame()
            }
            else {
                wrong.currentTime = 0
                wrong.play()
                waterLevel += 50
                water.style = `--size: ${waterLevel}px;`
                window.setTimeout(() => {
                    state.forEach(el => {
                        el.card.classList.replace("front", "back")
                    })
                    cleanState()
                }, 800)
            }
        }
    }
}

startGame()