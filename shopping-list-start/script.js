const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const header = document.getElementById("title");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

function addItem(e) {
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

  //   Create list item
  const li = document.createElement("li");
  li.appendChild(
    document.createTextNode(newItem[0].toUpperCase() + newItem.slice(1))
  );
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
  resetUI();
  itemInput.value = "";
}
// Create button
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}
// Create icon
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
  }
  resetUI();
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

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);
resetUI();
