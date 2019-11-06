window.onload=function () {
    if(!window.localStorage.used)
        f_init();
    if(parseInt(window.localStorage.fl)>parseInt(window.localStorage.sum)||parseInt(window.localStorage.fl)<1||parseInt(window.localStorage.sum)<1){
        window.localStorage.fl=window.localStorage.sum;}
    f_pre_diary();
    document.getElementById("b_download").addEventListener("click",f_b_download,false);
    document.getElementById("b_delete").addEventListener("click",f_b_delete,false);
    document.getElementById("b_edit").addEventListener("click",f_b_edit,false);
    document.getElementById("b_prev").addEventListener("click",f_b_prev,false);
    document.getElementById("b_jump").addEventListener("click",f_b_jump,false);
    document.getElementById("b_next").addEventListener("click",f_b_next,false);
    window.localStorage.setItem("tmp","0");
    if(parseInt(window.localStorage.sum)===0) {
        document.getElementById("b_delete").classList.add("d-none");
        document.getElementById("i_jump").classList.add("d-none");
        window.localStorage.setItem("tmp","1");
    }
    document.getElementById("description").innerText="Out of "+window.localStorage.sum+" Diaries";
    if(parseInt(window.localStorage.fl)<2){
        document.getElementById("b_prev").disabled=true;
    }
    if(parseInt(window.localStorage.fl)>=parseInt(window.localStorage.sum)){
        document.getElementById("b_next").disabled=true;
    }
}

function f_pre_diary() {
    let sto=window.localStorage;
    f_display_diary(parseInt(sto.fl));
    if(parseInt(parseInt(sto.fl)!==0))
        window.localStorage.setItem("fl", parseInt(sto.fl));
    if(parseInt(sto.fl)===0)
        document.getElementById("c_preview").classList.add("d-none");
}

function f_b_download() {
    if (window.localStorage.getItem("fl") !== "0")
        f_download(window.localStorage.getItem("fl"));
}

function f_b_delete() {
    if (window.localStorage.getItem("fl") !== "0") {
        f_delete(window.localStorage.getItem("fl"));
        location.reload(true);
    }
}

function f_b_prev() {
    let sto=window.localStorage;
    if(parseInt(sto.fl)>1)
    sto.setItem("fl",parseInt(parseInt(sto.getItem("fl"))-1));
    location.reload(true);
}

function f_b_next() {
    let sto=window.localStorage;
    if(parseInt(sto.fl)<parseInt(sto.sum))
        sto.setItem("fl",parseInt(parseInt(sto.getItem("fl"))+1));
    location.reload(true);
}

function f_b_jump() {
    let sto=window.localStorage;
    if((parseInt(document.getElementById("n_jump").value)<=parseInt(sto.sum)&&(parseInt(document.getElementById("n_jump").value)>0))) {
        sto.setItem("fl", parseInt(document.getElementById("n_jump").value));
        location.reload(true);
    }
}

function f_b_edit() {
    let sto=window.localStorage;
    sto.editing=sto.fl;
    sto.from=parseInt(2);
    window.location.href="edit.html";
}