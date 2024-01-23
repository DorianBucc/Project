#ifndef LIB_H_
#define LIB_H_

#include <stdio.h>
#include <stdlib.h>
//#include <SDL2/SDL_image.h>
#include <SDL2/SDL.h>

#define TCASE 133

typedef struct Position
{
    int x;
    int y;
} Struct_pos;




void SDL_ExitWithError(const char *text);
void DisplayCroix(Struct_pos mouse,SDL_Texture* croix,SDL_Renderer* rendu);
#endif
