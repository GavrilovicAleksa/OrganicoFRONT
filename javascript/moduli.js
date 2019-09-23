export function ispisMenija(){
    $.ajax({
        url:"./data/menu.json",
        method:"GET",
        dataType:"json",
        success:function(data){
            PopuniMeni(data);
            $(".side-nav__item").hover(function(){
                $(this).addClass("zeleno");
            },function(){
                $(this).removeClass("zeleno");
            });
            
        },
        error:function(err,xhr){
            console.log(xhr);
        }
    });
}
function PopuniMeni(arr){
    var ispis = "";
    arr.forEach(element => {
        ispis+=`<li class="side-nav__item">
        <a href="${element.link}" class="side-nav__link" id="${element.naziv}">
            <svg class="side-nav__icon">
                <use xlink:href="img/sprite.svg#icon-${element.ikona}"></use>
            </svg>
            <span>${element.naziv}</span>
        </a>
        </li>`;
    });
    document.getElementById("side-nav").innerHTML = ispis;
}
export function filtriraj(arr){
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
            document.getElementById("cart__number").innerHTML = data.length;
        },
        error:function(err,xhr){
            console.log(xhr);
        }
    });
};
export function ispisBrojaProizvoda(){
    if(localStorage.getItem("brojProizvoda")){
        document.getElementById("cart__number").innerHTML = localStorage.getItem("brojProizvoda");
    }
    else{
        document.getElementById("cart__number").innerHTML = 0;
        console.lo;
    }
}
export function pretragaProizvoda(){
    document.getElementById("search").addEventListener("click",function(){
        var sadrzaj = document.getElementById("search-value").value;
        localStorage.setItem("pretraga", sadrzaj);
        console.log(sadrzaj);
    });
}