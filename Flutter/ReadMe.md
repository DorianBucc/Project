## Installation de Flutter pour vscode sur Windows
Flutter est un framework permettant la création d'interface plus facilement, le flutter est basé sur le language Dart.

1. Télécharger le fichier zip : https://docs.flutter.dev/get-started/install
2. Extraire le fichier zip
3. Pour ma part j'ai mis le repertoire flutter à la racine comme ceci : 
    * C:\flutter
4. Puis ajouter à la PATH : [nomduchemin]/flutter/bin
    * Dans mon exemple ça donnerai ceci : C:\flutter\bin
    (https://github.com/DorianBucc/Prog/tree/main?tab=readme-ov-file#PATH)
5. Taper dans le terminal la cli : ```flutter doctor```
    * La cli vous indique les problemes ou extension que vous n'avez pas ( certaine ne sont pas obligatoire )
6. Essayez la cli pour vérifier que l'installation s'est bien déroulée : ```flutter --version```



## Création d'un projet Flutter
1. Ajouter les extensions à vscode : Flutter, Dart
2. Taper dans la barre de recherche de vscode : >Flutter: New Project
    * ou alors Ctrl+Shift+P et taper aussi : >Flutter: New Project
* Tous les fichiers de base vont se créer 
3. Une fois fini, lancer avec la cli : ```flutter run```
    * Puis choisi l'environnement Chrome ou Egde qui sont valide par default, Windows il faut avoir ajouter les librairies (que je n'ai pas fait).

---

## Installation de Android Studio
Il permet l'utilisation d'emulateur pour tester le projet.

1. Télécharger le fichier l'installeur : https://developer.android.com/studio
2. Executer le fichier et suiver les instructions de l'installeur Android Studio



## Ouverture d'un emulateur Android

* Chercher le bouton "Virtual Device Manager" d'origine il est dans "More Actions" puis lancer votre android si il en existe ou ajouter en un.
