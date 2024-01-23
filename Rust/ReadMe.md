## Comment installer le Rust

Src : [lien1](https://stackoverflow.com/questions/55603111/unable-to-compile-rust-hello-world-on-windows-linker-link-exe-not-found) [BuildTools2019](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools&rel=16)


1. Télécharger et installer BuildTools 2019 ou 2022.
    - Ajouter le package : Desktop development with C++
2. Télécharger l'installeur rust : [Lien du site](https://www.rust-lang.org/fr/tools/install)
3. Ajouter l'extension rust-analyser à vscode.

## Créer un projet en Rust

> [!WARNING]
> Dans rust prioriser les *_* au *CammelCase* ou *Pascalcase* car le rust râle après les majuscules
> * Exemple : lenomdemavariable
>    - le_nom_de_ma_variable (avec le *_*)
>    - Lenomdemavariable (*Pascalcase*)
>    - LeNomDeMaVariable (*CammelCase*)

- Pour créer un projet dans vscode (nom du projet sans majuscule)
> cargo new nameproject
- Ouvrer bien vscode à la racine du projet rust sinon rust-analyser ne détectera pas le projet.

