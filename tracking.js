let tracking = true
const matomo = 'https://david.mywire.org/piwik/'
const button = document.querySelector('.optout .choiceButton');
// A const headers = new Headers({'Access-Control-Allow-Origin': 'https://the24thds.github.io/memory-game/'})

const updateMessage = () => {
    if(tracking) button.innerText = "opt-out"
    else button.innerText = "opt-in"
}

const optOut = async () => {
    const response = await fetch(`${matomo}index.php?module=API&method=AjaxOptOut.doIgnore`, {
        method: 'GET',
        credentials: 'include'
    })
    const text = await response.text()
    const data = new window.DOMParser().parseFromString(text, "text/xml")
    const result = data.getElementsByTagName("success")[0].attributes[0].value;
    if(result === 'ok') tracking = false
    updateMessage()
}

const checkStatus = async () => {
    const response = await fetch(`${matomo}index.php?module=API&method=AjaxOptOut.isTracked`, {
        method: 'GET',
        credentials: 'include'
    })
    const text = await response.text()
    const data = new window.DOMParser().parseFromString(text, "text/xml")
    const result = data.getElementsByTagName("result")[0].innerHTML;
    if (result === '1') tracking = true
    else tracking = false
    updateMessage()
}

const optIn = async () => {
    const response = await fetch(`${matomo}index.php?module=API&method=AjaxOptOut.doTrack`, {
        method: 'GET',
        credentials: 'include'
    })
    const text = await response.text()
    const data = new window.DOMParser().parseFromString(text, "text/xml")
    const result = data.getElementsByTagName("success")[0].attributes[0].value;
    if(result === 'ok') tracking = true
    updateMessage()
}

button.addEventListener('click', () => {
    if(tracking) optOut()
    else optIn()
})

checkStatus()