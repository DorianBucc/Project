# Bienvenue

</br>

Ce répertoire contient différents projets et programmes que j'ai réalisés dans le domaine de l'informatique pour mes cours ou pour moi-même.

N'hésitez pas à explorer ces projets et programmes et à me faire part de vos commentaires !

## Sommaire :

</br>

- [Guide PATH](#PATH)
- [Suite](#TestLien)

</br>

---

## Hacker Rank

* Link : [Mon compte HackerRank](https://www.hackerrank.com/profile/bucchiottydorian)

</br>

---

## Acronyme

</br>

- NF = Non Fonctionnel

</br>

---

## Guide ajout d'une PATH 

Src :

</br>

### Windows

1. Ouvrer l'onglet de recherche : Win + R
2. Taper dans l'onglet `Sysdm.cpl`
3. Aller dans Paramètres système avancés / Advanced
4. Puis dans Variables d’environnement / Environment Variables
5. Selectionner path est faite modifier / edit
6. Pour finir ajouter ou supprimer les PATHs

</br>

### Linux
1. À venir / Coming soon

</br>

---

## Comment install un serveur web (apache2) Linux ?

Src : [lien1](https://doc.ubuntu-fr.org/apache2)

</br>

1. Commencer par installer Apache2.
> `sudo apt install apache2`
2. Puis lancer le serveur.
> `sudo systemctl start apache2`
3. Pour activer le démarrage automatique (optionelle).
> `sudo systemctl enable apache2`
4. Verifier si il est belle bien lancer.
> `sudo systemctl status apache2`

Repertoire de config Apache2 : `/etc/apache2`

</br>

### Ajouter phpmyadmin à apache2

Src : [lien1](https://doc.ubuntu-fr.org/phpmyadmin)

1. Taper la cli : `sudo apt install phpmyadmin`

</br>

> [!WARNING]
> N'oublier pas de cocher apache2 dans le choix du serveur web (il faut une * entre les crochés)
> * En cas d'une erreur vous pouvez reconfigurer avec : `sudo dpkg-reconfigure phpmyadmin`

</br>

---


## Comment connecter un disque ou une clé sur linux manuellement ?

Src : [lien1](https://www.cyrilaudras.fr/index.php/informatique/configuration-reseau-et-systeme/111-gerer-une-cle-usb-sous-linux-en-ligne-de-commandes)

### Intro

Le repertoire `/mnt` est la zone pour monter les disques interne/permanent et `/media` est la zone pour les disque externe/temporaire/clé USB.

Dans `/dev` il y a des fichiers "sda" qui sont potentiellements votre clé usb ou disque donc si il y en plusieurs, il devrait avoir sda1, sda2 , ...

</br>

1. Commencer par créer un fichier dans mnt/media.
> Exemple : `sudo mkdir /media/usb1`

2. Ensuite vous devez monter votre fichier.
> avec l'exemple précédent sa donnerais : `mount /dev/sda1 /media/usb1 `
3. Maintenant vous avez accès a votre clé/disque.
> pour rentré dans le repertoire : `cd /media/usb1`
</br>

### Pour déconnecter le disque manuellement

1. Pour démonter le disque de l'appareil utiliser en sudo `umount` avec comme parametre le repertoire du disque.
> Toujours avec l'exemple précédent : `sudo umount /media/usb1` 

</br>

---

## Comment faire un MAKEFILE ?

Src : 
