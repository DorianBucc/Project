# Installation du compilateur c (gcc) avec MinGW sur Windows
Le compilateur permet de transformé du code c en fichier binaire/executable.

1. Téléchargez et installez l'installateur depuis : https://sourceforge.net/projects/mingw/

2. Une fois installé, il ouvrira une page et vous devrez choisir les packages dont vous avez besoin. Pour confirmer, accédez à l'onglet "Installation" puis cliquez sur "Apply Changes".

3. Ajoutez à la variable PATH : [nomduchemin]\MinGW\bin
    * Exemple : C:\MinGW\bin 
* (Accédez aux variables d'environnement pour ajouter une PATH : https://github.com/DorianBucc/Prog/tree/main?tab=readme-ov-file#PATH)

4. Essayez la cli pour vérifier que l'installation s'est bien déroulée : gcc -v

# Installation du compilateur c (gcc) avec MinGW sur Linux

- Télécharger et Installer avec : sudo apt install gcc

Essayez la cli pour vérifier que l'installation s'est bien déroulée : gcc -v

# Utilisation de gcc Windows
* Pour compiler : gcc -o NomDuFichierExecutable NomDuFichierSource.c 
* Pour executer sur :
    * CMD : Start NomDuFichierExecutable.exe
    * Powershell : ./NomDuFichierExecutable.exe 

# Utilisation de gcc Linux
* Pour compiler : gcc -o NomDuFichierExecutable NomDuFichierSource.c
* Pour executer : ./NomDuFichierExecutable
    * (des fois il y a l'extension .out, .exe ou rien)