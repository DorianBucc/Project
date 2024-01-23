#include <stdio.h>
#include <string.h>
#include <stdlib.h>

///////////////////////////////////////////////////////// fonction pour l'affichage des tableaux sur linux


void aff(int tab[8][8],int nl,int nc)
{
    printf("\e[1;1H\e[2J");
    printf("  ");
    for (int i = 1; i < nc+1; i++)
        {
            printf("   %d",i);
        }
    printf("\n");
    for (int j = 0; j < nl; j++)
    {   
        printf("   ");
        if (j > 0)
        {
            printf("╠");
            for (int i = 1;i < nc;i++)
            {
                printf("═══");
                printf("╬");
            }
            printf("═══");
            printf("╣");
            printf("\n");
        }
        else
        {
            printf("╔");
            for (int i = 1;i < nc;i++)
            {
                printf("═══");
                printf("╦");
            }
            printf("═══");
            printf("╗");
            printf("\n");
        }
        printf(" %d ",j+1);
        printf("║");
        for (int i = 0; i < nc; i++)
        {
            if (tab[j][i] == 0){
                printf("   ");
            }
            else if(tab[j][i] > 0){
                printf("\e[0;34m%2d \e[0m",tab[j][i]);
            }
            else if(tab[j][i] < 0){
                printf("\e[0;31m%2d \e[0m",tab[j][i]*-1);
            }
            printf("║");
        }
        printf("\n");
        
    }
    printf("   ");
    printf("╚");
    for (int i = 1;i < nc;i++)
    {
        printf("═══");
        printf("╩");
    }
    printf("═══");
    printf("╝");
    printf("\n");    
}
void affres(int tab[100][2],char j1[20],char j2[20]){
    printf("\e[1;1H\e[2J");
    printf("  ");
    printf("\n");
    for (int j = 0; j < 100; j++)
    {   
        printf("   ");
        if (j > 0)
        {
            printf("╠");
            for (int i = 1;i < 2;i++)
            {
                printf("═══════");
                printf("╬");
            }
            printf("═══════");
            printf("╣");
            printf("\n");
        }
        else
        {
            printf("╔");
            for (int i = 1;i < 2;i++)
            {
                printf("═══════");
                printf("╦");
            }
            printf("═══════");
            printf("╗");
            printf("\n");
        }
        printf("   ");
        printf("║");
        
        if(tab[j][0] == 1 && tab[j][1] == 0){
            printf("\e[0;34m Gagné \e[0m║\e[0;31m Perdu \e[0m");
        }
        else if(tab[j][0] == 0 && tab[j][1] == 1 ){
            printf("\e[0;31m Perdu \e[0m║\e[0;34m Gagné \e[0m");
        }
        else if (tab[j][0] == 2 && tab[j][1] == 2){
            printf("\e[0;31mégalité\e[0m║\e[0;34mégalité\e[0m");
        }
        else{
            printf("       ║       ");
        }
        printf("║");
        printf("\n");
        if (tab[j][0] == 0 && tab[j][1] == 0)
        {
            break;
        }
        
        
    }
    printf("   ");
    printf("╚");
    for (int i = 1;i < 2;i++)
    {
        printf("═══════");
        printf("╩");
    }
    printf("═══════");
    printf("╝");
    printf("\n");
    int pj1 = 0,pj2 = 0;
    for (int j = 0; j <= 99; j++)
    {
        for (int i = 0; i < 2; i++)
        {
            if (tab[j][i] != 2)
            {
                if (i == 0 && tab[j][i] == 1)
                {
                    pj1 = pj1 + 1;
                }
                else if (i == 1 && tab[j][i] == 1)
                {
                    pj2 = pj2 + 1;
                }
                
            }
            if (tab[j][0] == 0 && tab[j][1] == 0)
            {
                break;
            }
            

        }
        
    }
    printf("%s à gagné %d fois et %s à gagné %d fois\n\n",j1,pj1,j2,pj2);
}
void affscr(int tab[100][2],char j1[20],char j2[20]){
    printf("  ");
    printf("\n");
    for (int j = 0; j < 100; j++)
    {   
        printf("   ");
        if (j > 0)
        {
            printf("╠");
            for (int i = 1;i < 2;i++)
            {
                printf("═══════");
                printf("╬");
            }
            printf("═══════");
            printf("╣");
            printf("\n");
        }
        else
        {
            printf("╔");
            for (int i = 1;i < 2;i++)
            {
                printf("═══════");
                printf("╦");
            }
            printf("═══════");
            printf("╗");
            printf("\n");
        }
        printf("   ");
        printf("║");
        
        if(tab[j][0] != 0 || tab[j][1] != 0){
            printf("\e[0;34m  %2d   \e[0m║\e[0;31m  %2d   \e[0m",tab[j][0],tab[j][1]*(-1));
        }

        else{
            printf("       ║       ");
        }
        printf("║");
        printf("\n");
        if (tab[j][0] == 0 && tab[j][1] == 0)
        {
            break;
        }
        
        
    }
    printf("   ");
    printf("╚");
    for (int i = 1;i < 2;i++)
    {
        printf("═══════");
        printf("╩");
    }
    printf("═══════");
    printf("╝");
    printf("\n");
    int pj1 = 0,pj2 = 0;
    for (int j = 0; j <= 99; j++)
    {
    
        if(tab[j][0] != 0 || tab[j][1] != 0)
        {
            pj1 = pj1 + tab[j][0];
            pj2 = pj2 + tab[j][1];    
        }
        else if(tab[j][0] == 0 && tab[j][1] == 0)
        {
            break;
        }  
    }
    printf("%s à %d points et %s à %d point\n\n",j1,pj1,j2,pj2*(-1));
}

void aff2(int tab[8][8],int nl,int nc)
{
    printf("  ");
    for (int i = 1; i < nc+1; i++)
        {
            printf("   %d",i);
        }
    printf("\n");
    for (int j = 0; j < nl; j++)
    {   
        printf("   ");
        if (j > 0)
        {
            printf("%c",204);
            for (int i = 1;i < nc;i++)
            {
                printf("%c%c%c",205,205,205);
                printf("%c",206);
            }
            printf("%c%c%c",205,205,205);
            printf("%c",185);
            printf("\n");
        }
        else
        {
            printf("%c",201);
            for (int i = 1;i < nc;i++)
            {
                printf("%c%c%c",205,205,205);
                printf("%c",203);
            }
            printf("%c%c%c",205,205,205);
            printf("%c",187);
            printf("\n");
        }
        printf(" %d ",j+1);
        printf("%c",186);
        for (int i = 0; i < nc; i++)
        {
            if (tab[j][i] == 0){
                printf("   ");
            }
            else if(tab[j][i] > 0){
                printf("\e[0;34m%2d \e[0m",tab[j][i]);
            }
            else if(tab[j][i] < 0){
                printf("\e[0;31m%2d \e[0m",tab[j][i]*-1);
            }
            printf("%c",186);
        }
        printf("\n");
        
    }
    printf("   ");
    printf("%c",200);
    for (int i = 1;i < nc;i++)
    {
        printf("%c%c%c",205,205,205);
        printf("%c",202);
    }
    printf("%c%c%c",205,205,205);
    printf("%c",188);
    printf("\n");    
}
void affres2(int tab[100][2],char j1[20],char j2[20]){
    printf("  ");
    printf("\n");
    for (int j = 0; j < 100; j++)
    {   
        printf("   ");
        if (j > 0)
        {
            printf("%c",204);
            for (int i = 1;i < 2;i++)
            {
                printf("%c%c%c%c%c%c%c",205,205,205,205,205,205,205);
                printf("%c",206);
            }
            printf("%c%c%c%c%c%c%c",205,205,205,205,205,205,205);
            printf("%c",185);
            printf("\n");
        }
        else
        {
            printf("%c",201);
            for (int i = 1;i < 2;i++)
            {
                printf("%c%c%c%c%c%c%c",205,205,205,205,205,205,205);
                printf("%c",203);
            }
            printf("%c%c%c%c%c%c%c",205,205,205,205,205,205,205);
            printf("%c",187);
            printf("\n");
        }
        printf("   ");
        printf("%c",186);
        
        if(tab[j][0] == 1 && tab[j][1] == 0){
            printf("\e[0;34m Gagn%c \e[0m%c\e[0;31m Perdu \e[0m",130,186);
        }
        else if(tab[j][0] == 0 && tab[j][1] == 1 ){
            printf("\e[0;31m Perdu \e[0m%c\e[0;34m Gagn%c \e[0m",186,130);
        }
        else if (tab[j][0] == 2 && tab[j][1] == 2){
            printf("\e[0;31m%cgalit%c\e[0m%c\e[0;34m%cgalit%c\e[0m",130,130,186,130,130);
        }
        else{
            printf("       %c       ",186);
        }
        printf("%c",186);
        printf("\n");
        if (tab[j][0] == 0 && tab[j][1] == 0)
        {
            break;
        }
        
        
    }
    printf("   ");
    printf("%c",200);
    for (int i = 1;i < 2;i++)
    {
        printf("%c%c%c%c%c%c%c",205,205,205,205,205,205,205);
        printf("%c",202);
    }
    printf("%c%c%c%c%c%c%c",205,205,205,205,205,205,205);
    printf("%c",188);
    printf("\n");
    int pj1 = 0,pj2 = 0;
    for (int j = 0; j <= 99; j++)
    {
        for (int i = 0; i < 2; i++)
        {
            if (tab[j][i] != 2)
            {
                if (i == 0 && tab[j][i] == 1)
                {
                    pj1 = pj1 + 1;
                }
                else if (i == 1 && tab[j][i] == 1)
                {
                    pj2 = pj2 + 1;
                }
                
            }
            if (tab[j][0] == 0 && tab[j][1] == 0)
            {
                break;
            }
            

        }
        
    }
    printf("%s %c gagn%c %d fois et %s %c gagn%c %d fois\n\n",j1,133,130,pj1,j2,133,130,pj2);
}  
void affscr2(int tab[100][2],char j1[20],char j2[20]){
    printf("  ");
    printf("\n");
    for (int j = 0; j < 100; j++)
    {   
        printf("   ");
        if (j > 0)
        {
            printf("%c",204);
            for (int i = 1;i < 2;i++)
            {
                printf("%c%c%c%c%c%c%c",205,205,205,205,205,205,205);
                printf("%c",206);
            }
            printf("%c%c%c%c%c%c%c",205,205,205,205,205,205,205);
            printf("%c",185);
            printf("\n");
        }
        else
        {
            printf("%c",201);
            for (int i = 1;i < 2;i++)
            {
                printf("%c%c%c%c%c%c%c",205,205,205,205,205,205,205);
                printf("%c",203);
            }
            printf("%c%c%c%c%c%c%c",205,205,205,205,205,205,205);
            printf("%c",187);
            printf("\n");
        }
        printf("   ");
        printf("%c",186);
        
        if(tab[j][0] != 0 || tab[j][1] != 0){
            printf("\e[0;34m  %2d   \e[0m%c\e[0;31m  %2d   \e[0m",tab[j][0],186,tab[j][1]*(-1));
        }
        else{
            printf("       %c       ",186);
        }
        printf("%c",186);
        printf("\n");
        if (tab[j][0] == 0 && tab[j][1] == 0)
        {
            break;
        }
        
        
    }
    printf("   ");
    printf("%c",200);
    for (int i = 1;i < 2;i++)
    {
        printf("%c%c%c%c%c%c%c",205,205,205,205,205,205,205);
        printf("%c",202);
    }
    printf("%c%c%c%c%c%c%c",205,205,205,205,205,205,205);
    printf("%c",188);
    printf("\n");
    int pj1 = 0,pj2 = 0;
    for (int j = 0; j <= 99; j++)
    {
    
        if(tab[j][0] != 0 || tab[j][1] != 0)
        {
            pj1 = pj1 + tab[j][0];
            pj2 = pj2 + tab[j][1];    
        }
        else if(tab[j][0] == 0 && tab[j][1] == 0)
        {
            break;
        }  
    }
    printf("%s %c %d points et %s %c %d points\n\n",j1,133,pj1,j2,133,pj2*(-1));
} 

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
        printf("Essayez de saisir un nombre valide :\n");
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
        l=l-1;
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
    else if (c==0)
    {
        res = tab[l][c]+tab[l][c+1];
        l=l+1;
        res = res +tab[l][c]+tab[l][c+1];
        l=l-2;
        res = res +tab[l][c]+tab[l][c+1];
        l=l+1;
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
        if(tab[l-1][c] > 0)
        {
            tabpoint[*p][0] += tab[l-1][c];
        }
        else{tabpoint[*p][1] += tab[l-1][c];}
        if(tab[l+1][c+1] > 0)
        {
            tabpoint[*p][0] += tab[l-1][c+1];
        }
        else{tabpoint[*p][1] += tab[l-1][c+1];}
    }
    else if (l==0)
    {
        res = tab[l][c-1]+tab[l][c]+tab[l][c+1];
        l=l+1;
        res = res +tab[l][c-1]+tab[l][c]+tab[l][c+1];
        l=l-1;
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
        l=l+1;
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
                    printf("\nR%cessayez\n",130);
                    *l=0;
                }
            }
            else{printf("\nR%cessayez\n",130);*c=0;
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
                    printf("\nRéessayez\n");
                    *l=0;
                }
            }
            else{printf("\nRéessayez\n");*c=0;
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
                printf("\nRéessayez\n");
            }
            else{
                printf("\nR%cessayez\n",130);
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
    printf("Voulez vous rejouer (O/n) ou afficher le tableau (T)\n");
    scanf("%s",val);
    if (val[0] == 'O')
    {
        *valv = 1; 
    }
    else if (val[0] == 'T'){*valv = 2;}
    else
    {
        *valv = 0;
        printf("\nMerci d'avoir joué\n\n");
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
    printf("Vous aurez %d jetons\n\n",*nbj);
    printf("%s\n",j2);
    printf("Vous aurez %d jetons\n\n",*nbj);                      
}

/////////////////////////////////////////////////////////////////////////////////////////// Partie main

int main() {  // fonction principale
    
    int nc;             //nombre colone   
    int nl;             //nombre ligne
    int nbj;            //nombre jeton
    int valt = 0;       // booléen
    int valv;           // variable possédant 3 état : 0, 1 et 2
    int p = 0;
    char j1[20],j2[20];     //tableau de caractère des noms des joueurs
    char ent[2];                //caractére pemettant de connaittre le souhait des joueurs
    int npart=1;                //numéro de la partie

    int tab[8][8];              //tableau de jeu
    int tabres[100][2];         //tableau des résultat
    int tabpoint[100][2];       //tableau de score

    config(ent,&valt,&nc,&nl,&nbj,j1,j2);               // début des fonction permettant la config du jeu
    init(tab,nl,nc);
    initres(tabres);
    initres(tabpoint);                                           // fin des fonction permettant la config du jeu
    do                                                          // début des fonction permettant le déroulement du jeu
    {
        if(ent[0] == 'L'){
            aff(tab,nl,nc);
        }
        else{
            aff2(tab,nl,nc);
        }
        jeux(tab,nbj,nl,nc,j1,j2,ent,npart);
        result(tab,tabres,tabpoint,nl,nc,&p,ent,j1,j2);
        newpart(&valv);
        while (valv == 2)
        {
            if (ent[0] == 'L')
            {
                affres(tabres,j1,j2);
                affscr(tabpoint,j1,j2);
            }
            else
            {
                affres2(tabres,j1,j2);
                affscr2(tabpoint,j1,j2);
            }
            newpart(&valv);
        }
        npart++;
        init(tab,nl,nc);
    }while (valv == 1 || valv == 2);                               // fin des fonction permettant le déroulement du jeu
}
