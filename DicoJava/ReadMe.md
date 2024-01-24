## Dico

Le programme consiste à récuperer une liste de mot telle que des noms, dates, chiffres, pseudo, son but est de créer le plus de mot de passe potentielle grâce au donnée fournit.

Le projet ma permit de travailler le Java et en particularité la manipulation des strings.

#### Dico_v1.1
Require(si ce n'est pas fait) :

- intaller java JDK
- puis l'ajouter au variable d'environnement

Pour executer le programme : `java -jar .\Dico.jar`

Dans le fichier data.txt ou celui que vous aurez ciblé le format doit ressemble au suivant :

`votreMot:sonType`

exemple :

`Squeezie:pseudo`

Les type disponible sont les suivants :
nom(il sont tester sous differents formats : nom, Nom, NOM, nOm, etc )
pseudo(ne sont tester que sous leur format)
nombre(il sont tester sous different format : 2, deux, two alors que 1567 n'a qu'un format)
date( 11/22/3333 sous les format suivant : 11/22/3333, 11223333, 1122, 11-22, unundeuxdeux, 11, unun, 3333, 33332211, etc...)

il ne doit pas avoir des lignes vides exemple :

```
Lucas:nom
12:nombre

01/01/2000:date
votreMot:sonType
votreMot:sonType
```

Le résultat des passwords trouver sera dans le le fichier "resultat.txt" ou celui que vous aurez configurez.