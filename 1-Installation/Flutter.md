## Installation de Flutter pour vscode sur Windows
Flutter est un framework permettant la création d'interface plus facilement, le flutter est basé sur le language Dart.

[Guide pour PATH](https://github.com/DorianBucc/Prog/tree/main?tab=readme-ov-file#PATH)

</br>

1. Télécharger le fichier zip : [Lien du site](https://docs.flutter.dev/get-started/install)
2. Extraire le fichier zip 
> Pour ma part j'ai mis le repertoire flutter à la racine comme ceci : *C:\flutter*
3. Puis ajouter à la PATH : [nomduchemin]/flutter/bin
> Dans mon exemple ça donnerai ceci : *C:\flutter\bin* 
4. Taper dans le terminal la CLI : `flutter doctor`
> La cli vous indique les problemes ou extension que vous n'avez pas ( certaine ne sont pas obligatoire )
5. Essayez cette CLI pour vérifier que l'installation s'est bien déroulée : `flutter --version`

</br>

---

## Création d'un projet Flutter

</br>

1. Ajouter les extensions à vscode : **Flutter**, **Dart**
2. Taper dans la barre de recherche de vscode : *>Flutter: New Project*
> ou alors *Ctrl + Shift + P* et taper aussi : *>Flutter: New Project*

> Tous les fichiers de base vont se créer 
3. Une fois fini, lancer avec la CLI : `flutter run` 
4. Puis choisi l'environnement Chrome ou Egde qui sont valide par default, Windows il faut avoir ajouter les librairies (que je n'ai pas fait).

</br>

---

## Installation de Android Studio
Il permet l'utilisation d'emulateur pour tester le projet.

</br>

1. Télécharger le fichier l'installeur : [Lien du site](https://developer.android.com/studio)
2. Executer le fichier et suiver les instructions de l'installeur Android Studio

</br>

### Ouverture d'un emulateur Android

* Chercher le bouton "Virtual Device Manager" d'origine il est dans "More Actions" puis lancer votre android si il en existe ou ajouter en un.
