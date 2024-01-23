#ifndef LIB_H_
#define LIB_H_
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define VMAX 30
#define VMIN 5

struct T_Case
{
    int l;
    int c;
};

void topcase();                                                                             // Fonction ecrivant les 3 bar ───
void vidbuffer();                                                                           // Fonction permettant de vider le buffer pour empeche les boucle infinie
void parametre(char ps[30], int *li, int *co, int *niv, int *tour);                         // Fonction demandant la taille du tableaux souhaité
void aff(int li, int co, struct T_Case *pion);                                              // Fonction qui gere l'affichage du tableau
int cascase(int l, int c, int li, int co);                                                  // Fonction vérifier si une case est gagnante ou perdante
void move(struct T_Case *pion, int mov, int nb);                                            // Fonction qui permet de déplace le (*pion)
void alea(struct T_Case *pion, int li, int co, int *i, int *j);                             // Fonction pour l'ia aléatoire
void trefle(struct T_Case *pion, int li, int co, int *nb, int *mov);                        // Fonction de l'ia qui tente de gagner 
void demande(struct T_Case *pion, int li, int co, int *nb, int *mov);
void tourIA(struct T_Case *pion, int niv, int li, int co, int *nb, int *mov);               // Fonction pour la gestion du niveaux de l'ia
void end(struct T_Case *pion, int li, int co, int *endgame, int joueur, char *ps);          // Fonction permettant de savoir si il se situe sur le puit
void jeux(struct T_Case *pion, int nbl, int nbc, char *ps, int niv, int tour);              // Fonction déroule du jeux



#endif


 /*   printf("\e[0;31m ... \e[0m\n"); rouge
	  printf("\e[0;32m ... \e[0m\n"); vert
	  printf("\e[0;33m ... \e[0m\n"); jaune
	  printf("\e[0;34m ... \e[0m\n"); bleu
	  printf("\e[0;35m ... \e[0m\n"); violet rose
	  printf("\e[0;36m ... \e[0m\n"); bleu clair
	  printf("\e[0;37m ... \e[0m\n"); blanc       */

      
// Version Linux

// #define V 179
// #define H 196
// #define I 197
// #define LT 218
// #define LB 192
// #define RT 191
// #define RB 217
// #define RI 180
// #define LI 195
// #define TI 194
// #define BI 193
// #define PION 241

// Version Window
/*
#define V '|'
#define H '-'
#define I '+'
#define LT '+'
#define LB '+'
#define RT '+'
#define RB '+'
#define RI '+'
#define LI '+'
#define TI '+'
#define BI '+'
#define PION '?'
*/