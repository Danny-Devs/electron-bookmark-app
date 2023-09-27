const { BrowserWindow } = require('electron')

let offscreenWindow

// Exported readItem function
module.exports = (url, callback) => {
  // Create offscreen window
  offscreenWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    webPreferences: {
      offscreen: true,
    },
  })
  // Load item url
  offscreenWindow
    .loadURL(url)
    .then(() => {
      console.log('Page loaded successfully')
    })
    .catch((error) => {
      console.error('Error loading page:', error)
    })
  // Wait for content to finish loading
  offscreenWindow.webContents.on('did-finish-load', (e) => {
    // get page title
    let title = offscreenWindow.getTitle()

    // Get screenshot (thumbnail)
    offscreenWindow.webContents.capturePage().then((image) => {
      // Get image as dataURL
      let screenshot = image.toDataURL()

      // Execute callback with new item
      callback({ title, screenshot, url })
      // Clean up
      offscreenWindow.close()
      offscreenWindow = null
    })
  })
}
