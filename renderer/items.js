const itemsEl = document.getElementById('items')

// track items in storage
export const storage = JSON.parse(localStorage.getItem('readit-items')) || []

export function save() {
  localStorage.setItem('readit-items', JSON.stringify(storage))
}

export function select(e) {
  // remove currently selected item class
  document.getElementsByClassName('read-item selected')[0].classList.remove('selected')

  // add to clicked item
  e.currentTarget.classList.add('selected')
}

export function changeSelection(direction) {
  const currentItem = document.getElementsByClassName('read-item selected')[0]

  // handle up/down
  if (direction === 'ArrowUp' && currentItem.previousElementSibling) {
    currentItem.classList.remove('selected')
    currentItem.previousElementSibling.classList.add('selected')
  } else if (direction === 'ArrowDown' && currentItem.nextElementSibling) {
    currentItem.classList.remove('selected')
    currentItem.nextElementSibling.classList.add('selected')
  }
}

export function open() {
  // only if we have items (in case of menu open)
  if (!storage.length) {
    return
  }

  // get selected item
  const selectedItem = document.getElementsByClassName('read-item selected')[0]

  // get item's url
  const contentUrl = selectedItem.dataset.url

  console.log(contentUrl)
}

export function addItem(item, isNew = false) {
  const div = document.createElement('div')
  div.setAttribute('class', 'read-item')
  div.setAttribute('data-url', item.url)
  div.innerHTML = `
    <img src="${item.screenshot}"/>
    <h2>${item.title}</h2>
  `
  itemsEl.appendChild(div)

  // attach click handler to select
  div.addEventListener('click', select)

  // attach doubleclick handler to open
  div.addEventListener('dblclick', open)

  // add .selected class to first item
  if (document.getElementsByClassName('read-item').length === 1) {
    div.classList.add('selected')
  }

  // if item exists in storage, don't add it
  if (isNew) {
    // add item to storage and persist
    storage.push(item)
    save()
  }
}

// add items from storage when app loads
storage.forEach((item) => addItem(item, false))
