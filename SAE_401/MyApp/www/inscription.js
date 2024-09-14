var nom = document.getElementById("nom");
var prenom = document.getElementById("prenom");
var adressePostale = document.getElementById("adressePostale");
var telephone = document.getElementById("telephone");
var rayon = document.getElementById("rayon");
var email = document.getElementById("email");
var pass = document.getElementById("password");

function inscription() {
    $.ajax({
        url: adresse + '/controleur/inscription.php',
        type: 'POST',
        // dataType: 'json', // Optionnel : spécifie le type de données que vous attendez en réponse
        data: {
            nom: nom.value,
            prenom: prenom.value,
            adresse: adressePostale.value,
            telephone: telephone.value,
            rayon: rayon.value,
            email: email.value,
            password: pass.value,
        },
        success: function(response) {
            console.log("Réponse : " + response);
            if (response.trim() !== "error") {
                var message = document.createElement("p");
                message.textContent = "La création de votre compte a été effectuée avec succès ! Vous allez être redirigé dans un cours instant.";
                message.id = "succes";
                document.getElementById("formulaire").appendChild(message);
        
                setTimeout(() => {
                    document.location.href = response;
                }, 2000);
            } else {
                var message = document.createElement("p");
                message.textContent = "Tous les champs n'ont pas été remplies !";
                message.id = "error";
                document.getElementById("formulaire").appendChild(message);
            }
        }
    });
}

document.getElementById("boutonInscription").addEventListener("click", function(event){
    event.preventDefault();
    inscription();
});