#include "lib.h"

// Fonction qui sera exécutée dans le thread
DWORD WINAPI ThreadFunction0(Vector lpParam) {
    for (int i = 0; i < 5; i++) {
        printf("%s%i\n","Thread: ",i);
        Sleep(1000);  // Pause d'une seconde
    }
    return 0;
}

DWORD WINAPI ThreadFunction1(LPVOID lpParam) {
    for (int i = 0; i < 10; i++) {
        printf("%s%i\n","Thread: ",i);
        Sleep(250);  // Pause d'une seconde
    }
    return 0;
}

void DisplayTexture(Struct_Position pos,SDL_Texture* texture,SDL_Renderer* rendu){
    SDL_Rect position;
    position.x = pos.x;
    position.y = pos.y;
    SDL_QueryTexture(texture, NULL, NULL, &position.w, &position.h);
    SDL_RenderCopy(rendu, texture, NULL, &position);
}


void SDL_ExitWithError(const char* text){

    SDL_Log("ERREUR : %s > ERREUR %s", text, SDL_GetError());
    SDL_Quit();
    exit(EXIT_FAILURE);
}


void SDL_DrawnCircle(SDL_Renderer* rendu,SDL_Circle circle)
{
  int d, y, x, rayon, cx, cy;

  if(circle.w-2 > 0){rayon = circle.w-1;}
  else rayon = circle.w;
  if(circle.x-1 > 0){cx = circle.x-1;}
  else rayon = circle.x;
  if(circle.y-1 > 0){cy = circle.y-1;}
  else rayon = circle.y;
 
  d = 3 - (2 * rayon);
  x = 0;
  y = rayon;
 
  while (y >= x) {
    SDL_RenderDrawPoint(rendu,cx + x, cy + y);
    SDL_RenderDrawPoint(rendu,cx + y, cy + x);
    SDL_RenderDrawPoint(rendu,cx - x, cy + y);
    SDL_RenderDrawPoint(rendu,cx - y, cy + x);
    SDL_RenderDrawPoint(rendu,cx + x, cy - y);
    SDL_RenderDrawPoint(rendu,cx + y, cy - x);
    SDL_RenderDrawPoint(rendu,cx - x, cy - y);
    SDL_RenderDrawPoint(rendu,cx - y, cy - x);
 
    if (d < 0)
      d = d + (4 * x) + 6;
    else {
      d = d + 4 * (x - y) + 10;
      y--;
    }
    x++;
  }
}
void SDL_DrawnCircleFill(SDL_Renderer* rendu,SDL_Circle circle)
{
  int d, y, x, rayon, cx, cy;

  if(circle.w-2 > 0){rayon = circle.w-1;}
  else rayon = circle.w;
  if(circle.x-1 > 0){cx = circle.x-1;}
  else rayon = circle.x;
  if(circle.y-1 > 0){cy = circle.y-1;}
  else rayon = circle.y;

while(rayon != 0){
    rayon--;
    d = 3 - (2 * rayon);
    x = 0;
    y = rayon;
    while (y >= x) {
        SDL_RenderDrawPoint(rendu,cx + x, cy + y);
        SDL_RenderDrawPoint(rendu,cx + y, cy + x);
        SDL_RenderDrawPoint(rendu,cx - x, cy + y);
        SDL_RenderDrawPoint(rendu,cx - y, cy + x);
        SDL_RenderDrawPoint(rendu,cx + x, cy - y);
        SDL_RenderDrawPoint(rendu,cx + y, cy - x);
        SDL_RenderDrawPoint(rendu,cx - x, cy - y);
        SDL_RenderDrawPoint(rendu,cx - y, cy - x);
    
        if (d < 0)
            d = d + (4 * x) + 6;
        else {
            d = d + 4 * (x - y) + 10;
        y--;
    }
    x++;
    }
    }
}