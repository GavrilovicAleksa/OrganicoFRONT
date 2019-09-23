import {ispisMenija as ispisMenija,pretragaProizvoda} from './moduli.js'
window.onload=function(){
    ispisMenija();
    pretragaProizvoda();
    if(localStorage.getItem("listaProizvoda")){
        var lista2 = localStorage.getItem("listaProizvoda");
        var arr = lista2.split("/");
        arr = arr.filter(function(element){
        if(element.length > 0){
            return true;
        }
    });
    }
    else{
        arr = [];
    }
    filtriraj(arr);
    
    $(".btn-clear").click(function(){
        localStorage.removeItem("listaProizvoda");
        localStorage.removeItem("brojProizvoda");
        var arr=[]
        ispisProizvoda(arr);
    });
}
function filtriraj(arr){
    $.ajax({
        url:"./data/products.json",
        method:"GET",
        dataType:"json",
        success:function(data){
            data = data.filter(function(element){
                for(var i = 0;i < arr.length;i++){
                    if(element.naziv == arr[i])
                        return true;
                }
            });
            ispisProizvoda(data);
            //document.getElementById("cart__number").innerHTML = data.length;
        },
        error:function(err,xhr){
            console.log(xhr);
        }
    });
};
function ispisProizvoda(arr){
    var ispis="";
    if(arr.length > 0){
        arr.forEach(function(element){
            ispis+= `<div class="product-cart">
            <div class="product-image">
              <img src="${element.slika.src}" alt="${element.slika.alt}">
            </div>
            <div class="product-info-cart">
              <h5>${element.naziv}</h5><h6>${element.cena+"rsd"}</h6>
            </div>
          </div>`;
        });    
    }
    else{
        ispis="<h1 class='empty-cart'>Korpa je prazna</h2>"
    }
    document.getElementById("cart-products").innerHTML = ispis;
}