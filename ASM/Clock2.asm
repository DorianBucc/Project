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
    heure db 10, ?, 10 dup ("$")
    diviseur  db 10
    colon  db  58 ; caractère de séparation pour l'affichage

DSEG 		ENDS
;-----------------------------------------------------------------------
			ASSUME CS:CSEG, DS:CSEG, ES:CSEG
CSEG		SEGMENT  'Code'
MAIN	PROC FAR
; registre
		MOV	AX, DSEG
		MOV DS, AX
				
; boucle infinie pour afficher l'heure en continu

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
    
;---------------------------Fin d'affichage-----------------------------
	
	MOV AH, 2
	MOV DL, 0DH
	INT 21H
	
	MOV AH, 86H
    MOV CX, 5
    INT 15H
	
	jmp main

;---------------------Fin de programme INT 21-4C
	MOV AH, 4CH
	INT 21H
			
;fin du programme
		END MAIN
;fin du code du segment
CSEG	ENDS

;-------------------------------------------------------FIN DE PROGRAMME
