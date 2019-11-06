window.onload=function () {
    if(!window.localStorage.used)
        f_init();
    let bu=document.getElementById("quick_edit").addEventListener("click", f_quick_edit, false);
    document.getElementById("fo_NewItem").addEventListener("input",f_fast_preview,false);
    f_latest_diary();
    document.getElementById("b_download").addEventListener("click",f_b_download,false);
    document.getElementById("b_delete").addEventListener("click",f_b_delete);
    document.getElementById("b_edit").addEventListener("click",f_b_edit);
    window.localStorage.setItem("tmp","0");
    if((parseInt(window.localStorage.ima)>parseInt(window.localStorage.sum))&&(parseInt(window.localStorage.tmp)!==1))
    {
        document.getElementById("b_download").disabled=true;
        document.getElementById("b_edit").disabled=true;
    }
    if(parseInt(window.localStorage.sum)===0) {
        document.getElementById("b_delete").classList.add("d-none");
        document.getElementById("b_download").disabled=true;
        document.getElementById("b_edit").disabled=true;
        window.localStorage.setItem("tmp","1");
    }
}

function f_fast_preview() {
    document.getElementById("b_download").disabled=false;
    document.getElementById("b_edit").disabled=true;
    if(parseInt(window.localStorage.tmp)===0)
    {
        window.localStorage.setItem("tmp","1");
        document.getElementById("b_delete").classList.add("d-none");
    }
    f_get_title(parseInt(window.localStorage.sum)+1);
    if(parseInt(parseInt(window.localStorage.sum)+1)!==0)
    window.localStorage.setItem("ima", parseInt(window.localStorage.sum)+1);
    f_preview_md();
}

function f_b_download() {
    if (window.localStorage.getItem("ima") !== "0")
        f_download(window.localStorage.getItem("ima"));
}

function f_b_delete() {
    if (window.localStorage.getItem("ima") !== "0") {
        f_delete(window.localStorage.getItem("ima"));
        location.reload(true);
    }
}

function f_preview_md() {
    let md = window.markdownit();
    document.getElementById("preview").innerHTML =md.render(document.getElementById("fo_NewItem").value);
}

function f_manual() {
    document.getElementById("manual").click();
}

function f_quick_edit() {
    let sto = window.localStorage;
    sto.setItem("sum",parseInt(sto.getItem("sum"))+1);
    sto.setItem("post_"+parseInt(sto.getItem("sum")),document.getElementById("fo_NewItem").value);
    sto.setItem("date_post_"+parseInt(sto.getItem("sum")),Date());
    sto.setItem("meta_date_post_"+parseInt(sto.getItem("sum")),Date());
    location.reload(true);
}

function f_latest_diary() {
    let sto=window.localStorage;
    f_display_diary(parseInt(sto.sum));
    if(parseInt(sto.sum)!==0)
        window.localStorage.setItem("ima", parseInt(sto.sum));
}

function f_debug()
{
    let sto=window.localStorage;
    sto.clear();
}


function f_b_edit() {
    let sto=window.localStorage;
    sto.editing=sto.ima;
    sto.from=parseInt(1);
    window.location.href="edit.html";
}