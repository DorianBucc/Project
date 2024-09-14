async function createAvatar() {
    $.ajax({
        url: adresse + '/controleur/utilisateur.php',
        type: 'POST',
        data: {
            id: id
        },
        success: function(response) {
            const avatar = document.querySelector("div.avatar");
            
            avatar.textContent = response;
        }
    });
}

async function createProfil(info) {
    const isConnected = (info != [] && info.connected);
    const isAdmin = (info != [] && info.admin);

    // création du HTML du profil

    const container = document.querySelector("#container");

    if (isConnected) {
        const profil = document.createElement("div");
        const dropdown = document.createElement("a");
        const avatar = document.createElement("div");
        const dropdownMenu = document.createElement("ul");
        const dropdownList = document.createElement("li");
        const dropdownItem = document.createElement("a");
        const dropdownDivider = document.createElement("hr");
        let dropdownListCloned;

        profil.id = "profil"; profil.classList.add("dropdown");
        dropdown.id = "dropdown"; dropdown.role = "button"; 
        dropdown.setAttribute("data-bs-toggle", "dropdown"); dropdown.setAttribute("aria-expanded", "false"); 
        avatar.classList.add("avatar");
        dropdownMenu.classList.add("dropdown-menu"); dropdownMenu.classList.add("dropdown-menu-end");
        dropdownItem.classList.add("dropdown-item");
        dropdownDivider.classList.add("dropdown-divider");

        dropdown.appendChild(avatar);
        profil.appendChild(dropdown);
        dropdownList.appendChild(dropdownItem);

        const items = [];

        if (isAdmin) {
            items.push
            (   
                {id : "dashboard", nom : "Tableau de bord"},
                {id : "demandes", nom : "Demande en attente"},
            );
        }
        else {
            items.push
            (   
                {id : "dashboard", nom : "Tableau de bord"}, 
                {id : "gestionMesAnnonces", nom : "Gestion de mes annonces"},
                {id : "mesFavoris", nom : "Mes Favoris"},
                {id : "monPanier", nom : "Mon Panier"},
            );
        }
        items.forEach((item) => {
            dropdownListCloned = dropdownList.cloneNode(true);
            dropdownListCloned.id = item["id"];
            dropdownListCloned.children[0].textContent = item["nom"];

            dropdownMenu.appendChild(dropdownListCloned);
        });

        dropdownMenu.appendChild(dropdownDivider);

        dropdownListCloned = dropdownList.cloneNode(true);

        dropdownListCloned.id = "deconnexion";
        dropdownListCloned.children[0].textContent = "Déconnexion";

        dropdownMenu.appendChild(dropdownListCloned);
        profil.appendChild(dropdownMenu);
        container.appendChild(profil);

        createAvatar();
    }
    return info;
}

function getFicheProfil(utilisateur) {
    clear("#mainModal");

    createFicheProfil("#mainModal", utilisateur).then(() => {
        const detail = new bootstrap.Modal(document.querySelector('#ficheProfil'));

        detail.show();
    }); 
}

async function createFicheProfil(element, utilisateur) {
    const content = document.querySelector(element);

    const modal = createModal("ficheProfil", "Profil de " + utilisateur.nom + " " + utilisateur.prenom);
    const modalBody = modal.querySelector(".modal-body");

    const fiche = document.createElement("div");
    const detailZone = document.createElement("div");
    const detailNomination = document.createElement("div");
    const detailMail = document.createElement("div");
    const detailTel = document.createElement("div");
    const detailAdresse = document.createElement("div");
    const annonceZone = document.createElement("div");
    const annonceTitleZone = document.createElement("div");
    const annonceTitle = document.createElement("h2");

    fiche.classList.add("fiche");
    detailZone.classList.add("detailZone", "pb-4");
    detailNomination.classList.add("detailNom", "pb-4", "fw-bold");
    detailMail.classList.add("detailMail", "pb-2");
    detailTel.classList.add("detailTel", "pb-2");
    detailAdresse.classList.add("detailAdresse");
    annonceTitleZone.classList.add("annonceTitleZone", "d-flex", "justify-content-center");
    annonceZone.classList.add("annonceZone", "row", "d-flex", "justify-content-center");


    // gestion des details

    const user = await $.getJSON(adresse + '/controleur/utilisateur.php', {mail : utilisateur.mail, type : "bymail"});

    detailNomination.textContent = user.nom + " " + user.prenom;
    detailMail.textContent = "adresse e-mail : " + user.mail;
    detailTel.textContent = "télephone : " + user.tel;
    detailAdresse.textContent = "adresse : " + user.adresse + " (rayon de " + user.rayon + " km)";

    [detailNomination, detailMail, detailTel, detailAdresse].forEach((element) => detailZone.appendChild(element));


    // gestion des annonces 

    const servicePerso = await $.getJSON(adresse + '/controleur/service.php', {id : utilisateur.id, type : "perso"});
    const materielPerso = await $.getJSON(adresse + '/controleur/materiel.php', {id : utilisateur.id, type : "perso"});

    annonceTitle.textContent = "Annonces";

    annonceTitleZone.appendChild(annonceTitle);
    annonceZone.appendChild(annonceTitleZone); 


    // ajout des éléments

    [detailZone, annonceZone].forEach((element) => fiche.appendChild(element));

    modalBody.appendChild(fiche);
    content.appendChild(modal);

    addServices(".annonceZone", servicePerso, true); 
    addMateriels(".annonceZone", materielPerso, true);
}