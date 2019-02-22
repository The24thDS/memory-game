const tracking = true
const matomo = 'https://david.mywire.org/piwik/'

const optOut = async () => {
    const response = await fetch(`${matomo}index.php?module=API&method=AjaxOptOut.doIgnore`)
    const text = await response.text()
    const data = new window.DOMParser().parseFromString(text, "text/xml")
    console.log(data)
}

const checkStatus = async () => {
    const response = await fetch(`${matomo}index.php?module=API&method=AjaxOptOut.isTracked`)
    const text = await response.text()
    const data = new window.DOMParser().parseFromString(text, "text/xml")
    console.log(data)
}

const optIn = async () => {
    const response = await fetch(`${matomo}index.php?module=API&method=AjaxOptOut.doTrack`)
    const text = await response.text()
    const data = new window.DOMParser().parseFromString(text, "text/xml")
    console.log(data)
}