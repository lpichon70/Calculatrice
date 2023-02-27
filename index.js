//On récupère tous les élements de la page html
var content = document.getElementById("content");

var btn1 = document.getElementsByClassName("btn-1");
$(btn1).click(function () {
  clearContent("start");
  addContent("1");
});

var btn2 = document.getElementsByClassName("btn-2");
$(btn2).click(function () {
  clearContent("start");
  addContent("2");
});

var btn3 = document.getElementsByClassName("btn-3");
$(btn3).click(function () {
  clearContent("start");
  addContent("3");
});

var btn4 = document.getElementsByClassName("btn-4");
$(btn4).click(function () {
  clearContent("start");
  addContent("4");
});

var btn5 = document.getElementsByClassName("btn-5");
$(btn5).click(function () {
  clearContent("start");
  addContent("5");
});

var btn6 = document.getElementsByClassName("btn-6");
$(btn6).click(function () {
  clearContent("start");
  addContent("6");
});

var btn7 = document.getElementsByClassName("btn-7");
$(btn7).click(function () {
  clearContent("start");
  addContent("7");
});

var btn8 = document.getElementsByClassName("btn-8");
$(btn8).click(function () {
  clearContent("start");
  addContent("8");
});

var btn9 = document.getElementsByClassName("btn-9");
$(btn9).click(function () {
  clearContent("start");
  addContent("9");
});

var btn0 = document.getElementsByClassName("btn-0");
$(btn0).click(function () {
  clearContent("start");
  addContent("0");
});

var btnDiv = document.getElementsByClassName("btn-div");
$(btnDiv).click(function () {
  clearContent("start");
  verifSign("/");
});

var btnMult = document.getElementsByClassName("btn-mult");
$(btnMult).click(function () {
  clearContent("start");
  verifSign("*");
});

var btnAdd = document.getElementsByClassName("btn-add");
$(btnAdd).click(function () {
  clearContent("start");
  verifSign("+");
});

var btnSous = document.getElementsByClassName("btn-sous");
$(btnSous).click(function () {
  clearContent("start");
  verifSign("-");
});

var btnDel = document.getElementsByClassName("btn-del");
$(btnDel).click(function () {
  clearContent("all");
  addContent("...");
});

var btnEqual = document.getElementsByClassName("btn-equal");
$(btnEqual).click(function () {
  let result = calcule(content.innerHTML);
  clearContent("all");
  addContent(result);
});

/**
 * Permet de calculer l'opération rentré par l'utilisateur
 * @param {string} str
 */
function calcule(str) {
  let j = 0;
  let tab = [];
  let nb = "";
  let res = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "/" || str[i] == "*" || str[i] == "-" || str[i] == "+") {
      tab[j] = nb;
      nb = "";
      j += 1;
      tab[j] = str[i];
      j += 1;
    } else {
      nb += str[i];
    }
  }
  tab[j] = nb;

  //On parcours maintenant le tableau des opérations et on calcule
  //Premier parcours du tableau pour gérer les priorités
  for (let i = 1; i < tab.length; i += 2) {
    switch (tab[i]) {
      case "/":
        tab[i + 1] = parseInt(tab[i - 1]) / parseInt(tab[i + 1]);
        tab[i] = "";
        tab[i - 1] = "";

        tab = trieTab(tab);

        console.log(tab);
        break;
      case "*":
        tab[i + 1] = parseInt(tab[i - 1]) * parseInt(tab[i + 1]);
        tab[i] = "";
        tab[i - 1] = "";

        tab = trieTab(tab);
        console.log(tab);
        break;
    }
  }

  

  //Deuxièmes parcours pour additionner et soustraire
  for (let t = 1; t < tab.length; t += 2) {
    switch (tab[t]) {
      case "-":
        tab[t + 1] = parseInt(tab[t - 1]) - parseInt(tab[t + 1]);
        break;
      case "+":
        tab[t + 1] = parseInt(tab[t - 1]) + parseInt(tab[t + 1]);
        break;
    }
  }
  return tab[tab.length - 1];
}

function trieTab(tab) {
  let tempTab = [];

  for (let y = 0; y < tab.length; y++) {
    if (tab[y] == "") {
      if (y + 2 == tab.length) {
        tab[y] = tab[tab.length];
        tab[y + 1] = null;
        y = tab.length;
      } else {
        tempTab[y] = tab[y + 2];
      }
    } else {
      tempTab[y] = tab[y];
    }
  }

  return tempTab;
}

/**
 * En fonction du type d'éffacement, efface ou non l'écrans
 *
 * all : permet de tout effacer sur l'écrans de la calculatrice
 *
 * start : permet d'éffacer les 3 petits points lorsque l'on rentre pour la première fois une valeur
 * @param {string} type
 */
function clearContent(type) {
  switch (type) {
    case "all":
      content.innerHTML = "";
      break;
    case "start":
      if (content.innerHTML == "...") {
        content.innerHTML = "";
      }
      break;
  }
}

/**
 * Ajoute sur la calculatrice l'élément rentré en paramètre
 * @param {string} str
 */
function addContent(str) {
  content.innerHTML += str;
}

/**
 * Permet de vérifier si l'utilisateur rentre 2 signes d'affilés
 * @param {string} str
 */
function verifSign(str) {
  if (
    content.innerHTML[content.innerHTML.length - 1] == "-" ||
    content.innerHTML[content.innerHTML.length - 1] == "+" ||
    content.innerHTML[content.innerHTML.length - 1] == "/" ||
    content.innerHTML[content.innerHTML.length - 1] == "*"
  ) {
    alert("Vous ne pouvez pas entrer 2 signes de suite !");
  } else if (content.innerHTML == "") {
    alert("Vous ne pouvez pas commencer votre opération avec un signe !");
    addContent("...");
  } else {
    addContent(str);
  }
}

//Au chargement de la page on affiche trois petits points
window.onload = addContent("...");
