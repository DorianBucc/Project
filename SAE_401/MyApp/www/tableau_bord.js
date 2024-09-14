// déclaration des fonctions

async function getAllCategories() {
    return $.getJSON(adresse + '/controleur/categorie.php', {type : "all"});
}

function creerBarRecherche(placeholderText = "Rechercher") {
    const div = document.createElement("div");
    const input = document.createElement("input");

    input.id = "searchBar"; input.type = "text"; input.placeholder = placeholderText;

    input.addEventListener("input", (e) => {
        filtreMulti(".card");
    });

    // Style

    div.classList.add("mx-auto", "text-center");
    div.style.width = "50%";
    input.classList.add("form-control", "form-control-lg");

    div.appendChild(input);

    return div;
}

async function creerFiltres() {
    const div = document.createElement("div");
    const filtre1 = document.createElement("button");

    filtre1.type = "button"; 

    const filtreClass = ["filtre", "btn", "btn-primary", "active"];
    const filtreAttribute = [{name: "data-bs-toggle", value: "button"}, {name: "autocomplete", value: "off"}];
    filtreClass.forEach((element) => filtre1.classList.add(element));
    filtreAttribute.forEach((element) => filtre1.setAttribute(element.name, element.value));

    const filtre2 = filtre1.cloneNode();

    filtre1.id = "filtreMateriel"; filtre1.textContent = "Matériels"; 
    filtre2.id = "filtreService"; filtre2.textContent = "Services"; 


    const categories = await getAllCategories();
    const categorieItems = [{id: "categorie-all-id", value: "Tout"}];
    const statutItems = 
    [
        {id: "disponible-id", value: "Disponible"},
        {id: "emprunt-id", value: "En cours d'emprunt"},
        {id: "statut-all-id", value: "Tout"}
    ];

    categories.forEach((categorie) => {
        categorieItems.push({id: categorie.nom + "-id", value: categorie.nom});
    });

    const filtre3 = createDropdown("filtreCategorie", "catégorie : Tout", categorieItems);
    const filtre4 = createDropdown("filtreStatut", "état : Disponible", statutItems);


    // ajout des listener

    [filtre1, filtre2].forEach((filtre) => { 
        filtre.addEventListener("click", () => {
            filtreMulti(".card");
        });
    });

    filtre3.addEventListener("click", (e) => {
        if (e.target.classList.contains("dropdown-item")) {
            const menu = filtre3.querySelector("#filtreCategorie-menu");

            menu.textContent = "catégorie : " + e.target.textContent;

            filtreMulti(".card");
        }
    });

    filtre4.addEventListener("click", (e) => {
        if (e.target.classList.contains("dropdown-item")) {
            const menu = filtre4.querySelector("#filtreStatut-menu");

            menu.textContent = "statut : " + e.target.textContent;

            filtreMulti(".card");
        }
    });

    // Style

    div.classList.add("justify-content-center");
    
    [filtre1, filtre2, filtre3, filtre4].forEach((element) => div.appendChild(element));
    
    return div;
}

async function creerZoneRecherche(element = "#mainContent", searchBarPlaceholder = "Rechercher...") {
    const content = document.querySelector(element);
    const div = document.createElement("div");

    div.id = "divRecherche";

    const searchBar = creerBarRecherche(searchBarPlaceholder);
    const filters = await creerFiltres();

    [searchBar, filters].forEach((element) => div.appendChild(element));

    content.appendChild(div);
}

async function creerZoneAffaires(element = "#mainContent", type = "all", title = "Page") {
    const content = document.querySelector(element);

    const div = document.createElement("div");
    const header = document.createElement("h2");

    div.id = "divServicesEtMateriels";
    header.textContent = title;

    div.appendChild(header);
    content.appendChild(div);

    services = await getServices(type);
    materiels = await getMateriels(type);

    addServices("#divServicesEtMateriels", services); 
    addMateriels("#divServicesEtMateriels", materiels);

    if (title == "Mon Panier"){
        var button = document.createElement("button");
        button.textContent = "Confirm";
        button.classList = "btn btn-success marginCont";
        button.addEventListener("click",() => {
            $.getJSON(adresse + '/controleur/transaction.php', {idUser : id, type : "panier"}, function(response) {
                if(response.trim() == "Pas assez"){
                    button.textContent = "Pas assez de jetons";
                    button.classList = "btn btn-warning marginCont";
                }
                else{
                    document.location = "./index.html?id="+id
                }
            });
        });
        content.appendChild(button);
    }

    // Style

    div.classList.add("row");
}

function creerListeDemandes(element) {
    $.getJSON(adresse + '/controleur/utilisateur.php', {id : id, SID : masession, type : "confirmation"}, function(response) {
        if(response.length == 0){
            const div = document.querySelector(element);

            var message = document.createElement("p");
            message.textContent = "Aucune demande en cours !";
            message.id = "error";
            div.append(message);
        }else {

            const div = document.querySelector(element);

            var demandesDiv = document.createElement("div");
            demandesDiv.setAttribute("class", "demandes");
    
            var h2 = document.createElement("h2");
            h2.textContent = "Liste des demandes en attente";
            demandesDiv.appendChild(h2);
    
            var table = document.createElement("table");
    
            var tr = document.createElement("tr");
            var headers = ["ID", "NOM", "Prénom", "E-mail", "Téléphone", "Adresse", "Rayon", "Actions"];
            headers.forEach(function(headerText) {
                var th = document.createElement("th");
                th.textContent = headerText;
                tr.appendChild(th);
            });
            table.appendChild(tr);

            response.forEach(e => {
                var tr2 = document.createElement("tr");
                var idTh = document.createElement("th");
                idTh.textContent = e.id;
                var nomTh = document.createElement("th");
                nomTh.textContent = e.nom;
                var prenomTh = document.createElement("th");
                prenomTh.textContent = e.prenom;
                var mailTh = document.createElement("th");
                mailTh.textContent = e.mail_utilisateur;
                var telTh = document.createElement("th");
                telTh.textContent = e.tel;
                var adresseTh = document.createElement("th");
                adresseTh.textContent = e.adresse;
                var rayonTh = document.createElement("th");
                rayonTh.textContent = e.rayon + " km";   
                tr2.append(idTh, nomTh, prenomTh, mailTh, telTh, adresseTh, rayonTh);    
    
                var buttonsTh = document.createElement("th");
                var btnValider = document.createElement("button");
                btnValider.setAttribute("id", "btnValider");
                btnValider.setAttribute("class", "boutonsActions");
                btnValider.textContent = "Valider";
                buttonsTh.appendChild(btnValider);
    
                btnValider.addEventListener("click", () => {
                    $.get(adresse + '/controleur/utilisateur.php', {id : e.id, SID : masession, type : "validerUtilisateur"});
                    tr2.remove();
                });
    
                var btnBannir = document.createElement("button");
                btnBannir.setAttribute("id", "btnBannir");
                btnBannir.setAttribute("class", "boutonsActions");
                btnBannir.textContent = "Refuser";
                buttonsTh.appendChild(btnBannir);
    
                btnBannir.addEventListener("click", () => {
                    $.get(adresse + '/controleur/utilisateur.php', {id : e.id, SID : masession, type : "refuserUtilisateur"});
                    tr2.remove();
                });
    
                tr2.appendChild(buttonsTh);
                table.appendChild(tr2);
    
                demandesDiv.appendChild(table);
                div.appendChild(demandesDiv);
            });
        };
    });
}

function creerListeVoisins(element) {
    $.getJSON(adresse + '/controleur/utilisateur.php', {id : id, SID : masession, type : "listeVoisins"}, function(response) {
            const div = document.querySelector(element);

            var demandesDiv = document.createElement("div");
            demandesDiv.setAttribute("class", "demandes");
    
            var h2 = document.createElement("h2");
            h2.textContent = "Liste des GentiVoisins";
            demandesDiv.appendChild(h2);
    
            var table = document.createElement("table");
    
            var tr = document.createElement("tr");
            var headers = ["ID", "NOM", "Prénom", "E-mail", "Détails", "Action"];
            headers.forEach(function(headerText) {
                var th = document.createElement("th");
                th.textContent = headerText;
                tr.appendChild(th);
            });
            table.appendChild(tr);

            response.forEach(e => {
                var tr2 = document.createElement("tr");
                var idTh = document.createElement("th");
                idTh.textContent = e.id;
                var nomTh = document.createElement("th");
                nomTh.textContent = e.nom;
                var prenomTh = document.createElement("th");
                prenomTh.textContent = e.prenom;
                var mailTh = document.createElement("th");
                mailTh.textContent = e.mail_utilisateur;
                var detailsTh = document.createElement("th");
                var detailsA = document.createElement("a");
                detailsA.text = "Liste des annonces de " + e.nom.toUpperCase() + " " + e.prenom;
                detailsA.setAttribute("id", "liensDetails");
                detailsTh.appendChild(detailsA);
                tr2.append(idTh, nomTh, prenomTh, mailTh, detailsTh);    
    
                var buttonsTh = document.createElement("th");
                var btnBannir = document.createElement("button");
                btnBannir.setAttribute("id", "btnBannir");
                btnBannir.setAttribute("class", "boutonsActions");
                btnBannir.textContent = "Bannir";
                buttonsTh.appendChild(btnBannir);
    
                btnBannir.addEventListener("click", () => {
                    $.get(adresse + '/controleur/utilisateur.php', {id : e.id, SID : masession, type : "bannirUtilisateur"});
                    tr2.remove();
                });
                detailsA.addEventListener("click", () => {
                    annoncesDiv = creerDivCentrale("annoncesDiv");
    
                    var texte = document.createElement("h2");
                    texte.textContent = "Détails des annonces";
                    annoncesDiv.appendChild(texte);
    
                    var tableAnnonces = document.createElement("table");
                    var trAnnonces = document.createElement("tr");
                    var headers = ["Catégorie", "Nom", "Type", "Marque", "Modèle", "Taille", "Description détaillée", "Jetons", "Actions"];
                    headers.forEach(function(headerText) {
                        var th = document.createElement("th");
                        th.textContent = headerText;
                        trAnnonces.appendChild(th);
                    });
                    tableAnnonces.appendChild(trAnnonces);
                    annoncesDiv.appendChild(tableAnnonces);
    
                    $.getJSON(adresse + '/controleur/service.php', {id : e.id, type : "perso"}, function(response) {
                        response.forEach(e => {
                            creerTablesEtBoutons2(tableAnnonces, e, nomType = "Service", role = "Admin1");
                        });

                        $.getJSON(adresse + '/controleur/materiel.php', {id : e.id, type : "perso"}, function(response) {
                            response.forEach(e => {
                                creerTablesEtBoutons2(tableAnnonces, e, nomType = "Matériel", role = "Admin1");
                            });
        
                            var btnRetour = document.createElement("button");
                            btnRetour.setAttribute("id", "btnRetour");
                            btnRetour.setAttribute("class", "boutonsActions");
                            btnRetour.textContent = "Retour";
                            btnRetour.style.marginTop = "10px";
        
                            btnRetour.addEventListener("click", () => {
                                annoncesDiv.remove();
                            });
        
                            annoncesDiv.appendChild(btnRetour);
                        });
                    });
                
                    div.appendChild(annoncesDiv);
                });
    
                tr2.appendChild(buttonsTh);
                table.appendChild(tr2);
    
                demandesDiv.appendChild(table);
                div.appendChild(demandesDiv);
            });
    });
}

async function creerUneAnnonce(element){
    const content = document.querySelector(element);

    var div = document.createElement("div");
    var h2 = document.createElement("h2");
    h2.textContent = "Créer une annonce";

    var btnCreer = document.createElement("button");
    btnCreer.setAttribute("id", "btnCreer");
    btnCreer.setAttribute("class", "boutonsActions");
    btnCreer.textContent = "Créer";
    div.append(h2, btnCreer);

    btnCreer.addEventListener("click", () => {
        divCreerAnnonce = creerDivCentrale("divCreerAnnonce");

        var champs = [
            { label: 'Nom', type: 'text', id: 'nom', maxlength: 30 },
            { label: 'Type d\'annonce', type: 'radio', id: 'type', options: ['Service', 'Matériel'] },
            { label: 'Catégorie de l\'annonce', type: 'select', id: 'categorie' },
            { label: 'Marque', type: 'text', id: 'marque' },
            { label: 'Modèle', type: 'text', id: 'modele' },
            { label: 'Taille', type: 'number', id: 'taille' },
            { label: 'Latitude', type: 'number', id: 'latitude' },
            { label: 'Longitude', type: 'number', id: 'longitude' },
            { label: 'Description détaillée', type: 'textarea', id: 'description', maxLength: 100},
        ];

        champs.forEach(champ => {
            var label = document.createElement('label');
            label.textContent = champ.label + ": ";
            divCreerAnnonce.appendChild(label);

            if (champ.type === 'radio') {
                champ.options.forEach(option => {
                    var inputRadio = document.createElement('input');
                    inputRadio.type = 'radio';
                    inputRadio.name = champ.id;
                    inputRadio.value = option;
                    inputRadio.style.width = 'auto';
                    divCreerAnnonce.appendChild(inputRadio);
                                
                    var label = document.createElement('label');
                    label.textContent = option;
                    divCreerAnnonce.appendChild(label);

                    inputRadio.addEventListener("change", () => {
                        if(inputRadio.value === "Service"){
                            document.getElementById('modele').readOnly = true;
                            document.getElementById('modele').style.backgroundColor = "grey";
                            document.getElementById('modele').value = "";
                            document.getElementById('marque').readOnly = true;
                            document.getElementById('marque').style.backgroundColor = "grey";
                            document.getElementById('marque').value = "";
                            document.getElementById('taille').readOnly = true;
                            document.getElementById('taille').style.backgroundColor = "grey";
                            document.getElementById('taille').value = "";
                        }else {
                            document.getElementById('modele').readOnly = false;
                            document.getElementById('modele').style.backgroundColor = "";
                            document.getElementById('marque').readOnly = false;
                            document.getElementById('marque').style.backgroundColor = "";
                            document.getElementById('taille').readOnly = false;
                            document.getElementById('taille').style.backgroundColor = "";
                        }
                    });
                });
            }else if (champ.type === "select") {
                var select = document.createElement("select");
                select.id = champ.id;
            
                $.getJSON(adresse + '/controleur/categorie.php', { type: "all" }, function(response) {
                    var i = 1;
                    response.forEach(e => {
                        var option = document.createElement("option");
                        option.textContent = e.nom;
                        option.value = i;
                        i++;
                        select.appendChild(option);
                    });
                });
            
                divCreerAnnonce.appendChild(select);
            }else if (champ.type === 'textarea') {
                var textarea = document.createElement('textarea');
                textarea.id = champ.id;
                textarea.rows = 2;
                textarea.style.width = '100%';
                textarea.maxlength = champ.maxlength;
                divCreerAnnonce.appendChild(textarea);
            }else {
                var input = document.createElement('input');
                input.type = champ.type;
                input.id = champ.id;
                input.style.width = '100%';
                input.maxlength = champ.maxlength;

                if (champ.maxlength) {
                    input.maxLength = champ.maxlength;
                }
                divCreerAnnonce.appendChild(input);
            }

            divCreerAnnonce.appendChild(document.createElement('br'));
        });

        const inputFile = document.createElement("input");
        const imagesZone = document.createElement("div");

        inputFile.id = "imagesFile";
        inputFile.type = "file" ;
        inputFile.classList.add("form-control");
        inputFile.setAttribute("accept", "images/*,.png");

        [inputFile].forEach((element) => imagesZone.appendChild(element));

        divCreerAnnonce.appendChild(imagesZone);

        const files = [];
        inputFile.addEventListener("change", () => {
            const currentFiles = inputFile.files;

            for (let i = 0; i < currentFiles.length; i++) {
                const reader = new FileReader();

                reader.addEventListener("load", (e) => {
                    files.push(e.target.result);
                });

                reader.readAsDataURL(currentFiles[i]);
            }
        });

        var btnValider = document.createElement("button");
        btnValider.setAttribute("id", "btnValider");
        btnValider.setAttribute("class", "boutonsActions");
        btnValider.textContent = "Valider";

        btnValider.addEventListener("click", () => {
            var valueNom = document.getElementById("nom").value;
            var valueRadio = document.querySelector('input[name="type"]:checked');
            var valueCategorie = document.getElementById("categorie").value;
            var valueMarque = document.getElementById("marque").value;
            var valueModele = document.getElementById("modele").value;
            var valueTaille = document.getElementById("taille").value;
            var valueLatitude = document.getElementById("latitude").value;
            var valueLongitude = document.getElementById("longitude").value;
            var valueDescription = document.getElementById("description").value;
        
            if(valueRadio === null){
                var message = document.createElement("p");
                message.textContent = "Veuillez remplir tous les champs, le type et une image.";
                message.id = "error";
                divCreerAnnonce.appendChild(message);
            }else if(valueRadio.value === "Matériel"){
                if (valueNom !== "" && valueRadio !== null && valueCategorie !== 0 && valueMarque !== "" && valueModele !== "" && valueTaille !== ""  && valueLatitude !== 0 && valueLongitude !== 0 && valueDescription !== "" && files.length !== 0) {
                    $.ajax({
                        url: adresse + '/controleur/materiel.php',
                        type: 'POST',
                        data: {
                            id: id,
                            type: "creerAnnonceMateriel",
                            nomMateriel: valueNom.trim(),
                            marqueMateriel: valueMarque.trim(),
                            modeleMateriel: valueModele.trim(),
                            tailleMateriel: valueTaille.trim(),
                            latitudeMateriel: valueLatitude.trim(),
                            longitudeMateriel: valueLongitude.trim(),
                            descriptionMateriel: valueDescription.trim(),
                            idCategorie: valueCategorie.trim(),
                        },
                        success: function(response) {
                            $.post(adresse + '/controleur/materiel.php', {id : id, type : "recupererIdDernierMateriel"}, function(response){
                                sendImages(files, response[0].id, "Matériel");
                            });

                            var message = document.createElement("p");
                            message.textContent = "Votre annonce a été créée avec succès! Nous allons procéder à sa vérification avant sa mise en ligne. Vous allez être redirigé(e) dans un cours instant.";
                            message.id = "succes";
                            divCreerAnnonce.appendChild(message);

                            setTimeout(() => {
                                divCreerAnnonce.remove();
                            }, 5000);
                        }
                    });
                }else {
                    var message = document.createElement("p");
                    message.textContent = "Veuillez remplir tous les champs, y compris une image.";
                    message.id = "error";
                    divCreerAnnonce.appendChild(message);
                }
            }else if(valueRadio.value === "Service"){
                if (valueNom !== "" && valueRadio !== null && valueCategorie !== 0 && valueMarque === "" && valueModele === "" && valueTaille === "" && valueLatitude !== 0 && valueLongitude !== 0 && valueDescription !== "" && files.length !== 0) {
                    $.ajax({
                        url: adresse + '/controleur/service.php',
                        type: 'POST',
                        data: {
                            id: id,
                            type: "creerAnnonceService",
                            nomService: valueNom.trim(),
                            latitudeService: valueLatitude.trim(),
                            longitudeService: valueLongitude.trim(),
                            descriptionService: valueDescription.trim(),
                            idCategorie: valueCategorie.trim(),
                        },
                        success: function(response) {
                            $.post(adresse + '/controleur/service.php', {id : id, type : "recupererIdDernierService"}, function(response){
                                sendImages(files, response[0].id, "Service");
                            });

                            var message = document.createElement("p");
                            message.textContent = "Votre annonce a été créée avec succès! Nous allons procéder à sa vérification avant sa mise en ligne. Vous allez être redirigé(e) dans un cours instant.";
                            message.id = "succes";
                            divCreerAnnonce.appendChild(message);

                            setTimeout(() => {
                                divCreerAnnonce.remove();
                            }, 5000);
                        }
                    });
                }else {
                    var message = document.createElement("p");
                    message.textContent = "Veuillez remplir tous les champs, y compris une image.";
                    message.id = "error";
                    divCreerAnnonce.appendChild(message);
                }
            }
        });
            
        var btnRetour = document.createElement("button");
        btnRetour.setAttribute("id", "btnRetour");
        btnRetour.setAttribute("class", "boutonsActions");
        btnRetour.textContent = "Retour";
        btnRetour.style.marginTop = "10px";
    
        btnRetour.addEventListener("click", () => {
            divCreerAnnonce.remove();
        });

        divCreerAnnonce.append(btnValider, btnRetour);
        content.appendChild(divCreerAnnonce);
    })

    content.appendChild(div);
}

function creerListeAnnonces(element) {
    const div = document.querySelector(element);

    if (element === ".gestionMesAnnonces"){
        const content = document.createElement("div")

        content.classList.add("content");

        var h2 = document.createElement("h2");
        h2.textContent = "Gérer mes annonces";
        content.appendChild(h2);

        var table = document.createElement("table");

        var tr = document.createElement("tr");
        if(screen.width > 1000){
            var headers = ["Type", "Nom", "Catégorie", "Marque", "Modèle", "Taille", "Description détaillée", "Jetons", "Actions"];
        }
        else{
            var headers = ["Type", "Nom", "Jetons", "Actions"];
        }
        
        headers.forEach(function(headerText) {
            var th = document.createElement("th");
            th.textContent = headerText;
            tr.appendChild(th);
        });
        table.appendChild(tr);

        $.getJSON(adresse + '/controleur/service.php', {id : id, type : "perso"}, function(services) {
            services.forEach(e => {
                creerTablesEtBoutons2(table, e, nomType = "Service", role = "Voisin");
            });

            $.getJSON(adresse + '/controleur/materiel.php', {id : id, type : "perso"}, function(materiels) {
                materiels.forEach(e => {
                    creerTablesEtBoutons2(table, e, nomType = "Matériel", role = "Voisin");
                });

                if(services.length == 0 && materiels.length == 0){
                    var message = document.createElement("th");
                    message.setAttribute("colspan", headers.length.toString());
                    message.textContent = "Aucune annonce encore créée";
                    message.id = "error";

                    table.appendChild(message);
                }
            });

            content.appendChild(table);    
            div.appendChild(content);  
        });

        creerUneAnnonce(".gestionMesAnnonces");
    }else if(element === ".annonces"){
        const content = document.createElement("div");
        
        var h2 = document.createElement("h2");
        h2.textContent = "Annonces en attente de validation";
        content.appendChild(h2);

        var table = document.createElement("table");

        var tr = document.createElement("tr");
        if(screen.width > 1000){
            var headers = ["Id", "Type", "Nom", "Catégorie", "Marque", "Modèle", "Taille", "Description détaillée", "Actions"];
        }
        else{
            var headers = ["Id", "Type", "Nom", "Actions"];
        }
        
        headers.forEach(function(headerText) {
            var th = document.createElement("th");
            th.textContent = headerText;
            tr.appendChild(th);
        });
        table.appendChild(tr);

        $.getJSON(adresse + '/controleur/service.php', {type : "afficherAnnoncesServiceAttente"}, function(services) {
            services.forEach(e => {
                creerTablesEtBoutons2(table, e, nomType = "Service", role = "Admin2");
            });

            $.getJSON(adresse + '/controleur/materiel.php', {type : "afficherAnnoncesMaterielAttente"}, function(materiels) {
                console.log(materiels);
                materiels.forEach(e => {
                    creerTablesEtBoutons2(table, e, nomType = "Matériel", role = "Admin2");
                });

                if(services.length == 0 && materiels.length == 0){
                    var message = document.createElement("th");
                    message.setAttribute("colspan", headers.length.toString());
                    message.textContent = "Aucune annonce en attente";
                    message.id = "error";

                    table.appendChild(message);
                }
            });

            content.appendChild(table);   
            div.appendChild(content);   
        });
    }
}

function creerTablesEtBoutons2(table, e, nomType, role){
    var trInfos = document.createElement("tr");
    var thNomType = document.createElement("th");
    thNomType.textContent = nomType;
    var thNom = document.createElement("th");
    thNom.textContent = e.nom;

    if(nomType === "Service"){
        var thVide = document.createElement("th");
        thVide.colSpan = "3";
    }else {
        var thMarque = document.createElement("th");
        thMarque.textContent = e.marque;
        var thModele = document.createElement("th");
        thModele.textContent = e.modele;
        var thTaille = document.createElement("th");
        thTaille.textContent = e.taille;
    }
    var thCategorie = document.createElement("th");
    thCategorie.textContent = e.categorie.nom;

    var thDescriptionDetaillee = document.createElement("th");
    thDescriptionDetaillee.textContent = e.description;
    var thJetons = document.createElement("th");
    thJetons.textContent = e.jetons;

    if(role === "Voisin" || role === "Admin1"){
        buttonsTh = btnActions(nomType, e, trInfos, role); 
        if(screen.width > 1000){
            if(nomType === "Service"){
                trInfos.append(thNomType, thNom, thCategorie, thVide, thDescriptionDetaillee, thJetons, buttonsTh);   
            }else {
                trInfos.append(thNomType, thNom, thCategorie, thMarque, thModele, thTaille, thDescriptionDetaillee, thJetons, buttonsTh);
            }
        }else{
            if(nomType === "Service"){
                trInfos.append(thNomType, thNom, thJetons, buttonsTh);   
            }else {
                trInfos.append(thNomType, thNom, thJetons, buttonsTh);
            }
        }
    }else if(role === "Admin2"){
        var thId = document.createElement("th");
        thId.textContent = e.id;
        buttonsTh = btnActions(nomType, e, trInfos, role);
        
        if(screen.width > 1000){
            if(nomType === "Service"){
                trInfos.append(thId, thNomType, thNom, thCategorie, thVide, thDescriptionDetaillee, buttonsTh); 
            }else {
                trInfos.append(thId, thNomType, thNom, thCategorie, thMarque, thModele, thTaille, thDescriptionDetaillee, buttonsTh); 
            }
        }else{
            if(nomType === "Service"){
                trInfos.append(thId, thNomType, thNom,  buttonsTh); 
            }else {
                trInfos.append(thId, thNomType, thNom, buttonsTh); 
            }
        }
    }

    table.appendChild(trInfos);
}

function btnActions(nomType, e, trInfos, role){
    if(role === "Admin2") {
        var buttonsTh = document.createElement("th");
        var btnValider = document.createElement("button");
        btnValider.setAttribute("id", "btnValider");
        btnValider.setAttribute("class", "boutonsActions");
        btnValider.textContent = "Valider";
        buttonsTh.appendChild(btnValider);

        btnValider.addEventListener("click", () => {
            valorisationDiv = creerDivCentrale("valorisationDiv");
            creerDivValorisation(valorisationDiv, nomType, e, trInfos, role);

            document.body.appendChild(valorisationDiv);
        });
    }

    if(role === "Admin1" || role === "Voisin"){
        var buttonsTh = document.createElement("th");
        var btnModifier = document.createElement("button");
        btnModifier.setAttribute("id", "btnModifier");
        btnModifier.setAttribute("class", "boutonsActions");
        btnModifier.textContent = "Modifier";
        buttonsTh.appendChild(btnModifier);
    
        btnModifier.addEventListener("click", () => {
            modificationDiv = creerDivCentrale("modificationDiv");
            creerDivModification(modificationDiv, nomType, e, trInfos, role);
    
            document.body.appendChild(modificationDiv);
        });
    }

    var btnSupprimer = document.createElement("button");
    btnSupprimer.setAttribute("id", "btnSupprimer");
    btnSupprimer.setAttribute("class", "boutonsActions");
    btnSupprimer.textContent = "Supprimer";
    buttonsTh.appendChild(btnSupprimer);

    btnSupprimer.addEventListener("click", () => {
        if(nomType === "Matériel"){
            $.ajax({
                url: adresse + '/controleur/materiel.php',
                type: 'POST',
                data: {
                    id: e.id,
                    type: "supprimerAnnonceMateriel",
                },
                success: function(response) {
                    trInfos.remove();
                }
            });
        }else if(nomType === "Service"){
            $.ajax({
                url: adresse + '/controleur/service.php',
                type: 'POST',
                data: {
                    id: e.id,
                    type: "supprimerAnnonceService",
                },
                success: function(response) {
                    trInfos.remove();
                }
            });
        }
    });

    if(role === "Admin1"){
        var btnValoriser = document.createElement("button");
        btnValoriser.setAttribute("id", "btnValoriser");
        btnValoriser.setAttribute("class", "boutonsActions");
        btnValoriser.textContent = "Valoriser";
        buttonsTh.appendChild(btnValoriser);
    
        btnValoriser.addEventListener("click", () => {
            var valorisationDiv = creerDivCentrale("valorisationDiv");
            creerDivValorisation(valorisationDiv, nomType, e, trInfos, role);

            document.body.appendChild(valorisationDiv);
        });
    }

    return buttonsTh;
}

function creerDivCentrale(nomDiv){
    var nomDiv = document.createElement("div");
    nomDiv.setAttribute("id", nomDiv);
    nomDiv.style.position = "fixed";
    nomDiv.style.top = "50%";
    nomDiv.style.left = "50%";
    nomDiv.style.transform = "translate(-50%, -50%)";
    nomDiv.style.backgroundColor = "#ffffff";
    nomDiv.style.padding = "20px";
    nomDiv.style.border = "1px solid #cccccc";
    nomDiv.style.borderRadius = "5px";
    nomDiv.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
    nomDiv.style.textAlign = "center";

    return nomDiv;
}

function creerDivValorisation(valorisationDiv, nomType, e, trInfos, role){
    var texte = document.createElement("h2");
    texte.textContent = "Valorisation de l'annonce";
    valorisationDiv.appendChild(texte);
    var label = document.createElement('label');
    label.textContent = "Montant de la valorisation : ";
    valorisationDiv.appendChild(label);

    var input = document.createElement('input');
    input.setAttribute("id", "labelJetons");
    input.type = "number";
    input.style.width = '100%';
    valorisationDiv.appendChild(input);

    var btnValider = document.createElement("button");
    btnValider.setAttribute("id", "btnValider");
    btnValider.setAttribute("class", "boutonsActions");
    btnValider.textContent = "Valider";

    btnValider.addEventListener("click", () => {
        var jetons = document.getElementById("labelJetons").value;

        if(nomType === "Matériel"){
            $.post(adresse + '/controleur/materiel.php', {id : e.id, type : "validerAnnonce", nbJetons : jetons});
        }else {
            $.post(adresse + '/controleur/service.php', {id : e.id, type : "validerAnnonce", nbJetons : jetons});
        }

        if(role === "Admin2"){
            trInfos.remove();
            valorisationDiv.remove();
        }else {
            valorisationDiv.remove();
        }
    });

    var btnRetour = document.createElement("button");
    btnRetour.setAttribute("id", "btnRetour");
    btnRetour.setAttribute("class", "boutonsActions");
    btnRetour.textContent = "Retour";
    btnRetour.style.marginTop = "10px";

    btnRetour.addEventListener("click", () => {
        valorisationDiv.remove();
    });

    valorisationDiv.append(btnValider, btnRetour);
}

function creerDivModification(modificationDiv, nomType, e, trInfos, role){
    var champs = [
        { label: 'Nom', type: 'text', id: 'nom', placeholder: e.nom },
        { label: 'Catégorie de l\'annonce', type: 'select', id: 'categorie' },
    ];

    if(nomType === "Matériel"){
        champs.push(
            { label: 'Marque', type: 'text', id: 'marque', placeholder: e.marque },
            { label: 'Modèle', type: 'text', id: 'modele', placeholder: e.modele },
            { label: 'Taille', type: 'number', id: 'taille', placeholder: e.taille },
        );
    }

    champs.push(
        { label: 'Description détaillée', type: 'textarea', id: 'description', placeholder: e.description },
    )

    champs.forEach(champ => {
        var label = document.createElement('label');
        label.textContent = champ.label + ": ";
        modificationDiv.appendChild(label);

        if (champ.type === "select") {
            var select = document.createElement("select");
            select.id = champ.id;
            
            var option = document.createElement("option");
            option.textContent = e.categorie.nom;
            option.value = e.value;
            option.selected = true; 
            select.appendChild(option);
        
            $.getJSON(adresse + '/controleur/categorie.php', { type: "all" }, function(response) {
                var i = 1;
                response.forEach(element => {
                    if(element.nom !== e.categorie.nom){
                        var option = document.createElement("option");
                        option.textContent = element.nom;
                        option.value = i;
                        i++;
                        select.appendChild(option);
                    }
                });
            });

            modificationDiv.appendChild(select);
        }else if (champ.type === 'textarea') {
            var textarea = document.createElement('textarea');
            textarea.id = champ.id;
            textarea.rows = 4;
            textarea.style.width = '100%';
            textarea.placeholder = champ.placeholder;
            modificationDiv.appendChild(textarea);
        }else {
            var input = document.createElement('input');
            input.type = champ.type;
            input.id = champ.id;
            input.style.width = '100%';
            input.placeholder = champ.placeholder;

            if (champ.maxlength) {
                input.maxLength = champ.maxlength;
            }
            modificationDiv.appendChild(input);
        }

        modificationDiv.appendChild(document.createElement('br'));
    });

    var btnValider = document.createElement("button");
    btnValider.setAttribute("id", "btnValider");
    btnValider.setAttribute("class", "boutonsActions");
    btnValider.textContent = "Valider";

    btnValider.addEventListener("click", () => {
        var valueNom = document.getElementById("nom").value;
        var valueCategorie = document.getElementById("categorie").value;
        var valueDescription = document.getElementById("description").value;

        if(nomType === "Matériel"){
            var valueMarque = document.getElementById("marque").value;
            var valueModele = document.getElementById("modele").value;
            var valueTaille = document.getElementById("taille").value;

            if(valueNom !== "" && valueMarque !== "" && valueModele !== "" && valueTaille !== 0 && valueDescription !== ""){
                $.post(adresse + '/controleur/materiel.php', {id : e.id, type : "validerAnnonceModifiee", nomMateriel: valueNom, marqueMateriel: valueMarque, modeleMateriel: valueModele, tailleMateriel: valueTaille, descriptionMateriel: valueDescription, categorieMateriel: valueCategorie});
                modificationDiv.remove();
            }else {
                var message = document.createElement("p");
                message.textContent = "Veuillez modifier tous les champs.";
                message.id = "error";
                modificationDiv.append(message);

                console.log(valueCategorie);
            }
        }else {
            if(valueNom !== "" && valueDescription !== ""){
                console.log("Nom : " + valueNom + ", categorie : " + valueCategorie + ", description : " + valueDescription);
                $.post(adresse + '/controleur/service.php', {id : e.id, type : "validerAnnonceModifiee", nomService: valueNom, descriptionService: valueDescription, categorieService: valueCategorie});
                modificationDiv.remove();
            }else {
                var message = document.createElement("p");
                message.textContent = "Veuillez modifier tous les champs.";
                message.id = "error";
                modificationDiv.append(message);
            }
        }
    });

    var btnRetour = document.createElement("button");
    btnRetour.setAttribute("id", "btnRetour");
    btnRetour.setAttribute("class", "boutonsActions");
    btnRetour.textContent = "Retour";
    btnRetour.style.marginTop = "10px";

    btnRetour.addEventListener("click", () => {
        modificationDiv.remove();
    });

    modificationDiv.append(btnValider, btnRetour);
}

async function creerTableauBord(element = "#mainContent", admin = false) {
    const content = document.querySelector(element);

    const mainDiv = document.createElement("div");
    mainDiv.classList.add("container", "p-5");   

    if (admin) {
        const chiffres = document.createElement("div");
        const gestions = document.createElement("div");
        const annonces = document.createElement("div"); 

        ["chiffres", "d-flex", "justify-content-center"].forEach((element) => chiffres.classList.add(element));
        ["gestions", "d-flex", "justify-content-center"].forEach((element) => gestions.classList.add(element));
        ["annonces", "d-flex", "justify-content-center"].forEach((element) => annonces.classList.add(element));

        [chiffres, gestions, annonces].forEach((element) => mainDiv.appendChild(element));

        content.appendChild(mainDiv);

        creerChiffresCles(".chiffres");
        creerListeVoisins(".gestions");
        creerListeAnnonces(".annonces");
    } else {
        const mesAffaires = document.createElement("div");
        const pretsServices = document.createElement("div");
        const empruntService = document.createElement("div");
        const solde = document.createElement("div");

        ["mesAffaires", "d-flex", "justify-content-center"].forEach((element) => mesAffaires.classList.add(element));
        ["pretsServices", "d-flex", "justify-content-center"].forEach((element) => pretsServices.classList.add(element));
        ["empruntService", "d-flex", "justify-content-center"].forEach((element) => empruntService.classList.add(element));
        ["solde", "d-flex", "justify-content-center"].forEach((element) => solde.classList.add(element));

        [solde, mesAffaires, pretsServices, empruntService].forEach((element) => mainDiv.appendChild(element));

        content.appendChild(mainDiv);

        creerZoneAffaires(".mesAffaires", "perso", "Mes Services et Matériels");
        creerListePrets(".pretsServices");
        creerListeEmprunts(".empruntService");
        creerListeSolde(".solde");
    }
}

function creerChiffresCles(element) {
    const div = document.querySelector(element);

    const chiffresDiv = document.createElement("div");
    const titreChiffresDiv = document.createElement("h2");

    titreChiffresDiv.textContent = "Chiffres clés";

    $.getJSON(adresse + '/controleur/utilisateur.php', { type: "nbVoisins" }, function(response) {
        var p = document.createElement("p");
        p.innerHTML = "Total de GentiVoisins : " + response.length;
        chiffresDiv.appendChild(p);
    });

    $.getJSON(adresse + '/controleur/utilisateur.php', { type: "nbTransactions" }, function(response) {
        var p = document.createElement("p");
        p.innerHTML = "Nombre de transactions : " + response.length;
        chiffresDiv.appendChild(p);
    });

    chiffresDiv.appendChild(titreChiffresDiv);

    div.appendChild(chiffresDiv);
}

function creerListePrets(element) {
    const div = document.querySelector(element);

    const pretsDiv = document.createElement("div");
    const titrePretsDiv = document.createElement("h2");

    titrePretsDiv.textContent = "Prêts et Services Rendus";
    pretsDiv.appendChild(titrePretsDiv);

    $.getJSON(adresse + '/controleur/transaction.php', {id : id, type : "matP"}, function(response) {
        response.forEach((e) => {
            var p = document.createElement("p");
            if(e.date != "0000-00-00"){
                p.textContent = "Matériel : "+e.materiel.nom+", récupéré le "+e.date+".";
            }
            else{
                p.textContent = "Matériel : "+e.materiel.nom+", en cours d'emprunt.";

            }
            pretsDiv.appendChild(p);
        })
    });
    $.getJSON(adresse + '/controleur/transaction.php', {id : id, type : "serP"}, function(response) {
        response.forEach((e) => {
            var p = document.createElement("p");
            if(e.date != "0000-00-00"){
                p.textContent = "Service : "+e.service.nom+", récupéré le : "+e.date+".";
            }
            else{
                p.textContent = "Service : "+e.service.nom+", en cours d'emprunt.";
            }
            pretsDiv.appendChild(p);
        })
    });
    

    div.appendChild(pretsDiv);
}

function creerListeEmprunts(element) {
    const div = document.querySelector(element);

    const empruntsDiv = document.createElement("div");
    const titreEmpruntsDiv = document.createElement("h2");

    titreEmpruntsDiv.textContent = "Emprunts et Services Reçus";
    
    empruntsDiv.appendChild(titreEmpruntsDiv);

    $.getJSON(adresse + '/controleur/transaction.php', {id : id, type : "matE"}, function(response) {
        response.forEach((e) => {
            var p = document.createElement("p");
            p.classList = "contentVoisin card";
            if(e.date != "0000-00-00"){
                p.textContent = "Matériel : "+e.materiel.nom+", rendu le "+e.date+".";
            }
            else{
                p.textContent = "Matériel : "+e.materiel.nom+", en cours d'emprunt.";
                var btn = document.createElement("button");
                btn.classList = "btn btn-secondary";
                btn.textContent = "rendu";
                btn.addEventListener("click",() => {
                    $.getJSON(adresse + '/controleur/transaction.php', {nom : e.materiel.nom, type : "rendu", cat : "mat"}, function(response) {
                        p.style.display = none;
                    });
                })
                p.appendChild(btn);
            }
            empruntsDiv.appendChild(p);
        })
    });
    $.getJSON(adresse + '/controleur/transaction.php', {id : id, type : "serE"}, function(response) {
        response.forEach((e) => {
            var p = document.createElement("p");
            p.classList = "contentVoisin card";
            if(e.date != "0000-00-00"){
                p.textContent = "Service : "+e.service.nom+", récupéré le : "+e.date+".";
            }
            else{
                p.textContent = "Service : "+e.service.nom+", en cours d'emprunt.";
                var btn = document.createElement("button");
                btn.classList = "btn btn-secondary";
                btn.textContent = "rendu";                
                btn.addEventListener("click",() => {
                    $.getJSON(adresse + '/controleur/transaction.php', {nom : e.service.nom, type : "rendu", cat : "ser"}, function(response) {
                        p.style.display = none;
                    });
                })
                p.appendChild(btn);
            }
            empruntsDiv.appendChild(p);
        })
    });

    

    div.appendChild(empruntsDiv);
}   

function creerListeSolde(element) {
    const div = document.querySelector(element);

    const soldeDiv = document.createElement("div");
    const titreSoldeDiv = document.createElement("h2");

    titreSoldeDiv.textContent = "Solde";

    soldeDiv.appendChild(titreSoldeDiv);

    $.getJSON(adresse + '/controleur/transaction.php', {id : id, type : "solde"}, function(response) {
        var p = document.createElement("p");
        p.classList = "contentVoisin card";
        p.textContent = response+" jetons";
        soldeDiv.appendChild(p);
    });
    
    div.appendChild(soldeDiv);
} 