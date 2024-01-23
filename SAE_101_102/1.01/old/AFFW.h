#include <stdio.h>
#include <string.h>

/////////////////////////////////////////////////////////    fonction pour l'affichage des tableaux sur Windows


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
            printf("\e[0;34m   %d   \e[0m%c\e[0;31m   %d   \e[0m",tab[j][0],186,tab[j][1]*(-1));
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
