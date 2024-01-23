#!/bin/bash
w=0
z=0
j=$(echo $2 | cut -d "/" -f1)
m=$(echo $2 | cut -d "/" -f2)
a=$(echo $2 | cut -d "/" -f3)
cd $1/20$a/$m
acc="_access.log"
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
        echo - Nombres de requetes d un adresse ip  : a
        echo - Nombres de requetes par heure des jours du mois: b
        echo - code statut different par utilisateur :  c
        echo - Les IP d un utilisateur : d
        read chois
        w=1
        case $chois in
            a|A) echo Entree valide
            ;;
            b|B) echo Entree valide
            ;;
            c|C) echo Entree valide
            ;;
            d|D) echo Entree valide
            ;;
            *) w=0
            ;;
        esac
    done



    if [ $chois == a ] 
    then
        echo Entrer un adresse IP :
        read IP
        cs=$(cat temps.txt | cut -d " " -f1 | grep $IP | wc -l)    
        echo Il y a $cs requetes de l addresse IP : $IP 
    fi
    if [ $chois == c ]  
    then
        echo Entrer un nom :
        read nom
        cs=$(cat temps.txt | tr -s " " | grep $nom | cut -d " " -f8 | sort | uniq | wc -l)
        es=$(cat temps.txt | tr -s " " | grep $nom | cut -d " " -f8 | sort | uniq | head -n 1)
        if [ "$es" == "" ]
        then
        cs=`expr $cs - 1`
        fi 
        echo il y a $cs code statut different pour $nom
    fi
    if [ $chois == d ]  
    then
        echo Entrer un nom :
        read nom
        echo L utilisateur : $nom possèdes les addresses IP suivante :
        cat temps.txt | tr -s " " | grep $nom | cut -d " " -f1 |sort | uniq 
    fi
    if [ $chois == b ]
    then
        echo Entrer une heure :
        read h
        cs=$(cat temps.txt | cut -d ":" -f2 | grep $h | wc -l)
        echo Il y a eu $cs requètes durant les heures de $h pendant le mois
    fi
else
    echo il y a pas de fichier access correspondant au paramètre
fi 
rm temps.txt