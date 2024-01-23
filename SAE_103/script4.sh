#!/bin/bash
w=0
j=$(echo $2 | cut -d '/' -f1)
m=$(echo $2 | cut -d '/' -f2)
a=$(echo $2 | cut -d '/' -f3)
cd $1/20$a/$m
err="_error"
if [ -e $j$err.log ]
then
    while [ $w == 0 ] 
    do
        echo Saisissez ce que vous voulez faire : 
        echo - Resumer de la journee : j
        echo - Resumer de la journee enregistrer dans un .imp : r
        echo - Le nombre d erreur de la journee :  e
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


    echo $chois

if [ $chois == i ] 
then
    echo Entrer un adresse IP :
    read IP
    echo Les erreurs de l addresse IP $IP sont : 
    cat $j$err.log | grep $IP | cut -d " " -f6,12,13,14,15,16,17,18,19,20,21,22,23
fi
if [ $chois == e ] 
then
    cs=$(cat $j$err.log | wc -l)
    echo il y a $cs erreur durant la journee
fi
if [ $chois == t ] 
then
    cs=$(cat $j$err.log | cut -d " " -f6 | sort | uniq | wc -l)
    echo Il y a $cs de type erreur
fi
if [ $chois == p ] 
then
    echo Entrer un PID :
    read PID
    echo Il y a les types d erreurs suivante correspondant au $PID :
    cat $j$err.log | grep $PID | cut -d " " -f6 | sort | uniq
fi
if [ $chois == m ] 
then
    echo Entrer une ERREUR :
    read ER
    echo Les messages d erreur de cette erreur $ER sont :
    cat $j$err.log | grep $ER | cut -d " " -f12,13,14,15,16,17,18,19,20,21,22,23
fi
if [ $chois == j ]
then
    cat $j$err.log | sort
fi
if [ $chois == r ]
then
    resum="_resume"
    copy=$(cat $j$err.log)
    cd ..
    cd ..
    cd ..
    if [ -e base/sortie ] 
    then
        cd base/sortie
        (echo $copy | sort) > $j$resum$err.imp
        echo Enregistrement reussi
    else
        mkdir base/sortie
        cd base/sortie
        (echo $copy | sort) > $j$resum$err.imp
        echo Enregistrement reussi
    fi

fi
else
    echo il y a pas de fichier error correspondant au parametre
fi