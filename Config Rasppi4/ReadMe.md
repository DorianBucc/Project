### Info :
Raspberry pi 4 en 4go ram sur Ubuntu server 22.04.3

### site utile :
- https://pinout.xyz/pinout/pin8_gpio14/

---
## pour installer l'OS
1. télécharger et installer Raspberry imager : https://www.raspberrypi.com/software/
2.  - Une fois lancer vous devez choisir le type de raspberry que vous avez
    - Le deuxieme c'est l'os voulu : Raspberry pi OS, Ubuntu, Kali Linux, etc...
    - Le troisième c'est la carte sd (le mieux c'est entre 16go et 128go)
3. Une fois que vous clique sur suivant il proposera de parametré, je vous conseille au moin de modifié :
    - hostname : nom du pc
    - username et password : nom d'utilisateur et le mot de passe
    - et dans service si vous souhaité le SSH
3. Une fois terminer, inserer la carte sd dans la Raspberry et allumer la en l'alimentant
4. Installer ubuntu en suivant l'intallateur de ubuntu.

Pour se connecte en SSH


### Pour ajouter le bureau à distance à ubuntu server

Src : https://kachou92.over-blog.com/2022/10/comment-installer-le-serveur-xrdp-sur-ubuntu-20.04.html

cli basic : ```sudo apt update```

* Il faudra installer un environnement de bureau:
    - Soit Gnome : ```sudo apt install ubuntu-desktop```
    - ou Xfce (plus léger) : ```sudo apt install xubuntu-desktop```
Ensuite
1. ```sudo apt install xrdp```
2. ```sudo systemctl enable xrdp```
3. ```sudo systemctl status xrdp```

---

## Configuration du reglage fan
cli utile :
- ```vcgencmd measure_temp```    // mesure la température du cpu
- ```watch -n 2 vcgencmd measure_temp``` // mesure la température du cpu par interval (en seconde)

1. ```sudo apt install snapd```
2. ```sudo snap install pi-fancontrol```      // le firmware permettant le controle du ventilateur
3. Pour configurer pi-fancontrol faite : ```sudo nano /boot/firmware/config.txt```
    Puis ajouter ou modifier la(les) ligne(s) : dtoverlay=gpio-fan,gpiopin=14,temp=60000  
    ("gpiopin=" le pin qui controle le ventilateur(pwn) et "temp=" la température "60°C = 60000")
    pour un réglage à 60°C (déclenchement 60°C s'arrête une fois 50°C passé)
4. Puis redémarrer pour appliquer le réglage

---

## Installation et configuration d'un server bedrock"" avec Nukkit
cli de base :
- sudo apt-get update -y && sudo apt-get upgrade -y

1. Pour installer java qui sera utile pour lancer le serveur : ```sudo apt install default-jre```
2. Créer le repertoire : ```mkdir ~/nukkit```
3. Entrée dans le repertoire : ```cd ~/nukkit```
4. Telecharger le fichier nukkit.jar : ```wget -O nukkit.jar https://go.pimylifeup.com/3xsPQA/nukkit```     // command pour télécharger et mettre à jour le serveur
5. Execute le fichier : ```java -jar nukkit.jar```
6. Pour stopper le serveur : ```stop```
* Fichier de config:
    - server.properties
    - nukkit.yml
### Pour lancer le serveur bedrock au démarrage
1. Pour créer un service permettant le lancement du serveur : ```sudo nano /lib/systemd/system/minecraftbedrockserver.service```
* Metter dans ce fichier les lignes ci-dessous :
```
[Unit]
Description=Minecraft Bedrock Server

[Service]
User=pi
Group=pi
Restart=on-abort
WorkingDirectory=/home/pi/nukkit
ExecStart=/usr/bin/java -jar /home/pi/nukkit/nukkit.jar

[Install]
WantedBy=multi-user.target
```

2. Pour activé le service : ```sudo systemctl enable minecraftbedrockserver.service```
3. Pour lancer le service : ```sudo systemctl start minecraftbedrockserver.service```
4. Pour vérifier si cela à fonctionner : ```sudo systemctl status minecraftbedrockserver.service```
Src : https://pimylifeup.com/raspberry-pi-minecraft-pe-server/
