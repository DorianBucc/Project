async function getMateriels(type = "all") {
    const userId = (id != null ? id : -1);

    try {
        return await $.getJSON(adresse + '/controleur/materiel.php', {id: userId, type: type});
    }   
    catch (error) {
        console.error(error);
    }
}

async function sendMateriel(type = "", materiel = {}, idUser = -1) {
    $.ajax({
        url: adresse + '/controleur/materiel.php',
        type: 'POST',
        data: {
            type: type,
            materiel: JSON.stringify(materiel),
            id: idUser
        },
        dataType: 'json',
        success: function(response) {
            console.log(response);
        }
    });
}

function addMateriels(element = "#mainContent", materiels = {}, readonly = false) {
    const div = document.querySelector(element);

    materiels.forEach(materiel => {
        const col = document.createElement("div");
        const card = document.createElement("div"); 
        const header = document.createElement("div");
        const headerUser = document.createElement("div");
        const headerType = document.createElement("div");
        const imgContainer = document.createElement("div");
        const img = document.createElement("img");
        const body = document.createElement("div"); 
        const title = document.createElement("h5"); ;
        const categorie = document.createElement("p");
        const jetons = document.createElement("p");
        const statut = document.createElement("p");

        col.classList.add("col-md-4");
        card.classList.add("card");
        header.classList.add("card-header", "d-flex", "justify-content-around");
        headerUser.classList.add("card-headerUser");
        headerType.classList.add("card-headerType");
        imgContainer.classList.add("text-center", "mb-2");
        img.classList.add("card-img-top", "w-50", "rounded");
        body.classList.add("card-body");
        title.classList.add("card-title");
        ["card-text", "categorie"].forEach((element) => categorie.classList.add(element)); 
        ["card-text", "jetons"].forEach((element) => jetons.classList.add(element)); 
        ["card-text", "statut"].forEach((element) => statut.classList.add(element));  

        let name = "";

        if (!user.info.connected) {
            name = "GentiVoisin";
        }
        else {
            name = materiel.utilisateur.nom + " " + materiel.utilisateur.prenom;
        }

        headerUser.textContent = name;
        headerType.textContent = "Matériel";
        img.src = adresse + "/controleur/image/" + materiel.images[0] + ".png";
        title.textContent = materiel.nom;
        categorie.textContent = materiel.categorie.nom;
        jetons.textContent = materiel.jetons + " jetons";
        statut.textContent = materiel.status == 0 ? "Disponible" : "En cours d'emprunt";

        imgContainer.appendChild(img);
        [headerUser, headerType].forEach((element) => header.appendChild(element));
        [imgContainer, title, categorie, jetons,statut].forEach((element) => body.appendChild(element)); 
        [header, body].forEach((element) => card.appendChild(element));

        card.addEventListener("click", (event) => {
            if (event.target !== headerUser && materiel.status == 0 && !readonly) {
                clear("#mainModal");
                creerDetailMateriel("#mainModal", materiel).
                then(() => {
                    const detail = new bootstrap.Modal(document.querySelector('#detailMateriel'));

                    detail.show();

                    if (user.info.connected) initMapDetail("mapMateriel", materiel.latitude, materiel.longitude, materiel.utilisateur.rayon * 1000);
                });   
            }
        });

        headerUser.addEventListener("click", () => {
            if (user.info.connected && !readonly) {
                getFicheProfil(materiel.utilisateur);
            }
        })

        col.appendChild(card);
        div.appendChild(col);
    });
}

async function creerDetailMateriel(element = "#mainContent", materiel) {
    const content = document.querySelector(element);

    // création des elements HTML

    const modal = createModal("detailMateriel", "Détail du matériel " + materiel.nom);
    const modalBody = modal.querySelector(".modal-body");

    const informationsZone = document.createElement("div");
    const informationsDetail = document.createElement("div");
    const informationsName = document.createElement("h5");
    const informationsJetons = document.createElement("h6");
    const informationsDescription = document.createElement("div");
    const informationsDescriptionTitle = document.createElement("h6");
    const informationsTextArea = document.createElement("textarea");
    const imagesZone = document.createElement("div");
    const mapZone = document.createElement("div");
    const mapTitle = document.createElement("h5");
    const map = document.createElement("div");
    const buttons = document.createElement("div");
    const button = document.createElement("button");


    // ajout des attributs

    const buttonClass = ["filtre", "btn", "btn-outline-success", "active"];
    const buttonAttribute = [{name: "data-bs-toggle", value: "button"}, {name: "autocomplete", value: "off"}];
    
    if (!user.info.connected) {
        buttonAttribute.push({name: "disabled", value: "disabled"});
    } 


    buttonClass.forEach((element) => button.classList.add(element));
    buttonAttribute.forEach((element) => button.setAttribute(element.name, element.value));


    // gestion des informations

    informationsName.textContent = materiel.nom + " " + materiel.marque + " " + materiel.modele;
    informationsJetons.textContent = materiel.jetons + " jetons"; 
    informationsDescriptionTitle.textContent = "Description";
    informationsTextArea.textContent = materiel.description;

    modalBody.classList.add("d-flex", "flex-column");
    imagesZone.classList.add("d-flex", "justify-content-center", "mb-5");
    mapZone.classList.add("mt-5");

    informationsDetail.classList.add("d-flex", "flex-column");
    informationsName.classList.add("mb-3","fw-bold"); 
    informationsDescription.classList.add("mt-2"); 

    informationsZone.classList.add("d-flex", "flex-column");
    informationsDetail.classList.add("mb-4");

    buttons.classList.add("d-flex", "justify-content-center");

    ["form-control", "readonly-textarea"].forEach((element) => informationsTextArea.classList.add(element));
    [{name: "readonly", value: "readonly"}].forEach((element) => informationsTextArea.setAttribute(element.name, element.value));

    [informationsDescriptionTitle, informationsTextArea].forEach((element) => informationsDescription.appendChild(element));
    [informationsName, informationsJetons, informationsDescription].forEach((element) => informationsDetail.appendChild(element));


    // gestion des images 

    const imagesMateriel = [];

    for (let i = 0; i < materiel.images.length; i++) {
        imagesMateriel.push({nom: materiel.images[i], alt: "Image " + (i + 1).toString()});
    }

    const imagesCarousel = createCarousel("carouselMateriel", imagesMateriel);  

    imagesCarousel.classList.add("w-50");

    [imagesCarousel].forEach((element) => imagesZone.appendChild(element));


    // gestion de la map 

    mapTitle.textContent = "Localisation";
    map.id = "mapMateriel"; map.classList.add("mapLeafletjs");

    [mapTitle, map].forEach((element) => mapZone.appendChild(element));

    if (!user.info.connected) {
        mapZone.textContent = "";
    }


    // gestion des bouttons ajout au favoris / panier

    const favoris = button.cloneNode();
    const panier = button.cloneNode();

    if (user.materiel.favoris.filter((element) => element.id == materiel.id).length > 0) {
        favoris.textContent = "supprimer des favoris"
        
        favoris.classList.remove("active");
    } 
    else {
        favoris.textContent = "ajouter au favoris";
    }

    if (user.materiel.panier.filter((element) => element.id == materiel.id).length > 0) {
        panier.textContent = "supprimer du panier"
        
        panier.classList.remove("active");
    } 
    else {
        panier.textContent = "ajouter au panier";
    }

    favoris.addEventListener("click", () => {
        if (favoris.classList.contains("active")) {
            favoris.textContent = "ajouter aux favoris";

            sendMateriel("delete_favoris", materiel, id);
        }
        else {
            favoris.textContent = "supprimer des favoris";

            sendMateriel("add_favoris", materiel, id);
        }

        // on actualise la liste des materiels favoris

        getMateriels("favoris").then((data) => {
            user.materiel.favoris = data;
        });

        
    });

    panier.addEventListener("click", () => {
        if (panier.classList.contains("active")) {
            panier.textContent = "ajouter au panier";

            sendMateriel("delete_panier", materiel, id);
        }
        else {
            panier.textContent = "supprimer du panier";

            sendMateriel("add_panier", materiel, id);
        }

        // on actualise la liste des materiels au panier

        getMateriels("panier").then((data) => {
            user.materiel.panier = data;
        });
    });


    // ajout des elements au modal

    [informationsDescriptionTitle, informationsTextArea].forEach((element) => informationsDescription.appendChild(element));
    [informationsName, informationsJetons, informationsDescription].forEach((element) => informationsDetail.appendChild(element));
    [favoris, panier].forEach((element) => buttons.appendChild(element));
    [informationsDetail, buttons].forEach((element) => informationsZone.appendChild(element));
    [imagesZone, informationsZone, mapZone].forEach((element) => modalBody.appendChild(element)); 

    content.appendChild(modal);
}