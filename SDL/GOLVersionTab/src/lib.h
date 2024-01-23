#ifndef LIB_H_
#define LIB_H_

//#include <SDL2/SDL_ttf.h>		//Inclusion des librairies
#include <SDL2/SDL_image.h>
#include <SDL2/SDL.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define DELAYFRAME 250 // en ms
#define TCASE 1		// Taille des cases du tableau
#define xMAX 1500
#define yMAX 1000
typedef struct Dimension
{
  int w;
  int h;
} Struct_dim;

typedef struct Cellule
{
  short x;
  short y;
  short status;
} Struct_cel;

// system
void SDL_ExitWithError(const char *text);
int display_textureP(SDL_Renderer *r,SDL_Texture *t, short x, short y);
void SDL_VerifNull(SDL_Texture *t,char *message);

// contents
int displayCellules(SDL_Renderer* rendu , SDL_Texture* CelluleTexture, short** tab);
void seeCellule(short** tab);
void isBornCellule(short** tab,short x, short y);
void DepartTabCellule(short** TabCellules);

#endif