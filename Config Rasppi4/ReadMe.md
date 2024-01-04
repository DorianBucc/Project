### Info :
Raspberry pi 4 en 4go ram sur Ubuntu server 22.04.3

### site utilise :
- https://pinout.xyz/pinout/pin8_gpio14/

---
## pour installer l'OS
1. télécharger et installer Raspberry imager : https://www.raspberrypi.com/software/
2.  - Une fois lancer vous devez choisir le type de raspberry que vous avez
    - Le deuxieme c'est l'os voulu : Raspberry pi OS, Ubuntu, Kali Linux, etc...
    - Le troisième c'est la carte sd (le mieux c'est entre 16go et 128go)
...

---

## Configuration du reglage fan
cli utile :
- vcgencmd measure_temp    // mesure la température du cpu
- watch -n 2 vcgencmd measure_temp // mesure la température du cpu par interval (en seconde)

1. sudo apt install snapd
2. sudo snap install pi-fancontrol      // le firmware permettant le controle du ventilateur
3. Pour configurer pi-fancontrol faite : sudo nano /boot/firmware/config.txt
    Puis ajouter ou modifier la(les) ligne(s) : dtoverlay=gpio-fan,gpiopin=14,temp=60000  
    ("gpiopin=" le pin qui controle le ventilateur(pwn) et "temp=" la température "60°C = 60000")
    pour un réglage à 60°C (déclenchement 60°C s'arrête une fois 50°C passé)
4. Puis redémarrer pour appliquer le réglage

---

## Installation et configuration d'un server bedrock"" avec Nukkit
cli de base :
- sudo apt-get update -y && sudo apt-get upgrade -y

1. mkdir ~/nukkit
2. cd ~/nukkit
3. wget -O nukkit.jar https://go.pimylifeup.com/3xsPQA/nukkit     // command pour télécharger et mettre à jour le serveur
4. java -jar nukkit.jar
Fichier de config:
- server.properties
- nukkit.yml

Src : https://pimylifeup.com/raspberry-pi-minecraft-pe-server/
