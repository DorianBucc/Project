// déclaration des fonctions

function clear(element = "#mainContent") {
    document.querySelector(element).innerHTML = "";
}

async function loadUser() {
    var user = {info : {}, service: {}, materiel: {}};

    user.info = await getUserInfo();
    user.service.favoris = await getServices("favoris");
    user.materiel.favoris = await getMateriels("favoris");
    user.service.panier = await getServices("panier");
    user.materiel.panier = await getMateriels("panier");

    return user;
}

function filtreMulti(elements = ".card") {
    const searchBar = document.querySelector("#searchBar");
    const filtreService = document.querySelector("#filtreService");
    const filtreMateriel = document.querySelector("#filtreMateriel");
    const filtreCategorie = document.querySelector("#filtreCategorie");
    const filtreStatut = document.querySelector("#filtreStatut");

    const displayService = filtreService.classList.contains("active");
    const displayMateriel = filtreMateriel.classList.contains("active");

    const menuCategorie = filtreCategorie.querySelector("#filtreCategorie-menu");
    const contentCategorie = menuCategorie.textContent.split(':')[1].trim();
    const valueCategorie = (contentCategorie == "Tout" ? '' : contentCategorie);

    const menuStatut = filtreStatut.querySelector("#filtreStatut-menu");
    const contentStatut = menuStatut.textContent.split(':')[1].trim();
    const valueStatut = (contentStatut == "Tout" ? '' : contentStatut);

    let filter1, filter2, filter3, filter4;

    const iterables = document.querySelectorAll(elements);

    for (const iterable of iterables) {
        iterable.parentNode.style.display = "none";

        filter1 = isFilter(iterable, ".card-title", searchBar.value)
        filter2 = displayService && displayMateriel ? true : isFilter(iterable, ".card-headerType", "Service", displayService) && isFilter(iterable, ".card-headerType", "Matériel", displayMateriel);
        filter3 = isFilter(iterable, ".card-text.categorie", valueCategorie);
        filter4 = isFilter(iterable, ".card-text.statut", valueStatut);

        if (filter1 && filter2 && filter3 && filter4) {
            iterable.parentNode.style.display = "";
        }
    }
}

function isFilter(element, target, value, isDisplay = true) {
    const cible = element.querySelector(target);
    const valeur1 = cible.textContent.trim().toLowerCase();
    const valeur2 = value.trim().toLowerCase();

    return isDisplay ? valeur1.includes(valeur2) : !valeur1.includes(valeur2);
}

function createDropdown(id = "dropdown-id", title = "Dropdown", items = [{id: "action-id", value: "action"}]) {
    const dropdown = document.createElement("div");
    const button = document.createElement("button");
    const dropdownFiltre = document.createElement("div");
    const dropdownMenu = document.createElement("ul");
    const dropdownItem = document.createElement("li");

    dropdown.id = id;
    dropdown.classList.add("dropdown");
    button.type = "button";
    dropdownFiltre.classList.add("dropdown-filtre");
    dropdownMenu.classList.add("dropdown-menu");

    const buttonItem = button.cloneNode();

    ["btn", "btn-info", "dropdown-toggle"].forEach((element) => button.classList.add(element));
    button.setAttribute("data-bs-toggle", "dropdown"); button.setAttribute("aria-expanded", "false");
    button.id = id + "-menu";
    buttonItem.classList.add("dropdown-item");
    dropdownMenu.setAttribute("aria-labelledby", button.id);

    button.textContent = title;

    items.forEach((item) => {
        const dropdownItemCloned = dropdownItem.cloneNode();
        const buttonItemCloned = buttonItem.cloneNode();

        buttonItemCloned.id = item.id;
        buttonItemCloned.textContent = item.value;

        dropdownItemCloned.appendChild(buttonItemCloned);
        dropdownMenu.appendChild(dropdownItemCloned);
    });

    [button, dropdownFiltre, dropdownMenu].forEach((element) => dropdown.appendChild(element));
    
    return dropdown;
}

function createCarousel(id = "carousel-id", items = [{nom: "defaut", alt: "Image par défaut"}]) {
    const imagePath = adresse + "/controleur/image/";
    const images = items;

    if (images.length == 0) {
        images.push({nom: "defaut", alt: "Image par défaut"});
    }

    const carousel = document.createElement("div");
    const carouselIndicators = document.createElement("div");
    const carouselTarget = document.createElement("button");
    const carouselInner = document.createElement("div");
    const carouselItem = document.createElement("div");
    const carouselImage = document.createElement("img");
    
    carousel.id = id; 
    ["carousel", "slide"].forEach((element) => carousel.classList.add(element));
    
    ["carousel-indicators"].forEach((element) => carouselIndicators.classList.add(element));
    ["carousel-inner"].forEach((element) => carouselInner.classList.add(element));
    ["carousel-item"].forEach((element) => carouselItem.classList.add(element));

    ["rounded", "carouselImage"].forEach((element) => carouselImage.classList.add(element));

    for (let i = 0; i < images.length; i++) {
        const carouselTargetCloned = carouselTarget.cloneNode();
        const carouselItemCloned = carouselItem.cloneNode();
        const carouselImageCloned = carouselImage.cloneNode();

        if (i == 0) {
            [{name: "aria-current", value: "true"}].forEach((element) => carouselTargetCloned.setAttribute(element.name, element.value));
            carouselTargetCloned.classList.add("active");
            carouselItemCloned.classList.add("active");
        }

        [{name: "data-bs-target", value: "#" + carousel.id}, {name: "data-bs-slide-to", value: i.toString()}, {name: "aria-label", value: "slide " + (i + 1).toString()}].forEach((element) => carouselTargetCloned.setAttribute(element.name, element.value));

        carouselImageCloned.src = imagePath + images[i].nom + ".png";
        carouselImageCloned.alt = images[i].alt,

        carouselIndicators.appendChild(carouselTargetCloned);
        carouselItemCloned.appendChild(carouselImageCloned);
        carouselInner.appendChild(carouselItemCloned);
    }

    [carouselIndicators, carouselInner].forEach((element) => carousel.appendChild(element));

    if (images.length > 1) {
        const carouselControlPrev = document.createElement("a");
        const carouselControlIconPrev = document.createElement("span");
        const carouselControlTextPrev = document.createElement("span");
    
        [{name: "type", value: "button"}, {name: "data-bs-target", value: "#" + carousel.id}].forEach((element) => carouselControlPrev.setAttribute(element.name, element.value));
        [{name: "aria-hidden", value: "true"}].forEach((element) => carouselControlIconPrev.setAttribute(element.name, element.value));
        ["visually-hidden"].forEach((element) => carouselControlTextPrev.classList.add(element));
    
        const carouselControlNext = carouselControlPrev.cloneNode();
        const carouselControlIconNext = carouselControlIconPrev.cloneNode();
        const carouselControlTextNext = carouselControlTextPrev.cloneNode();
        
        ["carousel-control-prev"].forEach((element) => carouselControlPrev.classList.add(element));
        [{name: "data-bs-slide", value: "prev"}].forEach((element) => carouselControlPrev.setAttribute(element.name, element.value));
        ["carousel-control-prev-icon"].forEach((element) => carouselControlIconPrev.classList.add(element));
        carouselControlTextPrev.textContent = "Prev";
    
        ["carousel-control-next"].forEach((element) => carouselControlNext.classList.add(element));
        [{name: "data-bs-slide", value: "next"}].forEach((element) => carouselControlNext.setAttribute(element.name, element.value));
        ["carousel-control-next-icon"].forEach((element) => carouselControlIconNext.classList.add(element));
        carouselControlTextNext.textContent = "Next";

        [carouselControlIconPrev, carouselControlTextPrev].forEach((element) => carouselControlPrev.appendChild(element));
        [carouselControlIconNext, carouselControlTextNext].forEach((element) => carouselControlNext.appendChild(element));
        [carouselControlPrev, carouselControlNext].forEach((element) => carousel.appendChild(element));
    }
    return carousel;
}

function createModal(id = "modal-id", title = "title") {
    const modal = document.createElement("div");
    const modalDialog = document.createElement("div");
    const modalContent = document.createElement("div");
    const modalHeader = document.createElement("div");
    const modalTitle = document.createElement("h5");
    const modalBody = document.createElement("div");

    modal.id = id; modal.classList.add("modal"); modal.setAttribute("tabindex", "-1");
    ["modal-dialog", "modal-lg"].forEach((element) => modalDialog.classList.add(element));
    modalContent.classList.add("modal-content");
    modalHeader.classList.add("modal-header");
    modalTitle.classList.add("modal-title");
    modalBody.classList.add("modal-body");

    modalTitle.textContent = title;

    modalHeader.appendChild(modalTitle);
    [modalHeader, modalBody].forEach((element) => modalContent.appendChild(element));
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    return modal;
}

function initMapDetail(id, latitude, longitude, rayon) {
    const map = L.map(id).setView([latitude, longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const circle = L.circle([latitude, longitude], {
        color: 'red',       
        fillColor: '#f03',  
        fillOpacity: 0.5,   
        radius: 500
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map);
}

function createUploadZone(element) {
    const content = document.querySelector(element);

    const inputFile = document.createElement("input");
    const imagesZone = document.createElement("div");
    const imagesPreview = document.createElement("div");
    const imageButtonDelete = document.createElement("button");

    inputFile.id = "imagesFile";
    inputFile.type = "file" ;
    inputFile.classList.add("form-control");
    inputFile.setAttribute("accept", "images/*,.png");

    imagesPreview.classList.add("container", "d-flex");

    imageButtonDelete.type = "button";
    imageButtonDelete.textContent = "Supprimer";
    ["btn", "btn-sm", "btn-danger"].forEach((element) => imageButtonDelete.classList.add(element));

    [inputFile, imagesPreview].forEach((element) => imagesZone.appendChild(element));

    content.appendChild(imagesZone);


    // ajout des listener 

    // la variable "files" doit être déclaré avant, c'est un tableau qui contiendra les images à envoyer

    inputFile.addEventListener("change", () => {
        const currentFiles = inputFile.files;

        for (let i = 0; i < currentFiles.length; i++) {
            const reader = new FileReader();

            reader.addEventListener("load", (e) => {
                const imageContainer = document.createElement("div")
                const image = document.createElement('img');
                const imageButtonDeleteCloned = imageButtonDelete.cloneNode(true);

                image.src = e.target.result;

                imageContainer.classList.add("d-flex", "flex-column", "justify-content-center", "w-25", "h-25");
                [image, imageButtonDeleteCloned].forEach((element) => imageContainer.appendChild(element));

                imagesPreview.appendChild(imageContainer);

                files.push(e.target.result.toString());

                imageButtonDeleteCloned.addEventListener("click", () => {
                    inputFile.value = '';
                    imageContainer.remove();
                    files.splice(files.indexOf(e.target.result), 1);
                });
            });
            reader.readAsDataURL(currentFiles[i]);
        }
    });
}

async function sendImages(files = [], id, nomType) {
    console.log("files : " + files, "id : " + id, "Nomtype : " + nomType);
    $.ajax({
        url: nomType === "Matériel" ? adresse + 'controleur/materiel.php' : adresse + 'controleur/service.php',
        type: 'POST',
        data: { 
            type: "postImages",
            id: id,
            files: JSON.stringify(files) 
        },
        dataType: 'json',
        success: function(response) {
            console.log(response);
        }
    });

}