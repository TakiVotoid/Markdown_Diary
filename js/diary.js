function f_delete(num)
{
    let sto=window.localStorage;
    for (let i = parseInt(num); i < parseInt(sto.sum); i++) {
        sto.setItem("post_"+i,sto.getItem("post_"+parseInt(i+1)));
        sto.setItem("date_post_"+i,sto.getItem("date_post_"+parseInt(i+1)));
        sto.setItem("meta_date_post_"+i,sto.getItem("meta_date_post_"+parseInt(i+1)));
    }
    sto.removeItem("post_"+parseInt(sto.getItem("sum")));
    sto.removeItem("date_post_"+parseInt(sto.getItem("sum")));
    sto.removeItem("meta_date_post_"+parseInt(sto.getItem("sum")));
    sto.sum=parseInt(sto.sum)-1;
}

function f_display_diary(flag) {
    let sto = window.localStorage;
    let md = window.markdownit();
    f_get_title(flag);
    if(parseInt(flag)!==0)
        document.getElementById("preview").innerHTML=md.render(sto.getItem("post_"+parseInt(flag)));
}

function f_get_title(num){
    if(parseInt(num)!==0) {
        let sto = window.localStorage;
        if (num > parseInt(sto.sum)) {
            document.getElementById("pre_date").innerText = Date();
        } else {
            document.getElementById("pre_date").innerText = sto.getItem("date_post_" + num);
        }
        document.getElementById("pre_number").innerText = "# " + num;
    }
    else {
        document.getElementById("pre_number").innerText = "No diary.";
        document.getElementById("pre_date").innerText = "Write down your stories!";
    }
}

function f_init() {
    f_manual();
    let sto = window.localStorage;
    sto.setItem("used","1");
    if(!sto.latest)
        sto.setItem("latest","0");
    if(!sto.sum)
        sto.setItem("sum","0");
    if(!sto.ima)
        sto.setItem("ima","0");
    if(!sto.tmp)
        sto.setItem("tmp","");
    if(!sto.fl)
        sto.setItem("fl","0");
    if(!sto.editing)
        sto.setItem("editing","0");
    if(!sto.from)
        sto.setItem("from","0");
}

function f_download(flag) {
    let sto = window.localStorage;
    var filename;
    var text;
    if (parseInt(flag) <= parseInt(sto.sum)) {
        filename = parseInt(flag) + "-" + sto.getItem("date_post_" + flag) + ".md";
        text = sto.getItem("post_" + flag);
    }
    else {
        filename = parseInt(parseInt(sto.getItem("sum"))+1) + "-" + Date() + ".md";
        text = document.getElementById("fo_NewItem").value;
    }
    let pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}