### Info :
Raspberry pi 4 en 4go ram sur Ubuntu server 22.04.3

### site utile :
- [Pinout](https://pinout.xyz/pinout/pin8_gpio14/)

---
## pour installer l'OS

</br>

1. télécharger et installer Raspberry imager : [download](https://www.raspberrypi.com/software/)
> Une fois lancer vous devez choisir le type de raspberry que vous avez

> Le deuxieme c'est l'os voulu : Raspberry pi OS, Ubuntu, Kali Linux, etc...

> Le troisième c'est la carte sd (le mieux c'est entre 16go et 128go)
3. Une fois que vous clique sur suivant il proposera de parametré, je vous conseille au moin de modifié :
    > *hostname* : nom du pc

    > *username et password* : nom d'utilisateur et le mot de passe
    
    > et dans *service* si vous souhaité le SSH
3. Une fois terminer, inserer la carte sd dans la Raspberry et allumer la en l'alimentant
4. Installer votre OS en suivant l'intallateur.

* Pour d'autre ajout/configuration sur linux voir mon ReadMe sur [Linux](https://github.com/DorianBucc/Prog/blob/main/Linux.md).

</br>

---

## Configuration du reglage fan

cli utile :
- `vcgencmd measure_temp`    // mesure la température du cpu
- `watch -n 2 vcgencmd measure_temp` // mesure la température du cpu par interval (en seconde)

</br>

1. `sudo apt install snapd`
2. `sudo snap install pi-fancontrol`
> le firmware permettant le controle du ventilateur
3. Pour configurer pi-fancontrol faite : `sudo nano /boot/firmware/config.txt`
> Puis ajouter ou modifier la(les) ligne(s) : `dtoverlay=gpio-fan,gpiopin=14,temp=60000`

> ("gpiopin=" le pin qui controle le ventilateur(pwn) et "temp=" la température "60°C = 60000") pour un réglage à 60°C (déclenchement 60°C s'arrête une fois 50°C passé)
4. Puis redémarrer pour appliquer le réglage

</br>

---

## Installation et configuration d'un server bedrock"" avec Nukkit
Src : [lien](https://pimylifeup.com/raspberry-pi-minecraft-pe-server/)

cli de base : `sudo apt-get update -y && sudo apt-get upgrade -y`

</br>

1. Pour installer java qui sera utile pour lancer le serveur : `sudo apt install default-jre`
2. Créer le repertoire : `mkdir ~/nukkit`
3. Entrée dans le repertoire : `cd ~/nukkit`
4. Telecharger le fichier nukkit.jar : `wget -O nukkit.jar https://go.pimylifeup.com/3xsPQA/nukkit`    // command pour télécharger et mettre à jour le serveur
5. Execute le fichier : `java -jar nukkit.jar`
6. Pour stopper le serveur : `stop`
* Fichier de config:
    - server.properties
    - nukkit.yml

</br>

### Pour lancer le serveur bedrock au démarrage

</br>

1. Pour créer un service permettant le lancement du serveur.
> `sudo nano /lib/systemd/system/minecraftbedrockserver.service`
2. Metter dans ce fichier les lignes ci-dessous (en modifiant nomutilisateur par votre user avec le serveur):
```
[Unit]
Description=Minecraft Bedrock Server

[Service]
User=nomutilisateur
Group=nomutilisateur
Restart=on-abort
WorkingDirectory=/home/nomutilisateur/nukkit
ExecStart=/usr/bin/java -jar /home/nomutilisateur/nukkit/nukkit.jar

[Install]
WantedBy=multi-user.target
```

2. Pour activé le service. 
> `sudo systemctl enable minecraftbedrockserver.service`
3. Pour lancer le service.
> `sudo systemctl start minecraftbedrockserver.service`
4. Pour vérifier si cela à fonctionner.
> `sudo systemctl status minecraftbedrockserver.service`

