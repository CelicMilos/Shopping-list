const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const header = document.getElementById("title");
const clearBtn = document.getElementById("clear");

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
    header.textContent = `${newItem}!Verry nice!`;
    header.style.color = "#ab2e26";
    setTimeout(() => {
      header.textContent = "Shopping list";
      header.style.color = "";
    }, 1500);
  }

  //   Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
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
}
function clearItems(e) {
  //   itemList.innerHTML = "";
  // Better way
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}

// Event Listeners

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
