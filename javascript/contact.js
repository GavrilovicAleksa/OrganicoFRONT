import {ispisMenija as ispisMenija,ispisBrojaProizvoda,pretragaProizvoda} from './moduli.js'
window.onload = function(){

    ispisMenija();
    document.getElementById("klik").addEventListener("click",klikProvera);
    ispisBrojaProizvoda();
    pretragaProizvoda();
}

function klikProvera(){
    var marker = true;
    var imePrez = document.getElementById("imePrezime");
    var vrednostImePrez = document.getElementById("imePrezime").value;
    var reImePrezime =  /^[A-Z][a-z]{2,13}\s[A-Z][a-z]{2,13}$/;
    if(!reImePrezime.test(vrednostImePrez)){
        imePrez.classList.add("crvena");
        imePrez.classList.remove("zelena");
        marker = false;   
    }
    else{
        imePrez.classList.add("zelena");
        imePrez.classList.remove("crvena");
    }
    var email = document.getElementById("email");
    var vrednostEmail = document.getElementById("email").value;
    var reEmail =  /^[A-Za-z0-9.]+\@[a-z.]+$/;
    if(!reEmail.test(vrednostEmail)){
        email.classList.add("crvena");
        email.classList.remove("zelena");
        marker = false;   
    }
    else{
        email.classList.add("zelena");
        email.classList.remove("crvena");
    }
    var broj = document.getElementById("telefon");
    var vrednostBr = document.getElementById("telefon").value;
    var reBroj =  /^\d{7,8}$/;
    if(!reBroj.test(vrednostBr)){
        broj.classList.add("crvena");
        broj.classList.remove("zelena");
        marker = false;   
    }
    else{
        broj.classList.add("zelena");
        broj.classList.remove("crvena");
    }
    var poruka = document.getElementById("poruka");
    var vrednostPoruka = document.getElementById("poruka").value;
    if(vrednostPoruka.length < 3){
        poruka.classList.add("crvena");
        poruka.classList.remove("zelena");
        marker = false;   
    }
    else{
        poruka.classList.add("zelena");
        poruka.classList.remove("crvena");
    }
    var rezultat = document.getElementById("rezultat");
    if(marker)
    {
        rezultat.innerHTML = "Poruka je poslata!";
    }
    else{
        rezultat.innerHTML = "Sadrzaj nije dobro unet!";
       }

}
