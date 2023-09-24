const showModalBtn = document.getElementById('show-modal')
const modal = document.getElementById('modal')
const search = document.getElementById('search')
const items = document.getElementById('items')
const itemUrl = document.getElementById('url')
const addItemBtn = document.getElementById('add-item')
const closeModalBtn = document.getElementById('close-modal')

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
  if (itemUrl.value) {
    // send new item url to main process
    window.api.send('new-item', itemUrl.value)
    toggleModalBtns()
    
  }
})

window.api.receive('new-item-success', (itemUrl) => {
  // Enable buttons
  toggleModalBtns()

  // hide modal and clear input value
  itemUrl.value = ''
  modal.style.display = 'none'

  // Add item to "items"
  const div = document.createElement('div')
  div.classList.add('read-item')
  const image = document.createElement('img')
  // image.src = itemUrl
  const h2 = document.createElement('h2')
  h2.innerHTML = itemUrl
  div.appendChild(image)
  div.appendChild(h2)
  items.appendChild(div)
  
})