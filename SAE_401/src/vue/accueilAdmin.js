function clear() {
    document.getElementById("mainContent").innerHTML = "";
}
var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');

var masession=document.cookie.match(/PHPSESSID=[^;]+/)+" ";
masession=masession.substring(10).replace(" ","");
// console.log(masession)

document.getElementById("deconnexion").addEventListener("click",(e) => {
    e.preventDefault()
    $.ajax({
        url: adresse + '/controleur/connexion.php',
        type: 'POST',
        data: {
            id: id,
            SID: masession,
            type: "deconnexion"
        },
        success: function(response) {
            // console.log("réponse : "+response);
            if (response != "error") {
                document.location.href = "./accueil.html"
            }
        }
      });
})


// test

const avatar = document.querySelector("div.avatar");

$.ajax({
    url: adresse + '/controleur/materiel.php',
    type: 'POST',
    data: {
        id: id
    },
    success: function(response) {
        // console.log("réponse : " + response);

        avatar.textContent = response;
    }
});