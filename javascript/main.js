import {ispisMenija as ispisMenija,ispisBrojaProizvoda,pretragaProizvoda} from './moduli.js'
window.onload = function(){
    popuniVesti();
    pretragaProizvoda();
    ispisMenija();
    ispisBrojaProizvoda();
    ispisiNajpopularnijeProizvode();
}
function popuniVesti(){
    $.ajax({
        url:"./data/postovi.json",
        method:"get",
        dataType:"json",
        success:function(data){
            var brStrana = Math.ceil(data.length / 4);
            ispisiStranice(brStrana);
            data = data.splice(0,4)
            ispisiVesti(data);
            var stranice = document.getElementsByClassName("strance");
            for(var i = 0;i < stranice.length;i++)
            {
                stranice[i].addEventListener("click",vestiPaginacija);
            }
        },
        error:function(err,xhr){
            console.log(xhr);
        }
    });
}

function ispisiVesti(arr){
    var ispis="";
    arr.forEach(element => {
        ispis+=`<div class="paragraph"><h3>${element.naslov}</h3><p>${element.sadrzaj}</p></div>`;
    });
    document.getElementById("vijesti").innerHTML=ispis;
}
function ispisiStranice(num){
    
    var ispis= "";
    var vrednost=0;
    for(var i = 0;i < num;i++)
    {
        var j = i+1;
        ispis+=`<a data-value=${vrednost} class="strance">${j}</a>`
        vrednost= vrednost+4;
    }
    console.log(ispis);
   document.getElementById("paginacija").innerHTML = ispis; 
}
function vestiPaginacija(){
    var vrednost = this.dataset.value;
    $.ajax({
        url:"./data/postovi.json",
        method:"get",
        dataType:"json",
        success:function(data){
            data = data.splice(vrednost,vrednost+4);
            ispisiVesti(data);
        },
        error:function(err,xhr){
            console.log(xhr);
        }
    });
}
function ispisiNajpopularnijeProizvode(){
    $.ajax({
        url:"./data/products.json",
        dataType:"json",
        method:"get",
        success:function(data){
            data = data.sort(function(a, b){
                return b.brojProdatih - a.brojProdatih;
            });
            ispisiProizvode(data);
        },
        error:function(error){
            console.log(error);
        }
    });
}
function ispisiProizvode(arr){
    arr = arr.splice(0,4);
    var ispis="";
    arr.forEach(function(element){
        ispis+=`<div class="popular__item">
        <div class="popular__img">
          <img src="${element.slika.src}" alt="${element.slika.src}">
        </div>
        <div class="popular__info">
          <h3>${element.naziv}</h3>
          <h3>${element.cena+"rsd"}</h3>
          <p class="kolica">${"Broj prodatih "+ element.brojProdatih + "!"}</p>
        </div>
      </div>`;
    })
    document.getElementById("popular").innerHTML = ispis;
}
