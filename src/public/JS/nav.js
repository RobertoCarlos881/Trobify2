
let cont=1;
const boton = document.getElementById("btn-show");

boton.onclick = function(){
    display(cont);
}


function display(){
    if(cont==1){
        document.getElementById("nav-menu").classList.remove("nav-ocul");
        document.getElementById("nav-menu").classList.add("nav-display");
        cont=0;
    }else{
        cont=1;
        document.getElementById("nav-menu").classList.remove("nav-display");
        document.getElementById("nav-menu").classList.add("nav-ocul");
    }
}

