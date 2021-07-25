const foto = document.getElementById("divFoto");
const select = document.getElementById("jogo");
let criarImg = document.createElement("img");
let removeImg = document.createElement("img");
let zelda = "/assets/zelda.jpg";
let mw = "/assets/mw.jpg";
let horizon = "/assets/horizon4.jpg";
let ow = "/assets/ow.jpg"

const trocaFoto = () => {
    if (select.value == "zelda") {

        foto.appendChild(criarImg);
        criarImg.src = zelda;
        return

    } else if (select.value == "ow") {

        foto.appendChild(criarImg);
        criarImg.src = ow;
        return

    } else if (select.value == "cod") {

        foto.appendChild(criarImg);
        criarImg.src = mw;
        return

    } else if (select.value == "forza") {

        foto.appendChild(criarImg);
        criarImg.src = horizon;
        return

    } else return false
}