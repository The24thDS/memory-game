const tracking = true
const matomo = 'https://david.mywire.org/piwik/'
const headers = new Headers({'Access-Control-Allow-Origin': 'https://the24thds.github.io/memory-game/'})

const optOut = async () => {
    const response = await fetch(`${matomo}index.php?module=API&method=AjaxOptOut.doIgnore`, {headers: headers})
    const text = await response.text()
    const data = new window.DOMParser().parseFromString(text, "text/xml")
    console.log(data)
}

const checkStatus = async () => {
    const response = await fetch(`${matomo}index.php?module=API&method=AjaxOptOut.isTracked`, {headers: headers})
    const text = await response.text()
    const data = new window.DOMParser().parseFromString(text, "text/xml")
    console.log(data)
}

const optIn = async () => {
    const response = await fetch(`${matomo}index.php?module=API&method=AjaxOptOut.doTrack`, {headers: headers})
    const text = await response.text()
    const data = new window.DOMParser().parseFromString(text, "text/xml")
    console.log(data)
}