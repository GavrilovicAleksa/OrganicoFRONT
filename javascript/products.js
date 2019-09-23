import {ispisMenija as ispisMenija,filtriraj, ispisBrojaProizvoda,pretragaProizvoda} from './moduli.js'
window.onload = function(){
    pretragaProizvoda();
    inicijalizujProizvode();
    document.getElementById("categories").addEventListener("change", sortiraj);
    localStorage.setItem("brojProizvoda",0);
    localStorage.setItem("listaProizvoda",String());
    ispisMenija();
    if(localStorage.getItem("pretraga")){
        filterPoNazivu(localStorage.getItem("pretraga"));
    }
    document.getElementById("ObrisiRezultat").addEventListener("click",function(){
        localStorage.removeItem("pretraga");
        inicijalizujProizvode2();
    });
    ispisBrojaProizvoda();
}
function inicijalizujProizvode(){
    $.ajax({
        url:"./data/products.json",
        dataType:"json",
        method:"get",
        success:function(data){
            inicijalizujKategorije(data);
            var brStrana = Math.ceil(data.length / 9);
            ispisiStranice(brStrana);
            var dataSlice = data.slice(0,9)
            ispisiProizvode(dataSlice);
            var stranice = document.getElementsByClassName("strance");
            for(var i = 0;i < stranice.length;i++)
            {
                stranice[i].addEventListener("click",vestiPaginacija);
            }
            kolicaInicijalizacija();
        },
        error:function(error){
            console.log(error);
        }
    });
}
function inicijalizujProizvode2(){
    $.ajax({
        url:"./data/products.json",
        dataType:"json",
        method:"get",
        success:function(data){
            var brStrana = Math.ceil(data.length / 9);
            ispisiStranice(brStrana);
            var dataSlice = data.slice(0,9)
            ispisiProizvode(dataSlice);
            var stranice = document.getElementsByClassName("strance");
            for(var i = 0;i < stranice.length;i++)
            {
                stranice[i].addEventListener("click",vestiPaginacija);
            }
            kolicaInicijalizacija();
        },
        error:function(error){
            console.log(error);
        }
    });
}
function ispisiStranice(num){
    var ispis= "";
    if(!num > 0){
        ispis= "";
    }
    else{
        ispis= "";
        var vrednost=0;
        for(var i = 0;i < num;i++)
        {
            var j = i+1;
            ispis+=`<a data-value=${vrednost} class="strance">${j}</a>`
            vrednost= vrednost+9;
        }
    }
   document.getElementById("paginacija").innerHTML = ispis; 
}
function ispisiProizvode(arr){
    var ispis="";
    if(arr.length > 0){
        arr.forEach(element => {
            ispis+=`<div class="product-card proizvod">
            <div class="product-image">
              <img src="${element.slika.src}" alt="${element.slika.alt}">
            </div>
            <div class="product-info">
              <h5>${element.naziv}</h5><h6>${element.cena+"rsd"}</h6><a class="kolica">Korpa</a>
            </div>
          </div>`;
        });
    }
    else{
        ispis="<h1 class='empty-cart'>Trazeni proizvod nije pronadjen</h1>"
    }
    
    document.getElementById("proizvodi").innerHTML = ispis;
}

function vestiPaginacija(){
    var vrednost = this.dataset.value;
    $.ajax({
        url:"./data/products.json",
        method:"GET",
        dataType:"json",
        success:function(data){
            data = data.splice(vrednost,vrednost+9);
            ispisiProizvode(data);
            kolicaInicijalizacija();
        },
        error:function(err,xhr){
            console.log(xhr);
        }
    });
}

function inicijalizujKategorije(arr){
    var obj ={};
    arr.forEach(function(element){
        if(!obj[element.kategorija]) obj[element.kategorija] = 0;
        obj[element.kategorija]++;
    });
    var objProp = Object.keys(obj);
    var objVal = Object.values(obj);
    var ispis = "";
    for(var i =0;i < objProp.length;i++){
        ispis+=`<li class="categories__item" data-kategorija="${objProp[i]}">${objProp[i]+"("+objVal[i]+")"}</li>`;
    }
    document.getElementsByClassName("categories__list")[0].innerHTML += ispis;
    var katItem = document.getElementsByClassName("categories__item");
    for(var i = 0;i < katItem.length;i++){
        katItem[i].addEventListener("click", filtrirajProizvode);
    }
}

function filtrirajProizvode(kat){
       var kategorija = this.dataset.kategorija;

    $.ajax({
        url:"./data/products.json",
        method:"GET",
        dataType:"json",
        success:function(data){
            data = data.filter(function(element){
                if(kategorija == element.kategorija)
                    return true;
                return false;
            });
            ispisiStranice(0);
            ispisiProizvode(data);
            kolicaInicijalizacija();
        },
        error:function(err,xhr){
            console.log(xhr);
        }
    });
}

function filterPoNazivu(str){
    $.ajax({
        url:"./data/products.json",
        method:"GET",
        dataType:"json",
        success:function(data){
            data = data.filter(function(element){
                if(str.toUpperCase() == element.naziv.toUpperCase())
                    return true;
                return false;
            });
            
            ispisiStranice(0);
            ispisiProizvode(data);
            kolicaInicijalizacija();
        },
        error:function(err,xhr){
            console.log(xhr);
        }
    });
}
function sortiraj(){
    var vrednost = this.value;
    console.log(vrednost);
    switch(vrednost){
        case "1":
        sortirajCenaRastuce()
        break;
        case "2":
        sortirajCenaOpadajuce()
        break;
        case "3":
        sortirajNazivRastuce()
        break;
        case "4":
        sortirajNazivOpadajuce();
    }
}
function sortirajCenaRastuce(){
    $.ajax({
        url:"./data/products.json",
        method:"GET",
        dataType:"json",
        success:function(data){
            data = data.sort(function(a, b){
                return a.cena - b.cena;
            });
            ispisiProizvode(data);
            ispisiStranice(0);
            kolicaInicijalizacija();
        },
        error:function(err,xhr){
            console.log(xhr);
        }
    });
}

function sortirajCenaOpadajuce(){
    $.ajax({
        url:"./data/products.json",
        method:"GET",
        dataType:"json",
        success:function(data){
            data = data.sort(function(a, b){
                return b.cena - a.cena;
            });
            ispisiProizvode(data);
            ispisiStranice(0);
            kolicaInicijalizacija();
        },
        error:function(err,xhr){
            console.log(xhr);
        }
    });
}
function sortirajNazivRastuce(){
    $.ajax({
        url:"./data/products.json",
        method:"GET",
        dataType:"json",
        success:function(data){
            data = data.sort(function(a, b){
                var nazivA = a.naziv.toUpperCase(); 
                var nazivB = b.naziv.toUpperCase(); 
                if (nazivA < nazivB) {
                    return -1;
                }
                if (nazivA > nazivB) {
                    return 1;
                }
                return 0;
            });
            ispisiProizvode(data);
            ispisiStranice(0);
            kolicaInicijalizacija();
        },
        error:function(err,xhr){
            console.log(xhr);
        }
    });
}
function sortirajNazivOpadajuce(){
    $.ajax({
        url:"./data/products.json",
        method:"GET",
        dataType:"json",
        success:function(data){
            data = data.sort(function(a, b){
                var nazivA = a.naziv.toUpperCase(); 
                var nazivB = b.naziv.toUpperCase(); 
                if (nazivB < nazivA) {
                    return -1;
                }
                if (nazivB > nazivA) {
                    return 1;
                }
                return 0;
            });
            ispisiProizvode(data);
            ispisiStranice(0);
            kolicaInicijalizacija();
        },
        error:function(err,xhr){
            console.log(xhr);
        }
    });
}
function kolicaInicijalizacija(){
    var kolica = document.getElementsByClassName("kolica");
    console.log(kolica.length);
    for(var i = 0;i < kolica.length;i++){
           kolica[i].addEventListener("click",dodajuKorpu);    
    }
}
function dodajuKorpu(){
    var trenutniBroj = localStorage.getItem("brojProizvoda");
    var trenutniBroj2 = Number(trenutniBroj) + 1;
    localStorage.setItem("brojProizvoda", Number(trenutniBroj)+1);
    document.getElementById("cart__number").innerHTML = trenutniBroj;
    var child1 = this.previousSibling; 
    var child2 = child1.previousSibling.innerHTML;
    var sadrzaj = localStorage.getItem("listaProizvoda");
    localStorage.setItem("listaProizvoda",sadrzaj+child2+"/");
    console.log(localStorage.getItem("listaProizvoda"));
    var lista2 = localStorage.getItem("listaProizvoda");
    var arr = lista2.split("/");
    arr = arr.filter(function(element){
        if(element.length > 0){
            return true;
        }
    });
    filtriraj(arr);
}


