const s_in = document.getElementById("sign-in");
const body   = document.getElementById("body");
const divflr = document.getElementById("div-flr");
const s_up =   document.getElementById("sign-up");
const f_l = document.getElementById("form-l");
const f_r = document.getElementById("form-r");
const btn_c = document.getElementById("btn-c");

s_in.onclick = function(){
    body.style.overflow = 'hidden';
    divflr.style.display = 'block';
    f_l.style.display = 'block';
    f_l.style.height = "250px";
    f_r.style.display = 'none';
}

s_up.onclick = function(){
    body.style.overflow = 'hidden';
    divflr.style.display = 'block';
    f_r.style.display = 'block';
    f_l.style.display = 'none';
}

btn_c.onclick = function(){
    divflr.style.display = 'none';
    body.style.overflow = '';
}