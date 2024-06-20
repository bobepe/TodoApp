window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./sw.js');
    }
  }

const input = document.getElementById("input-txt");
const list = document.getElementById("list-id");

function addItem() {
  if (input.value === '') {
    alert("Text musí být vyplněn");
  } else {
    let li = document.createElement("li");
    li.innerHTML = input.value;
    li.classList.add("list_item")
    list.appendChild(li);
    let div = document.createElement("div");
    div.innerHTML = "\u00d7";
    li.appendChild(div);
  }

  input.value = "";
}

list.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("list_item--checked");
  } else if (e.target.tagName === "DIV") {
    e.target.parentElement.remove();
  }
}, false);