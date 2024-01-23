#include "lib.h"

void DisplayCroix(Struct_pos mouse,SDL_Texture* croix,SDL_Renderer* rendu){
    SDL_Rect position;
    position.x = mouse.x*133+11;
    position.y = mouse.y*133+11;
    SDL_QueryTexture(croix, NULL, NULL, &position.w, &position.h);
    SDL_RenderCopy(rendu, croix, NULL, &position);
}


void SDL_ExitWithError(const char *text){

    SDL_Log("ERREUR : %s > ERREUR %s", text, SDL_GetError());
    SDL_Quit();
    exit(EXIT_FAILURE);
}