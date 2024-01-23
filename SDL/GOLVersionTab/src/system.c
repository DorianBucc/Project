#include "lib.h"

void SDL_ExitWithError(const char *text){

    SDL_Log("ERREUR : %s > ERREUR %s", text, SDL_GetError());
    SDL_Quit();
    exit(EXIT_FAILURE);
}

void SDL_VerifNull(SDL_Texture *t,char *message)
{
    if (t == NULL)  SDL_ExitWithError(message); 
}


int display_textureP(SDL_Renderer *rendu,SDL_Texture *t,short x,short y)
{
    SDL_Rect position;
    position.x = x;
    position.y = y;
    SDL_QueryTexture(t, NULL, NULL, &position.w, &position.h);
    SDL_RenderCopy(rendu, t, NULL, &position);
    return 1;
}
