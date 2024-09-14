async function getUserInfo() {
    const userId = (id != null ? id : -1);
    const SID = masession;

    try {
        return await $.getJSON(adresse + "/controleur/utilisateur.php", {id : userId, SID : SID, type : "info"});
    }
    catch (error) {
        console.error(error);
    }
}


// partie connexion / deconnexion

function createConnexion() {
    var content1 = document.createElement("div")
    content1.id = "content1"

    var form = document.createElement("form")
    form.method = "post"
    
    var h1 = document.createElement("h1")
    h1.textContent = "Connexion"
    form.appendChild(h1)

    var formulaire = document.createElement("div")
    formulaire.id = "formulaire"
    
    var fieldset = document.createElement("fieldset")
    fieldset.classList = "entrees active"

    var legend = document.createElement("legend")
    legend.textContent = "E-mail : "
    fieldset.appendChild(legend)

    var input1 = document.createElement("input")
    input1.type = "email"
    input1.id = "mail"
    input1.maxlength = "30"
    input1.autocomplete = "off"
    fieldset.appendChild(input1)

    var fieldset2 = document.createElement("fieldset")
    fieldset2.classList = "entrees"

    var legend = document.createElement("legend")
    legend.textContent = "Mot de passe"
    fieldset2.appendChild(legend)

    var input1 = document.createElement("input")
    input1.type = "password"
    input1.id = "password"
    input1.maxlength = "30"
    input1.autocomplete = "off"
    fieldset2.appendChild(input1)

    formulaire.appendChild(fieldset)
    formulaire.appendChild(fieldset2)

    var label1 = document.createElement("label")
    label1.for = "inscription"
    var p = document.createElement("p")
    p.textContent = "Pas encore de compte ?"
    var a = document.createElement("a")
    a.href = "inscription.html"
    var small = document.createElement("small")
    small.textContent = "Inscrivez-vous"
    a.appendChild(small)
    label1.appendChild(p)
    label1.appendChild(a)

    var input3 = document.createElement("input")
    input3.type = "submit"
    input3.value = "Valider"
    input3.id = "btn_valide"
    


    form.appendChild(formulaire)
    form.appendChild(label1)
    form.appendChild(input3)

    content1.appendChild(form)

    document.getElementById("mainContent").appendChild(content1)

    document.getElementById("btn_valide").addEventListener("click", function(event){
        event.preventDefault();
        connexion();
    });
}

function createBtnConnexion() {
    var li = document.createElement("li");
    li.classList = "nav-item";
    li.id = "connexion";
    var a = document.createElement("a");
    a.classList = "nav-link";
    a.href = "#";
    a.textContent = "Connexion"
    li.appendChild(a)
    li.addEventListener("click",() => {
        clear();
        createConnexion();
    })
    document.getElementById("barnavigation").appendChild(li);
}

function connexion() {
    var mail = document.getElementById("mail");
    var pass = document.getElementById("password");
    var SID = Math.floor(Math.random()*Math.pow(10,16))+".5mljd";
    document.cookie= "PHPSESSID="+SID+";";
    $.ajax({
        url: adresse + '/controleur/connexion.php',
        type: 'POST',
        // dataType: 'json', // Optionnel : spécifie le type de données que vous attendez en réponse
        data: {
            mail: mail.value,
            pass: pass.value,
            SID: SID
        },
        success: function(response) {
            if(response.trim() == "attente"){
                var message = document.createElement("p");
                message.textContent = "Votre compte est en attente de validation par l'administrateur !";
                message.id = "error";
                document.getElementById("formulaire").appendChild(message);
            }
            if (response.trim() !== "" && response.trim() !== "error" && response.trim() !== "attente") {
                var message = document.createElement("p");
                message.textContent = "Vous vous êtes connecté avec succès ! Patientez un instant.";
                message.id = "succes";
                document.getElementById("formulaire").appendChild(message);
                setTimeout(() => {
                    document.location.href = response;
                }, 2000);
            } 
            if(response.trim() === "" || response.trim() === "error"){
                var message = document.createElement("p");
                message.textContent = "L'adresse e-mail ou le mot de passe est incorrecte !";
                message.id = "error";
                document.getElementById("formulaire").appendChild(message);
            }
        }
    });
}

function changeConnectionStatus(info) {
    // fonction à changer par rapport au besoins

    if (info == []) {
        console.log("erreur: session invalide");
    }
    else {
        if (info.connected) {
            document.location.href = adresse + "/vue/index.html";
        }
        else {
            console.log("connected");
        }
    }

    /*
    $.ajax({
        url: adresse + '/controleur/connexion.php',
        type: 'POST',
        // dataType: 'json', // Optionnel : spécifie le type de données que vous attendez en réponse
        data: {
            id: urlParams.get('id'),
            SID: masession,
            type: "isconnect"
        },
        success: function(response) {
            if (response.trim() !== "!connect") {
                console.log("connect")
                status_connexion = true;
            } else {
                document.location.href = adresse + "/vue/accueil.html"
                status_connexion = false;
                
            }
        }
    });
    */
}