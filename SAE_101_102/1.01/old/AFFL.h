#include <stdio.h>
#include <string.h>

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
            printf("\e[0;34m   %d   \e[0m║\e[0;31m   %d   \e[0m",tab[j][0],tab[j][1]*(-1));
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

