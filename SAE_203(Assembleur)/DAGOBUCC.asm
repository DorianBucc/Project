;-----------------------------------------------------------------------
; 	ecrire un message a l'ecran
;-----------------------------------------------------------------------
			TITLE			DISPLAY - programme prototype
			.286

.model small
;-----------------------------------------------------------------------		
SSEG 		SEGMENT		STACK
			DB			32 DUP("STACK---")
SSEG 		ENDS
;-----------------------------------------------------------DATA segment
DSEG 		SEGMENT
;**************zone de variables

    hour1  db  ?   ; minute actuelle
    hour2  db  ?   ; minute actuelle
    
    minute1  db  ?   ; minute actuelle
    minute2  db  ?   ; minute actuelle
    
   
    second1  db  ?   ; minute actuelle
    second2  db  ?   ; minute actuelle
    
    diviseur  db 10
    colon  db  58 ; caractère de séparation pour l'affichage
    
    barreverti db 0B3H
    coinsupgauche db 0DAH
    barrehori db 0C4H
    coinsupdroit db 0BFH
    coininfgauche db 0C0H
    coininfdroit db 0D9H
    
    message2 db " - Lecture/Pause (Entree)$", 0DH, 0AH
    message4 db " - Quitter (Echap)$", 0DH, 0AH

DSEG 		ENDS
;-----------------------------------------------------------------------
CSEG		SEGMENT  'Code'
			ASSUME CS:CSEG, DS:DSEG, ES:SSEG
MAIN	PROC FAR
; registre
		MOV	AX, DSEG
		MOV DS, AX
		
; permet de choisir le registre vidéo (VGA, etc...)---------
		MOV AH, 0
		MOV AL, 0DH
		INT 10H
;-----------------------------------------------------------
		
; boucle infinie pour afficher l'heure en continu
init:

		MOV AH, 0BH
		MOV BH, 0
		MOV BL, 5
		INT 10H
			
		MOV AH, 86H
		MOV CX, 6
		INT 15H
		
		MOV AH, 2CH   	; Obtention de L'horaire
		INT 21H       	
		MOV hour1, CH    ; sauvegarder l'heure
		MOV minute1, CL  ; sauvegarder les minutes
		MOV second1, DH  ; sauvegarder les secondes
    
		MOV AH, 00H		; Initialiser
		MOV AL, hour1
		DIV diviseur
	
		MOV hour1, AL
		MOV hour2, AH
		
		MOV AH, 00H		; Initialiser
		MOV AL, minute1
		DIV diviseur
		
		MOV minute1, AL
		MOV minute2, AH
		
		MOV AH, 00H		; Initialiser
		MOV AL, second1
		DIV diviseur
		
		MOV second1, AL
		MOV second2, AH
		
		ADD hour1, 48	; Déplacer sur la bonne colonne de la table ASCII
		ADD hour2, 48	; //
		ADD minute1, 48	; //
		ADD minute2, 48	; //
		ADD second1, 48	; //
		ADD second2, 48	; //

   
;-------------------------Fonction d'affichage--------------------------

		MOV AH, 2H
		MOV DH, 0
		MOV DL, 0
		INT 10H
		
		MOV AH, 2H
		MOV DL, coinsupgauche
		INT 21H
		
		MOV AH, 2H
		MOV DL, barrehori
		INT 21H
		INT 21H
		INT 21H
		INT 21H
		INT 21H
		INT 21H
		INT 21H
		INT 21H

		MOV AH, 2H
		MOV DL, coinsupdroit
		INT 21H
		
		MOV AH, 2H
		MOV DL, 0AH
		INT 21H

		MOV AH, 2H
		MOV DL, barreverti
		INT 21H

		MOV AH, 2H
		MOV DL, hour1
		INT 21H
    
		MOV AH, 2H 
		MOV DL, hour2
		INT 21H
	
		MOV AH, 2H
		MOV DL, colon
		INT 21H
    
		MOV AH, 2H
		MOV DL, minute1
		INT 21H
		
		MOV AH, 2H
		MOV DL, minute2
		INT 21H

		MOV AH, 2H
		MOV DL, colon
		INT 21H
	
		MOV AH, 2H
		MOV DL, second1
		INT 21H
		
		MOV AH, 2H
		MOV DL, second2
		INT 21H
		
		MOV AH, 2H
		MOV DL, barreverti
		INT 21H
    
		MOV AH, 2H
		MOV DL, 00H
		INT 21H
		INT 21H
		INT 21H
		INT 21H
		
		MOV AH, 2H
		MOV DL, 04DH
		INT 21H
		
		MOV AH, 2H
		MOV DL, 065H
		INT 21H
		
		MOV AH, 2H
		MOV DL, 06EH
		INT 21H
		
		MOV AH, 2H
		MOV DL, 075H
		INT 21H
		
		MOV AH, 2H
		MOV DL, colon
		INT 21H
		
		MOV AH, 2H
		MOV DL, 0AH
		INT 21H
		
		MOV AH, 2H
		MOV DL, coininfgauche
		INT 21H
	
		MOV AH, 2H
		MOV DL, barrehori
		INT 21H
		INT 21H
		INT 21H
		INT 21H
		INT 21H
		INT 21H
		INT 21H
		INT 21H
		
		MOV AH, 2H
		MOV DL, coininfdroit
		INT 21H
		
		MOV AH, 2H
		MOV DL, 0AH
		INT 21H
		INT 21H
		
		MOV AH, 9h
		LEA DX, message2
		INT 21H
		
		MOV AH, 2
		MOV DL, 0AH
		INT 21H
		INT 21H
		
		MOV AH, 9h
		LEA DX, message4
		INT 21H
		
		jmp boucle

; Pause : mettre en pause le timer depuis ;00 00 00
; Lecture : commencer le timer à ;00 00 00
; Minuteur Initialement à 00 00 00, si on appuie sur m ça reprend l heure
; actuelle et ça l affiche

;-- INTERRUPTION POUR VIDER LE BUFFER
; INT 21H, 0CH
; INTERRUPTION POUR CLEAR L'ECRAN
; 
	
boucle:

		MOV AH, 2CH   	; Obtention de L'horaire
		INT 21H       	
		MOV hour1, CH    ; sauvegarder l'heure
		MOV minute1, CL  ; sauvegarder les minutes
		MOV second1, DH  ; sauvegarder les secondes
    
		MOV AH, 00H		; Initialiser
		MOV AL, hour1
		DIV diviseur
	
		MOV hour1, AL
		MOV hour2, AH
		
		MOV AH, 00H		; Initialiser
		MOV AL, minute1
		DIV diviseur
		
		MOV minute1, AL
		MOV minute2, AH
		
		MOV AH, 00H		; Initialiser
		MOV AL, second1
		DIV diviseur
		
		MOV second1, AL
		MOV second2, AH
		
		ADD hour1, 48	; Déplacer sur la bonne colonne de la table ASCII
		ADD hour2, 48	; //
		ADD minute1, 48	; //
		ADD minute2, 48	; //
		ADD second1, 48	; //
		ADD second2, 48	; //

		MOV AH, 02H
		MOV DH, 1H
		MOV DL, 1H
		INT 10H
		
		MOV AH, 2H
		MOV DL, hour1
		INT 21H
    
		MOV AH, 2H 
		MOV DL, hour2
		INT 21H
	
		MOV AH, 2H
		MOV DL, colon
		INT 21H
    
		MOV AH, 2H
		MOV DL, minute1
		INT 21H
		
		MOV AH, 2H
		MOV DL, minute2
		INT 21H
		
		MOV AH, 2H
		MOV DL, colon
		INT 21H
	
		MOV AH, 2H
		MOV DL, second1
		INT 21H
		
		MOV AH, 2H
		MOV DL, second2
		INT 21H

		jmp lecture
		
		
; LECTURE CLAVIER PENDANT LE MINUTEUR
lecture:
		MOV AH, 01H
		INT 16H
		JE boucle

		MOV AH, 00H
		INT 16H
		CMP AX, 1C0DH
		JE Pause
		
		CMP AX, 011BH
		JE fin

		jmp boucle
		
		
Pause:
; ------------------------------------

		MOV AH, 86H
		MOV CX, 1
		INT 15H
		
		MOV AH, 01H
		INT 16H
		JE Pause
		
		MOV AH, 00H
		INT 16H
		CMP AX, 1C0DH
		JE boucle
		
		CMP AX, 011BH
		JE fin
		
		jmp pause

;---------------------Fin de programme INT 21-4C
 fin:
		MOV AH, 02H
		MOV DH, 22
		MOV DL, 1
		INT 10H
		
		MOV AH, 4CH
		INT 21H
	
;retour
		RET
;fin de la procedure MAIN*

		MAIN ENDP
;fin du programme
		END MAIN
;fin du code du segment
CSEG	ENDS

;-------------------------------------------------------FIN DE PROGRAMME
