# Windows

## Sommaire :

</br>

- [Guide PATH](#PATH)

</br>

---

## Guide ajout d'une PATH 

Src :

</br>

1. Ouvrer l'onglet de recherche : Win + R
2. Taper dans l'onglet `Sysdm.cpl`
3. Aller dans Paramètres système avancés / Advanced
4. Puis dans Variables d’environnement / Environment Variables
5. Selectionner path est faite modifier / edit
6. Pour finir ajouter ou supprimer les PATHs

</br>

## SSH Key

Src : [Lien1](https://chrisjhart.com/Windows-10-ssh-copy-id/)

0. `ssh-keygen -t rsa -b 4096`
1. `type $env:USERPROFILE\.ssh\id_rsa.pub | ssh username@IP "cat >> .ssh/authorized_keys"`

---