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

addItemBtn.addEventListener('click', () => {
  if (itemUrl.value) {
    // send new item url to main process
    

    const div = document.createElement('div')
    div.classList.add('read-item')
    div.innerHTML = itemUrl.value
    items.appendChild(div)
    itemUrl.value = ''
    modal.style.display = 'none'
  }
})

