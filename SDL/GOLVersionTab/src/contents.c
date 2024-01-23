#include "lib.h"
#include <stdio.h>

int displayCellules(SDL_Renderer* rendu , SDL_Texture* CelluleTexture, short** tab)
{   
    for (int i = 0; i < yMAX-1; i++)
    {
        for (int y = 0; y < xMAX-1; y++)
        {
            if(tab[i][y] == -2){tab[i][y] = 0;}
            else{
                if(tab[i][y] == -1){tab[i][y] = 1;}
                if(tab[i][y] == 1) display_textureP(rendu, CelluleTexture, y*TCASE+TCASE, i*TCASE+TCASE);
            }
            //if(tab[i][y] == 1)puts("5");
        }
    }
    return 1;
}
void seeCellule(short** tab)
{
    for (int i = 0; i < yMAX-1; i++)
    {
        for (int y = 0; y < xMAX-1; y++)
        {
            int count = 0;
            if(tab[i][y] == 1){
                if(i > 0)
                {
                    if(y > 0)
                        {
                            if(tab[i-1][y-1] == 1|| tab[i-1][y-1] == -2) {count++;}
                            else isBornCellule(tab,y-1,i-1);
                        }
                    if(tab[i-1][y] == 1 || tab[i-1][y] == -2) {count++;}
                    else isBornCellule(tab,y,i-1);
                    if(tab[i-1][y+1] == 1|| tab[i-1][y+1] == -2) {count++;}
                    else isBornCellule(tab,y+1,i-1);
                }
                
                if(y > 0)
                { 
                    if(tab[i][y-1] == 1 || tab[i][y-1] == -2) {count++;}
                    else isBornCellule(tab,y-1,i);
                }
                if(tab[i][y+1] == 1 || tab[i][y+1] == -2) {count++;}
                else isBornCellule(tab,y+1,i);
                if(y > 0)
                { 
                    if(tab[i+1][y-1] == 1 || tab[i+1][y-1] == -2) {count++;}
                    else isBornCellule(tab,y-1,i+1);
                }
                if(tab[i+1][y] == 1 || tab[i+1][y] == -2) {count++;}
                else isBornCellule(tab,y,i+1);
                if(tab[i+1][y+1] == 1 || tab[i+1][y+1] == -2) {count++;}
                else isBornCellule(tab,y+1,i+1);

                if(count > 3 || count < 2){
                    tab[i][y] = -2;
                }
            }
        }
    }
}
void isBornCellule(short** tab,short x, short y)
{   
    int count = 0;
    if((x > 0 && y > 0) && (x < xMAX-2 && y < yMAX-2)){
        if(tab[y][x] == -1){return;}
        if(tab[y-1][x-1] == 1 || tab[y-1][x-1] == -2) {count++;}
        if(tab[y-1][x] == 1 || tab[y-1][x] == -2) {count++;}
        if(tab[y-1][x+1] == 1 || tab[y-1][x+1] == -2) {count++;}
        if(tab[y][x-1] == 1 || tab[y][x-1] == -2) {count++;}
        if(tab[y][x+1] == 1 || tab[y][x+1] == -2) {count++;}
        if(tab[y+1][x-1] == 1 || tab[y+1][x-1] == -2) {count++;}
        if(tab[y+1][x] == 1 || tab[y+1][x] == -2) {count++;}
        if(tab[y+1][x+1] == 1 || tab[y+1][x+1] == -2) {count++;}
    }
    if(count == 3){
        tab[y][x] = -1;
    }
}

void DepartTabCellule(short** TabCellules)
{
    srand( time( NULL ) );
    for (int i = 0; i < yMAX-1; i++)
    {
        for (int y = 0; y < xMAX-1; y++)
        {
            if(rand()%5==0) TabCellules[i][y] = 1 ;
            else TabCellules[i][y] = 0;
        }   
    }
}
    
