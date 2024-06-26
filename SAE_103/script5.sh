#!/bin/bash
w=0
z=0
j=$(echo $2 | cut -d '/' -f1)
m=$(echo $2 | cut -d '/' -f2)
a=$(echo $2 | cut -d '/' -f3)
cd $1/20$a/$m
acc="_error.log"
for((i=0;i<32;i++));
do
	if [ $i -lt 10 ] 
	then
		y=$z$i
    fi
    if [ -e $i$acc ]
    then
    cat $i$acc >> temps.txt
    fi
done
if [ -e temps.txt ]
then
    while [ $w == 0 ] 
    do
        echo Saisissez ce que vous voulez faire : 
        echo - Resumer du mois : j
        echo - Resumer du mois, enregistrer dans un .imp : r
        echo - Le nombre d erreur du mois :  e
        echo - Le nombre de type d erreur : t
        echo - Afficher les erreurs d une addresse ip : i
        echo - Toute les erreurs d un pid : p
        echo - Le afficher les messages d erreur d un type d erreur : m
        read chois
        w=1
        case $chois in
            j|J) echo Entree valide
            ;;
            r|R) echo Entree valide
            ;;
            e|E) echo Entree valide
            ;;
            t|T) echo Entree valide
            ;;
            i|I) echo Entree valide
            ;;
            p|P) echo Entree valide
            ;;
            m|M) echo Entree valide
            ;;
            *) w=0
            ;;
        esac
    done

    if [ $chois == i ] 
    then
        echo Entrer un adresse IP :
        read IP
        echo Les erreurs de l addresse IP $IP sont : 
        cat temps.txt | grep $IP | cut -d " " -f6,12,13,14,15,16,17,18,19,20,21,22,23
    fi
    if [ $chois == e ] 
    then
        cat temps.txt | wc -l
        echo il y a $cs erreur durant le mois
    fi
    if [ $chois == t ] 
    then
        cs=$(cat temps.txt | cut -d " " -f6 | sort | uniq | wc -l)
        echo Il y a $cs de type erreur
    fi
    if [ $chois == p ] 
    then
        echo Entrer un PID :
        read PID
        echo Il y a les types d erreurs suivante correspondant au $PID :
        cat temps.txt | grep $PID | cut -d " " -f6 | sort | uniq
    fi
    if [ $chois == m ]
    then
        echo Entrer une ERREUR :
        read ER
        echo Les messages d erreur de cette erreur $ER sont :
        cat temps.txt | grep $ER | cut -d " " -f12,13,14,15,16,17,18,19,20,21,22,23
    fi
    if [ $chois == j ]
    then
        cat temps.txt | sort
    fi
    if [ $chois == r ]
    then
    resum="_resume_mois"
    copy=$(cat temps.txt | sort)
    cd ..
    cd ..
    cd ..
    if [ -e base/sortie ] 
    then
        cd base/sortie
        (echo $copy) > $m$resum$err.imp
        echo Enregistrement reussi
    else
        mkdir base/sortie
        cd base/sortie
        (echo $copy) > $m$resum$err.imp
        echo Enregistrement reussi
    fi
    cd ..
    cd 20$a/$m
fi
else
    echo il y a pas de fichier error correspondant au parametre
fi
rm temps.txt