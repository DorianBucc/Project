#include <stdio.h>
#include <string.h>
#include "AFFW.h"
#include "AFFL.h"

/////////////////////////////////////////////////////////   fonction pour l'initialisation des tableaux


void init(int tab[8][8],int nl,int nc)              // Initialisation du tableau de jeu
{
    for (int j = 0; j <= nl; j++)
    {
        for (int i = 0; i <= nc; i++)
        {
        tab[j][i] = 0;
        }
    }
}
void initres(int tab[100][2])                       // Initialisation des tableaux de score et des résultats
{
    for (int j = 0; j <= 100; j++)
    {
        for (int i = 0; i <= 2; i++)
        {
        tab[j][i] = 0;
        }
    }
}
void intval(int *nc, int *nl, int *val)             // Initialisation des dimension du tableau de jeu
{
    printf("Saisir le nombre de colonne du plateau\n");
    scanf("%i",&*nc);
    printf("Saisir le nombre de ligne du plateau\n");
    scanf("%i",&*nl);
    if (((*nc**nl)% 2 == 1) && (*nc >= 3) && (*nc <= 7) && (*nl >= 3) && (*nl <= 7))
    {
        *val = 1;
    }
}
void tlval(int *val,int *nc,int *nl,int *nbj)      // vérification des entrée pour les dimension du tableau
{
    intval(&*nc,&*nl,&*val);
    while(*val == 0){
        printf("Essayer de saisir un nombre valide :\n");
        intval(&*nc,&*nl,&*val);
    }
    *nbj = ((*nc**nl)/2);
}


/////////////////////////////////////////////////////////   fonction pour calculer le resultat et déterminer le gagnant et remplir le tableaux des résultat et du score


void result(int tab[8][8],int tabres[100][2],int tabpoint[100][2],int nl,int nc,int *p,char ent[2],char j1[20], char j2[20]) // Calcule les points et donne le résultat du jeu
{
    int l;
    int c;
    for (int j = 0; j < nl; j++)
    {
        for (int i = 0; i < nc; i++)
        {
            if (tab[j][i] == 0)
            {
                l=j;
                c=i;
                break;
            }
            
        }
        
    }   
    int res; 
    if (l==0 && c==0)
    {
        res = tab[l][c]+tab[l][c+1];
        l=l+1;
        res = res +tab[l][c]+tab[l][c+1];
    }
    else if (c==0)
    {
        res = tab[l][c]+tab[l][c+1];
        l=l+1;
        res = res +tab[l][c]+tab[l][c+1];
        l=l-2;
        res = res +tab[l][c]+tab[l][c+1];
        
        if(tab[l][c] > 0)
        {
            tabpoint[*p][0] += tab[l][c];
        }
        else{tabpoint[*p][1] += tab[l][c];}
        if(tab[l][c+1] > 0)
        {
            tabpoint[*p][0] += tab[l][c+1];
        }
        else{tabpoint[*p][1] += tab[l][c+1];}
        if(tab[l+1][c] > 0)
        {
            tabpoint[*p][0] += tab[l+1][c];
        }
        else{tabpoint[*p][1] += tab[l+1][c];}
        if(tab[l+1][c+1] > 0)
        {
            tabpoint[*p][0] += tab[l+1][c+1];
        }
        else{tabpoint[*p][1] += tab[l+1][c+1];}
    }
    else if (l==0)
    {
        res = tab[l][c-1]+tab[l][c]+tab[l][c+1];
        l=l+1;
        res = res +tab[l][c-1]+tab[l][c]+tab[l][c+1];
        if(tab[l][c] > 0)
        {
            tabpoint[*p][0] += tab[l][c];
        }
        else{tabpoint[*p][1] += tab[l][c];}
        if(tab[l][c-1] > 0)
        {
            tabpoint[*p][0] += tab[l][c-1];
        }
        else{tabpoint[*p][1] += tab[l][c-1];}
        if(tab[l][c+1] > 0)
        {
            tabpoint[*p][0] += tab[l][c+1];
        }
        else{tabpoint[*p][1] += tab[l][c+1];}
        if(tab[l+1][c] > 0)
        {
            tabpoint[*p][0] += tab[l+1][c];
        }
        else{tabpoint[*p][1] += tab[l+1][c];}
        if(tab[l+1][c-1] > 0)
        {
            tabpoint[*p][0] += tab[l+1][c-1];
        }
        else{tabpoint[*p][1] += tab[l+1][c-1];}
        if(tab[l+1][c+1] > 0)
        {
            tabpoint[*p][0] += tab[l+1][c+1];
        }
        else{tabpoint[*p][1] += tab[l+1][c+1];}
    }
    else
    {
        res = tab[l][c-1]+tab[l][c]+tab[l][c+1];
        l=l+1;
        res = res +tab[l][c-1]+tab[l][c]+tab[l][c+1];
        l=l-2;
        res = res +tab[l][c-1]+tab[l][c]+tab[l][c+1];
        if(tab[l][c] > 0)
        {
            tabpoint[*p][0] += tab[l][c];
        }
        else{tabpoint[*p][1] += tab[l][c];}
        if(tab[l][c-1] > 0)
        {
            tabpoint[*p][0] += tab[l][c-1];
            }
        else{tabpoint[*p][1] += tab[l][c-1];}
        if(tab[l][c+1] > 0)
        {
            tabpoint[*p][0] += tab[l][c+1];
        }
        else{tabpoint[*p][1] += tab[l][c+1];}
        if(tab[l-1][c] > 0)
        {
            tabpoint[*p][0] += tab[l-1][c];
        }
        else{tabpoint[*p][1] += tab[l-1][c];}
        if(tab[l-1][c-1] > 0)
        {
            tabpoint[*p][0] += tab[l-1][c-1];
        }
        else{tabpoint[*p][1] += tab[l-1][c-1];}
        if(tab[l-1][c+1] > 0)
        {
            tabpoint[*p][0] += tab[l-1][c+1];
        }
        else{tabpoint[*p][1] += tab[l-1][c+1];}
        if(tab[l+1][c] > 0)
        {
            tabpoint[*p][0] += tab[l+1][c];
        }
        else{tabpoint[*p][1] += tab[l+1][c];}
        if(tab[l+1][c-1] > 0)
        {
            tabpoint[*p][0] += tab[l+1][c-1];
        }
        else{tabpoint[*p][1] += tab[l+1][c-1];}
        if(tab[l+1][c+1] > 0)
        {
            tabpoint[*p][0] += tab[l+1][c+1];
        }
        else{tabpoint[*p][1] += tab[l+1][c+1];}
    }
    
    if (ent[0] == 'L')
    {
        if (res > 0)
        {
            printf("%s à gagné\n",j2);
            tabres[*p][1] = 1;
            tabres[*p][0] = 0;
        }
        else if (res < 0)
        {
            printf("%s à gagné\n",j1);
            tabres[*p][1] = 0;
            tabres[*p][0] = 1;
        }
        else
        {
            printf("égalité\n");
            tabres[*p][1] = 2;
            tabres[*p][0] = 2;
        }
    }
    else{
        if (res > 0)
        {
            printf("%s %c gagn%c\n",j2,133,130);
            tabres[*p][1] = 1;
            tabres[*p][0] = 0;
        }
        else if (res < 0)
        {
            printf("%s %c gagn%c\n",j1,133,130);
            tabres[*p][1] = 0;
            tabres[*p][0] = 1;
        }
        else
        {
            printf("%cgalit%c\n",130,130);
            tabres[*p][1] = 2;
            tabres[*p][0] = 2;
        }
    }
    
    *p = *p + 1;
}


///////////////////////////////////////////////////////// fonction permettent de jouer 


void joueur(char j1[20],char j2[20]){                                   // fonction demandant les noms des joueurs
    printf("Saisir le nom du joueur 1\n");
    scanf("%s",j1);
    printf("Saisir le nom du joueur 2\n");
    scanf("%s",j2);
}
void demande(int tab[8][8],int *c,int *l,int nl,int nc,char ent[2]){     // fonction demandant et vérifiant les coordonnées
    if (ent[0] == 'W')
    {
        do
        {
            printf("Veuillez saisir la colonne\n");
            scanf("%d",&*c);
            if (*c <= nl && *c >= 1)
            {
                printf("Veuillez saisir la ligne\n");
                scanf("%d",&*l);
                if (*l > nl || *l < 1)
                {
                    printf("\nR%cessayer\n",130);
                    *l=0;
                }
            }
            else{printf("\nR%cessayer\n",130);*c=0;
            }            
        }while(*c < 1 || *l < 1 || *c > nc || *l > nl);
    }
    else
    {
        do
        {
            printf("Veuillez saisir la colonne\n");
            scanf("%d",&*c);
            if (*c <= nl && *c >= 1)
            {
                printf("Veuillez saisir la ligne\n");
                scanf("%d",&*l);
                if (*l > nl || *l < 1)
                {
                    printf("\nRéessayer\n");
                    *l=0;
                }
            }
            else{printf("\nRéessayer\n");*c=0;
            }
        }while(*c < 1 || *l < 1 || *c > nc || *l > nl);
    }
    
    *c = *c-1;
    *l = *l-1;
}
void tour(int tab[8][8],int nl,int nc,char j1[20], char ent[2],int *c,int *l)      // fonction qui s'occupe d'un tour d'un joueur
{
    printf("Joueur %s\n",j1);
        do
        {
        demande(tab,&*c,&*l,nl,nc,ent);
        if (tab[*l][*c] != 0 || *c > nc || *l > nl)
        {
            if(ent[0] == 'L'){
                printf("\nRéessayer\n");
            }
            else{
                printf("\nR%cessayer\n",130);
            }
        }
        
        }while (tab[*l][*c] != 0 || *c > nc || *l > nl);
       

}
void jeux(int tab[8][8],int J,int nl,int nc,char j1[20], char j2[20],char ent[2],int npart){      // fonction gérer les tours du jeu et ceux qui va avec 
    int c1,c2;
    int l1,l2;
    int Jc = 1;
    if (npart % 2 == 1)
    {
        while (J >= Jc)
        {
            tour(tab,nl,nc,j1,ent,&c1,&l1);
            tab[l1][c1] = Jc;
            if(ent[0] == 'L'){
                aff(tab,nl,nc);
            }
            else{
                aff2(tab,nl,nc);
            }
            tour(tab,nl,nc,j2,ent,&c2,&l2);
            tab[l2][c2] = -Jc;
            if(ent[0] == 'L'){
                aff(tab,nl,nc);
            }
            else{
                aff2(tab,nl,nc);
            }
            Jc = Jc+1;
        }
    }
    else{
        while (J >= Jc)
        {
            tour(tab,nl,nc,j2,ent,&c2,&l2);
            tab[l2][c2] = -Jc;
            if(ent[0] == 'L'){
                aff(tab,nl,nc);
            }
            else{
                aff2(tab,nl,nc);
            }
            tour(tab,nl,nc,j1,ent,&c1,&l1);
            tab[l1][c1] = Jc;
            if(ent[0] == 'L'){
                aff(tab,nl,nc);
            }
            else{
                aff2(tab,nl,nc);
            }
            Jc = Jc+1;
        }
    }
}
void newpart(int *valv){        // fonction gérant la possibilté de l'affichage du tableaux de score ou le relencement du jeux ou la fin
    char val[2];
    printf("Voulez vous rejouer (O/n) ou aff le tableau (T)\n");
    scanf("%s",val);
    if (val[0] == 'O')
    {
        *valv = 1; 
    }
    else if (val[0] == 'T'){*valv = 2;}
    else
    {
        *valv = 0;
        printf("\nMerci d'avoir jouer\n\n");
    }
    
}


/////////////////////////////////////////////////////////////////////////////////////////// Partie config du jeu

void config(char ent[2],int *valt,int *nc,int *nl,int *nbj,char j1[20],char j2[20])
{
    printf("Systeme OS (W pour Windows/L pour Linux)\n");       
    scanf("%c",ent);
    tlval(&*valt,&*nc,&*nl,&*nbj);
    joueur(j1,j2);
    printf("%s\n",j1);
    printf("Vous aurez %d jeton\n\n",nbj);
    printf("%s\n",j2);
    printf("Vous aurez %d jeton\n\n",nbj);                      
}