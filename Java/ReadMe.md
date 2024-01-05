# Java

## Comment compiler et executer un programme Java (.jar) ? (Windows)

Src :
* https://learn.microsoft.com/fr-fr/sql/language-extensions/how-to/create-a-java-jar-file-from-class-files
* https://baptiste-wicht.developpez.com/tutoriels/java/outils/executables/

1. Compiler les fichier .java avec : ```javac .\package\*.java```

2. Créer MANIFEST.MF à la racine du projet qui contient ("package.classmain" à modifier et rajouter un retour à la ligne à la fin !!) : 
``` 
Manifest-Version: 1.0
Main-Class: package.classmain

```

3. Pour build le JAR : ```jar cvfm .\nomjar.jar .\MANIFEST.MF .\package\*.class```

4. Pour executé le JAR : ```java -jar .\nomjar.jar```