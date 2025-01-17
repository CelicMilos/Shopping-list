const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const header = document.getElementById("title");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  // console.log("display items", itemsFromStorage);
  itemsFromStorage.forEach((item) => additemToDOM(item));
  resetUI();
}
function addItemOnSubmit(e) {
  e.preventDefault();
  //   Validate items
  const newItem = itemInput.value;
  if (newItem === "") {
    header.textContent = "Nothing is added,sorry.";
    header.style.color = "#ab2e26";
    setTimeout(() => {
      header.textContent = "Shopping list";
      header.style.color = "";
    }, 1500);
    return;
  } else {
    header.textContent = `${
      newItem[0].toUpperCase() + newItem.slice(1)
    }!Verry nice!`;
    header.style.color = "#ab2e26";
    setTimeout(() => {
      header.textContent = "Shopping list";
      header.style.color = "";
    }, 1500);
  }
  // Add items to DOM
  additemToDOM(newItem);
  // add item to Storage
  addItemToStorage(newItem);
  resetUI();
  itemInput.value = "";
}
function additemToDOM(item) {
  //   Create list item
  const li = document.createElement("li");
  li.appendChild(
    document.createTextNode(item[0].toUpperCase() + item.slice(1))
  );
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  // Add li to the DOM
  itemList.appendChild(li);
}
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  // add new item to array
  itemsFromStorage.push(item);
  // convert to JSON string an set local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
  // console.log("Add item to storage", itemsFromStorage);
  // Create icon
}
function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  console.log("Get items fro storage", itemsFromStorage);
  return itemsFromStorage;
}
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
  // Create button
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}
function onClickItem(e) {
  // console.log("onClick", e.target.parentElement.parentElement);
  if (e.target.parentElement.classList.contains("remove-item")) {
    // console.log("list item ", e.target.parentElement.parentElement);
    removeItem(e.target.parentElement.parentElement);
  }
}
function removeItem(item) {
  // console.log("removeItem", item.textContent);
  // remove item from DOM
  item.remove();
  // remove item from Local storage
  removeItemFromStorage(item.textContent);

  resetUI();
}
function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  // console.log("removeItemsFromStorage", item);
  // console.log("removeItemsFromStorage", itemsFromStorage);
  // filter out item
  itemsFromStorage = itemsFromStorage.filter(
    (i) => i.trim().toLowerCase() !== item.trim().toLowerCase()
  );
  // console.log("filtered ", itemsFromStorage);
  // reset the local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}
function clearItems(e) {
  //   itemList.innerHTML = "";
  // Better way
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  resetUI();
}
function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    // .indexOf prolazi kroz sve clanove niza (array),uporedjuje ih i ako nadje
    // match onda ce biti true,ako ne nadje onda izbacuje -1
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function resetUI() {
  const items = itemList.querySelectorAll("li");
  // console.log(items.length);
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}
// Event Listeners

itemForm.addEventListener("submit", addItemOnSubmit);
itemList.addEventListener("click", onClickItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);
resetUI();
