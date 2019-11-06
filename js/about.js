window.onload=function () {
    document.getElementById("b_remove").addEventListener("click",f_remove,false);
}

function f_remove() {
    window.localStorage.clear();
    window.location.href="index.html";
}