#include "lib.h"

//commande d'éxécution gcc src/*.c -o bin/a -I include -L lib -lmingw32 -lSDL2main -lSDL2

int main(int argc, char **argv){
    SDL_Window* window = NULL;                      //Initialisation variable window
    SDL_Renderer* rendu = NULL;                 //Initialisation variable rendu
    /* initialisation de la SDL */

    if(SDL_Init(SDL_INIT_VIDEO) != 0){
        SDL_ExitWithError("Initialisation SDL_VIDEO");        //Initialisation de la SDL
    }

    /* creation de la fenetre windows est du renderer */

    window = SDL_CreateWindow("Jeu de billes", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, DimWinW, DimWinH, 0);
    if(window == NULL){
        SDL_ExitWithError("La création de la fenêtre à échouée");
    }
    rendu = SDL_CreateRenderer(window, -1, SDL_RENDERER_SOFTWARE);
    if(rendu == NULL){
        SDL_ExitWithError("La création du renderer à échoué");
    }
    SDL_RenderClear(rendu);

    /* creation des textures */

    SDL_Texture* bille = NULL;
    bille = SDL_CreateTexture(rendu, SDL_PIXELFORMAT_ABGR8888, SDL_TEXTUREACCESS_TARGET, TBILLE, TBILLE);
    SDL_SetRenderDrawColor(rendu, 255, 255, 255, 255);
    SDL_SetRenderTarget(rendu, bille);
    //SDL_RenderDrawRect(rendu,&(SDL_Rect){0,0,TBILLE-1,TBILLE-1});
    SDL_DrawnCircle(rendu,(SDL_Circle){TBILLE/2,TBILLE/2,TBILLE/2});
    SDL_SetRenderTarget(rendu, NULL);

    SDL_Rect position;
    position.x = 200;
    position.y = 100;
    int start = 1;
    Struct_Position mouse;

    Bille bille1 = (Bille){(Struct_Position){TBILLE,TBILLE},1,0,(Vector){1,1}};

    HANDLE hThread;
    DWORD threadId;

    

    while (start)
    {
        SDL_Event event;
        while(SDL_PollEvent(&event)){
            switch(event.type)												    //Dans le cas où s'est un type d'evenement
            {
                case SDL_KEYDOWN:
                    switch (event.key.keysym.sym)				                        //Dans le cas d'une touche du clavier
                    {
                        case SDLK_ESCAPE:								                //Dans le cas de la touche echap faire ...
                            start = 0;		                                //Le programme s'arrete
                            break;
                        default:
                            break;
                    }
                    break;
                case SDL_MOUSEBUTTONDOWN:
                    mouse.x = event.button.x/133;
                    mouse.y = event.button.y/133;
                    printf("x:%d y:%d\n",mouse.x,mouse.y);
                    break;
                case SDL_QUIT:
                    start = 0;
                    break;
                default:
                    break;
            }
        }
        hThread = CreateThread(NULL, 0, ThreadFunction1, NULL, 0, &threadId);
        DisplayTexture(bille1.position,bille,rendu);
        SDL_SetRenderDrawColor(rendu, 0, 0, 0, 255);
        SDL_Delay(5);
        move(&bille1);
        SDL_RenderPresent(rendu);
        SDL_RenderClear(rendu);
    }
    
    return 0;
}

