## Installation du compilateur c++ (g++) avec MinGW sur Windows
Le compilateur permet de transformé du code c++ en fichier binaire/executable.

[Guide pour PATH](https://github.com/DorianBucc/Prog/tree/main?tab=readme-ov-file#PATH)

</br>

1. Téléchargez et installez l'installateur depuis : [download](https://sourceforge.net/projects/mingw/)

2. Une fois installé, il ouvrira une page et vous devrez choisir les packages dont vous avez besoin. Pour confirmer, accédez à l'onglet "Installation" puis cliquez sur "Apply Changes".

3. Ajoutez à la variable PATH : [nomduchemin]\MinGW\bin
> Exemple : C:\MinGW\bin 

4. Essayez la cli pour vérifier que l'installation s'est bien déroulée : `g++ -v`

</br>

## Installation du compilateur c++ (g++) avec MinGW sur Linux

- Télécharger et Installer avec : `sudo apt install g++`

Essayez la cli pour vérifier que l'installation s'est bien déroulée : `g++ -v`

</br>

### Utilisation de g++ Windows
* Pour compiler.
> `g++ -o NomDuFichierExecutable NomDuFichierSource.cpp`
* Pour executer.
> CMD : `Start NomDuFichierExecutable.exe`
> Powershell : `./NomDuFichierExecutable.exe`

### Utilisation de g++ Linux
* Pour compiler.
> `g++ -o NomDuFichierExecutable NomDuFichierSource.cpp`
* Pour executer.
> `./NomDuFichierExecutable`

> (des fois il y a l'extension .out, .exe ou rien)