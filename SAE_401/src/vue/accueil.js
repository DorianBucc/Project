// déclaration des variables

var adresse = "https://devweb.iutmetz.univ-lorraine.fr/~bucchiot2u/sae401/src/" ;

var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');
var masession = document.cookie.match(/PHPSESSID=[^;]+/) + " "; masession = masession.substring(10).replace(" ", "");
var user = {};


// exécution des fonctions une fois que toute la page soit chargée

document.addEventListener("DOMContentLoaded", function() {
    loadUser().then((data) => {
        user = data; 

        clear();

        loadPageAffaires("#mainContent", "all", "Services et Matériels", "Rechercher");

        if (!user.info.connected) {
            createBtnConnexion();
        }
        else {
            createProfil(user.info);

            document.getElementById("dashboard").addEventListener("click", () => {
                clear();

                const div = document.createElement("div");

                div.classList.add("dashboard");
            
                document.querySelector("#mainContent").appendChild(div);

                creerTableauBord(".dashboard", user.info.admin)
            });

            if (user.info.admin) {

                document.getElementById("demandes").addEventListener("click", () => {
                    clear();

                    const div = document.createElement("div");
    
                    div.classList.add("demandes");
                
                    document.querySelector("#mainContent").appendChild(div);
    
                    creerListeDemandes(".demandes");
                });
            }
            else {  

                document.getElementById("gestionMesAnnonces").addEventListener("click", () => {
                    clear();

                    const div = document.createElement("div");
    
                    div.classList.add("gestionMesAnnonces");
                
                    document.querySelector("#mainContent").appendChild(div);
                    creerListeAnnonces(".gestionMesAnnonces");
                });

                document.getElementById("mesFavoris").addEventListener("click", () => {
                    clear();

                    const content = document.querySelector("#mainContent");

                    const div = document.createElement("div");
                    div.classList.add("affaires", "container", "p-4");
                   
                    content.appendChild(div);
                
                    creerZoneAffaires(".affaires", "favoris", "Mes Favoris");
                });

                document.getElementById("monPanier").addEventListener("click", () => {
                    clear();

                    const content = document.querySelector("#mainContent");

                    const div = document.createElement("div");
                    div.classList.add("affaires", "container", "p-4");
                   
                    content.appendChild(div);
                
                    creerZoneAffaires(".affaires", "panier", "Mon Panier");
                });
            }

            document.getElementById("deconnexion").addEventListener("click", (e) => {
                clear();

                changeConnectionStatus(user.info);
            });
        }
        
        // listener de la navbar 
            
        document.getElementById("servicesEtMateriels").addEventListener("click", () => {
            clear();

            loadPageAffaires("#mainContent", "all", "Services et Matériels", "Rechercher");
        });

        document.getElementById("accueil").addEventListener("click", function() {
            document.getElementById("mainContent").innerHTML = "";
        
            var title = document.createElement("h1");
            title.textContent = "Gentil Voisin";
            title.classList.add("title", "fade"); 
        
            var image = document.createElement("img");
            image.src = "./image/service.jpg"; 
            image.style.borderRadius = "50% / 60%"; 
            image.style.width = "10%";  
        
            document.getElementById("mainContent").appendChild(title);
        
            setTimeout(function() {
                title.classList.add("show");
            }, 500); 
        });

        
        const navbarToggler = document.querySelector("#navbar .navbar-toggler");
        const profil = document.querySelector("#profil");

        navbarToggler.addEventListener("click", () => { 
            !navbarToggler.classList.contains("collapsed") ? profil.style.display = "none" : profil.style.display = "";
        }); 
    });
});


async function loadPageAffaires(element = "#mainContent", type = "all", title = "Page", searchBarPlaceholder = "Rechercher...") {
    const content = document.querySelector(element);

    const div = document.createElement("div");
    div.classList.add("affaires", "container", "p-4");
   
    content.appendChild(div);

    await creerZoneRecherche(".affaires", searchBarPlaceholder);
    await creerZoneAffaires(".affaires", type, title);
}