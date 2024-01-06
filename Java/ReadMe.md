# Java

## Comment compiler et executer un programme Java (.jar) ? (Windows)

Src : [lien1](https://learn.microsoft.com/fr-fr/sql/language-extensions/how-to/create-a-java-jar-file-from-class-files), [lien2](https://baptiste-wicht.developpez.com/tutoriels/java/outils/executables/)

</br>

1. Compiler les fichier *.java*
> `javac .\package\*.java`

2. Créer *MANIFEST.MF* à la racine du projet qui contient (*package.classmain* à modifier et ). 
``` 
Manifest-Version: 1.0
Main-Class: package.classmain

```

> [!WARNING]
> N'oublier pas le retour à la ligne à la fin sinon ça ne fonctionnera pas.

3. Pour build le JAR.
> `jar cvfm .\nomjar.jar .\MANIFEST.MF .\package\*.class`

4. Pour executé le JAR.
> `java -jar .\nomjar.jar`