window.onload=function () {
    if(!window.localStorage.used)
        f_init();
    if(parseInt(window.localStorage.editing)>parseInt(window.localStorage.sum)||parseInt(window.localStorage.editing)<1||parseInt(window.localStorage.sum)<1){
        window.localStorage.editing="0";
        if(parseInt(window.localStorage.from)===2)
            window.location.href="alldiaries.html";
        else window.location.href="index.html";
    }
    f_pre_diary();
    document.getElementById("b_download").addEventListener("click",f_b_download,false);
    document.getElementById("b_delete").addEventListener("click",f_b_delete);
    document.getElementById("b_edit").addEventListener("click",f_b_edit);
    document.getElementById("fo_NewItem").addEventListener("input",f_preview_md,false);
}

function f_pre_diary() {
    let sto=window.localStorage;
    f_display_diary(parseInt(sto.editing));
    if(parseInt(parseInt(sto.editing)!==0))
        window.localStorage.setItem("editing", parseInt(sto.editing));
    if(parseInt(sto.editing)===0)
        document.getElementById("c_preview").classList.add("d-none");
    document.getElementById("fo_NewItem").value=sto.getItem("post_"+parseInt(sto.editing));
}

function f_b_download() {
    if (window.localStorage.getItem("editing") !== "0")
        f_download(window.localStorage.getItem("editing"));

}

function f_b_delete() {
    if (window.localStorage.getItem("editing") !== "0") {
        f_delete(window.localStorage.getItem("editing"));
        window.localStorage.editing="0";
        if(parseInt(window.localStorage.from)===1)
            window.location.href="index.html";
        else if(parseInt(window.localStorage.from)===2)
            window.location.href="alldiaries.html";
        else window.location.href="about.html";
    }
}

function f_b_edit() {
    let sto = window.localStorage;
    sto.setItem("post_" + parseInt(sto.getItem("editing")), document.getElementById("fo_NewItem").value);
    sto.setItem("date_post_" + parseInt(sto.getItem("editing")), sto.getItem("meta_date_post_" + parseInt(sto.getItem("editing"))) + "\n" + "Last Edited at " + Date());
    sto.editing="0";
    if(parseInt(sto.from)===1)
        window.location.href="index.html";
    else if(parseInt(sto.from)===2)
        window.location.href="alldiaries.html";
    else window.location.href="about.html";
}

function f_preview_md() {
    let md = window.markdownit();
    document.getElementById("preview").innerHTML =md.render(document.getElementById("fo_NewItem").value);
}