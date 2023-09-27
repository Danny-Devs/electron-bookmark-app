import { addItem, changeSelection } from './items.js'

const showModalBtn = document.getElementById('show-modal')
const modal = document.getElementById('modal')
const search = document.getElementById('search')
const itemsEl = document.getElementById('items')
const itemUrl = document.getElementById('url')
const addItemBtn = document.getElementById('add-item')
const closeModalBtn = document.getElementById('close-modal')

// filter items by title with "search" input
search.addEventListener('keyup', (e) => {
  // loop through all items to find matches
  Array.from(document.getElementsByClassName('read-item')).forEach((item) => {
    const hasMatchLowerCase = item.innerText.toLowerCase().includes(search.value)
    const hasMatchUpperCase = item.innerText.includes(search.value)
    item.style.display = hasMatchLowerCase || hasMatchUpperCase  ? 'flex' : 'none'
  })
})


// show modal
showModalBtn.addEventListener('click', (e) => {
  modal.style.display = 'flex'
  itemUrl.focus()
})

// hide modal
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none'
})

itemUrl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addItemBtn.click()
  }
})

// navigate items with up or down arrows
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    changeSelection(e.key)
  }
})

// disable/enable modal buttons
const toggleModalBtns = () => {
  if (addItemBtn.disabled === true) {
    addItemBtn.disabled = false
    addItemBtn.style.opacity = 1
    addItemBtn.innerText = 'Add Item'
    closeModalBtn.style.display = 'inline'
  } else {
    addItemBtn.disabled = true
    addItemBtn.style.opacity = 0.5
    addItemBtn.innerText = 'Adding...'
    closeModalBtn.style.display = 'none'
  }
}

addItemBtn.addEventListener('click', () => {
  let url = itemUrl.value
  if (url) {
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url
    }

    // send new item url to main process
    window.api.send('new-item', url)
    toggleModalBtns()
  }
})

window.api.receive('new-item-success', (newItem) => {
  // Enable buttons
  toggleModalBtns()

  // hide modal and clear input value
  itemUrl.value = ''
  modal.style.display = 'none'

  // Add item to "itemsEl"
  addItem(newItem, true)
})
