/*window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
              .register('./sw.js');
  }
}*/

window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js')
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // Nová aktualizace je k dispozici
                console.log('Nový obsah je dostupný, prosím obnovte stránku.');
                if (confirm("Nová verze aplikace je k dispozici. Chcete stránku nyní obnovit?")) {
                  window.location.reload();
                }
              } else {
                // Obsah je uložen pro offline použití
                console.log('Obsah je uložen pro offline použití.');
              }
            }
          };
        };
      })
      .catch((error) => {
        console.error('Chyba při registraci service workeru:', error);
      });
  }
};

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
  saveData();
}

function saveData() {
  localStorage.setItem("data", list.innerHTML);
}

function loadData() {
  list.innerHTML = localStorage.getItem("data");
}

list.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("list_item--checked");
  } else if (e.target.tagName === "DIV") {
    e.target.parentElement.remove();
  }
  saveData();
}, false);

loadData();