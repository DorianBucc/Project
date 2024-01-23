#!/bin/bash

z=0
cd $1
if [ 2 -lt $(cat access.log | cut -d '[' -f2 | cut -d ':' -f1 | sort | uniq | wc -l) ] 
then
	echo "probleme access.log : plusieurs dates" 
fi

if [ -e access.log ]
then

	year=$(cat access.log | cut -d '[' -f2 | cut -d ':' -f1 | cut -d / -f3 | sort | uniq)
	if [ -d $year ]
	then
		echo "Le dossier existe"
	else
		mkdir $year
		echo "Le dossier a ete creer"
	fi
	

	moy=$(cat access.log | cut -d '[' -f2 | cut -d ':' -f1 | cut -d / -f2 | sort | uniq)
	case $moy in

	Jan)
		mois=01
		;;
	Feb)
		mois=02
		;;
	Mar)
		mois=03
		;;
	Apr)
		mois=04
		;;
	May)
		mois=05
		;;
	Jun)
		mois=06
		;;
	Jul)
		mois=07
		;;
	Aug)
		mois=08
		;;
	Sep)
		mois=09
		;;
	Oct)
		mois=10
		;;
	Nov)
		mois=11
		;;
	Dec)
		mois=12
		;;
	esac	
	cd $year
	if [ -d $mois ]
	then
		echo "Le dossier existe"
	else
		mkdir $mois
		echo "Le dossier a ete creer"
	fi
	cd ..
	day=$(cat access.log | cut -d '[' -f2 | cut -d ':' -f1 | cut -d / -f1 | sort | uniq)
	nom1="_access.log"
	cp access.log $year/$mois/$day$nom1
	rm access.log
	touch access.log
fi

for((k=1;k<50;k++));
do
	for((mo=1;mo<13;mo++));
	do
		for((i=1;i<32;i++));
		do
		    y=$i
			if [ $i -lt 10 ] 
			then
				y=$z$i
    		fi
			
			m=$mo
			if [ $mo -lt 10 ] 
			then
				m=$z$mo
    		fi
			
			if [ -e access_$y$m$k.log ] 
			then

				if [ -d 20$k ] ; then
				echo "Le dossier existe"
				else
					mkdir 20$k
					echo "Le dossier a ete creer"
				fi
				cd 20$k
			
				if [ -d $m ] ; then
				echo "Le dossier existe"
				else
					mkdir $m
					echo "Le dossier a ete creer"
				fi
				cd ..
				nom2="_access.log"
				cp access_$y$m$k.log 20$k/$m/$y$nom2
				rm access_$y$m$k.log
				touch access_$y$m$k.log
			fi
			

		done
	done
done

for((k=1;k<50;k++));
do
	for((mo=1;mo<13;mo++));
	do
		for((i=1;i<32;i++));
		do
		    y=$i
			if [ $i -lt 10 ] 
			then
				y=$z$i
    		fi
			
			m=$mo
			if [ $mo -lt 10 ] 
			then
				m=$z$mo
    		fi
			
			if [ -e error_$y$m$k.log ] 
			then

				if [ -d 20$k ] ; then
				echo "Le dossier existe"
				else
					mkdir 20$k
					echo "Le dossier a ete creer"
				fi
				cd 20$k
			
				if [ -d $m ] ; then
				echo "Le dossier existe"
				else
					mkdir $m
					echo "Le dossier a ete creer"
				fi
				cd ..
				nom3="_error.log"
				cp error_$y$m$k.log 20$k/$m/$y$nom3
				rm error_$y$m$k.log
				touch error_$y$m$k.log
			fi
		done
	done
done