async function getServices(type = "all") {
    const userId = (id != null ? id : -1);

    try {
        return await $.getJSON(adresse + '/controleur/service.php', {id: userId, type: type});
    }   
    catch (error) {
        console.error(error);
    }
} 

async function sendService(type = "", service = {}, idUser = -1) {
    $.ajax({
        url: adresse + '/controleur/service.php',
        type: 'POST',
        data: {
            type: type,
            service: JSON.stringify(service),
            id: idUser
        },
        dataType: 'json',
        success: function(response) {
            console.log(response);
        }
    });
}

function addServices(element = "#mainContent", services = {}, readonly = false) {
    const div = document.querySelector(element);

    services.forEach(service => {
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
            name = service.utilisateur.nom + " " + service.utilisateur.prenom;
        }

        headerUser.textContent = name;
        headerType.textContent = "Service";
        img.src = adresse + "/controleur/image/" + service.images[0] + ".png";
        title.textContent = service.nom;
        categorie.textContent = service.categorie.nom;
        jetons.textContent = service.jetons + " jetons";
        statut.textContent = service.status == 0 ? "Disponible" : "En cours d'emprunt";

        imgContainer.appendChild(img);
        [headerUser, headerType].forEach((element) => header.appendChild(element));
        [imgContainer, title, categorie, jetons, statut].forEach((element) => body.appendChild(element)); 
        [header, body].forEach((element) => card.appendChild(element));

        card.addEventListener("click", (event) => {
            if (event.target !== headerUser && service.status == 0 && !readonly) {
                clear("#mainModal");
                creerDetailService("#mainModal", service).
                then(() => {
                    const detail = new bootstrap.Modal(document.querySelector('#detailService'));

                    detail.show();

                    if (user.info.connected) initMapDetail("mapService", service.latitude, service.longitude, service.utilisateur.rayon * 1000);
                });   
            }
        });

        headerUser.addEventListener("click", () => {
            if (user.info.connected && !readonly) {
                getFicheProfil(service.utilisateur);
            }
        })

        col.appendChild(card);
        div.appendChild(col);
    });
}

async function creerDetailService(element = "#mainContent", service) {
    const content = document.querySelector(element);

    // création des elements HTML

    const modal = createModal("detailService", "Détail du service " + service.nom);
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

    informationsName.textContent = service.nom;
    informationsJetons.textContent = service.jetons + " jetons"; 
    informationsDescriptionTitle.textContent = "Description";
    informationsTextArea.textContent = service.description;

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


    // gestion des images 

    const imagesService = [];

    for (let i = 0; i < service.images.length; i++) {
        imagesService.push({nom: service.images[i], alt: "Image " + (i + 1).toString()});
    }

    const imagesCarousel = createCarousel("carouselService", imagesService);  

    imagesCarousel.classList.add("w-50");

    [imagesCarousel].forEach((element) => imagesZone.appendChild(element));


    // gestion de la map 

    mapTitle.textContent = "Localisation";
    map.id = "mapService"; map.classList.add("mapLeafletjs");

    [mapTitle, map].forEach((element) => mapZone.appendChild(element));

    if (!user.info.connected) {
        mapZone.textContent = "";
    }


    // gestion des bouttons ajout au favoris / panier

    const favoris = button.cloneNode();
    const panier = button.cloneNode();

    if (user.service.favoris.filter((element) => element.id == service.id).length > 0) {
        favoris.textContent = "supprimer des favoris";
        
        favoris.classList.remove("active");
    } 
    else {
        favoris.textContent = "ajouter au favoris";
    }

    if (user.service.panier.filter((element) => element.id == service.id).length > 0) {
        panier.textContent = "supprimer du panier";
        
        panier.classList.remove("active");
    } 
    else {
        panier.textContent = "ajouter au panier";
    }

    favoris.addEventListener("click", () => {
        if (favoris.classList.contains("active")) {
            favoris.textContent = "ajouter aux favoris";

            sendService("delete_favoris", service, id);
        }
        else {
            favoris.textContent = "supprimer des favoris";

            sendService("add_favoris", service, id);
        }

        // on actualise la liste des services favoris

        getServices("favoris").then((data) => {
            user.service.favoris = data;
        });
    });

    panier.addEventListener("click", () => {
        if (panier.classList.contains("active")) {
            panier.textContent = "ajouter aux panier";

            sendService("delete_panier", service, id);
        }
        else {
            panier.textContent = "supprimer du panier";

            sendService("add_panier", service, id);
        }

        // on actualise la liste des services au panier

        getServices("panier").then((data) => {
            user.service.panier = data;
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