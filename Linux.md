# Linux

## Sommaire :

</br>

- [Guide PATH](#path)
- [Connexion SSH](#ssh)
- [Apache2](#apache2)
- [phpMyAdmin](#phpmyadmin)
- [Connexion en bureau à distance](#rtd)
- [Connecter un disque ou une clé](#mount)

</br>

---

## <a name="path">Guide ajout d'une PATH</a>

Src :

</br>

1. À venir / Coming soon

</br>

---

## Installation utile simple

Git : `sudo apt install git`
UFW : `sudo apt install ufw`

## Command utile

sudo apt intall : L'inverse est : sudo apt purge

Pour ajouter un utilisateur : `sudo adduser` *identifiant*

## <a name="ssh">Comment installer une connexion SSH</a>

Src : [lien1](https://ubuntu.com/server/docs/service-openssh), [lien2](https://askubuntu.com/questions/1479500/how-to-change-the-ssh-port-on-ubuntu-23-04)

</br>

1. Installer SSH
> `sudo apt install openssh-server`

</br>

#### Changer le port (pas obligatoire)
1. Modifier le port du ssh
> `sudo vim /lib/systemd/system/ssh.socket`  
2. Modifier la ligne suivante
> `ListenStream=leportàmodifier`
3. Ensuite modifier aussi le fichier `/etc/ssh/sshd_config` chercher `#Port 22`
> `sudo nano /etc/ssh/sshd_config`

> `#Port your_port_number`

4. Ensuite redemarrer les services
> `sudo systemctl daemon-reload`

> `sudo systemctl restart ssh`

5. Ouvré le nouveau port (installer si c'est pas déja fait)
> `ufw allow nouveauportssh/tcp`
> `ufw enable`

</br>

### Pour se connecte en SSH

1. Aller dans un terminal est pour vous connecté faite : `ssh nomutilisateur@adresseipdelamachine -p portssh`
> pour une connexion en local
2. Entré le mot de passe est vous serez connecter

## <a name="rtd">Pour se connecte en bureau à distance</a>

Src : [lien](https://kachou92.over-blog.com/2022/10/comment-installer-le-serveur-xrdp-sur-ubuntu-20.04.html)
cli basic : `sudo apt update`

</br>

1. Il faudra installer un environnement de bureau:
    > Soit Gnome : `sudo apt install ubuntu-desktop`
    
    > ou Xfce (plus léger) : `sudo apt install xubuntu-desktop`
2. Puis installer xrdp
> `sudo apt install xrdp`
3. Activer le démarrage automatique de xrdp
> `sudo systemctl enable xrdp`
4. Puis verifier si ça à fonctionner
> `sudo systemctl status xrdp`

</br>


## <a name="apache2">Comment install un serveur web (apache2) ?</a>

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

Installer php pour traiter les fichier .php sur votre serveur
> `sudo apt install php`

### <a name="phpmyadmin">Ajouter phpmyadmin à apache2</a>

Src : [lien1](https://doc.ubuntu-fr.org/phpmyadmin)

</br>

1. Télécharger et installer maradb-server et mysql par la même occasion
> `sudo apt install mariadb-server`
2. Puis lancer mysql
> `service mysql start`

3. Télécharger et installer phpmyadmin
> `sudo apt install phpmyadmin`

> [!WARNING]
> N'oublier pas de cocher apache2 dans le choix du serveur web (il faut une * entre les crochés)
> * En cas d'une erreur vous pouvez reconfigurer avec : `sudo dpkg-reconfigure phpmyadmin`

</br>

4. Changer seulement le mot de passe de MySQL/MariaDB
> `sudo mysql_secure_installation`

* Vous pouvez remettre le même, c'est juste pour reconfigurer sinon vous arriverez pas à vous connecter en root sur phpMyAdmin.


</br>

---


## <a name="mount">Comment connecter un disque ou une clé sur linux manuellement ?</a>

Src : [lien1](https://www.cyrilaudras.fr/index.php/informatique/configuration-reseau-et-systeme/111-gerer-une-cle-usb-sous-linux-en-ligne-de-commandes)

### Intro

Le repertoire `/mnt` est la zone pour monter les disques interne/permanent et `/media` est la zone pour les disque externe/temporaire/clé USB.

Dans `/dev` il y a des fichiers "sda" qui sont potentiellements votre clé usb ou disque donc si il y en plusieurs, il devrait avoir sda1, sda2 , ...

</br>

1. Commencer par créer un fichier dans mnt/media.
> Exemple : `sudo mkdir /media/usb1`

2. Ensuite vous devez monter votre fichier.
> avec l'exemple précédent sa donnerais : `sudo mount /dev/sda1 /media/usb1 `
3. Maintenant vous avez accès a votre clé/disque.
> pour rentré dans le repertoire : `cd /media/usb1`

</br>

### Pour déconnecter le disque manuellement

1. Pour démonter le disque de l'appareil utiliser en sudo `umount` avec comme parametre le repertoire du disque.
> Toujours avec l'exemple précédent : `sudo umount /media/usb1` 

</br>

---