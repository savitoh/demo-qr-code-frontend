
'use strict';

const delayToShow = 1; 
const delayToRemove = 200;
const timeout = 3000;

const openToast = (text) => {
    
    const div = document.createElement("div");
    div.className = "toast hidden top";
    div.innerHTML = text;
	document.querySelector("body").appendChild(div);
	
	setTimeout(function() {showToast(div)}, delayToShow);
	setTimeout(function() {hideToast(div)}, timeout);
}

function hideToast (node){
    node.className += " hidden";
    setTimeout(function() {removeToast(node)}, delayToRemove);
}

function showToast(node){
    node.classList.toggle("hidden");
}

function removeToast (node){
    node.remove();
}

export {openToast};