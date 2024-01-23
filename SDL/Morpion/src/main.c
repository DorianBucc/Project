#include "lib.h"
//commande d'éxécution gcc src/*.c -o bin/a -I include -L lib -lmingw32 -lSDL2main -lSDL2
int isWin(int tabJ[3][3], int pl);
int main(int argc, char **argv){
    SDL_Window* fenetre = NULL;                      //Initialisation variable fenetre
    SDL_Renderer* rendu = NULL;                 //Initialisation variable rendu

    if(SDL_Init(SDL_INIT_VIDEO) != 0){
        SDL_ExitWithError("Initialisation SDL_VIDEO");        //Initialisation de la SDL
    }

    fenetre = SDL_CreateWindow("Morpion", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, 400, 400, 0);
    if(fenetre == NULL){
        SDL_ExitWithError("La création de la fenêtre à échouée");
    }
    rendu = SDL_CreateRenderer(fenetre, -1, SDL_RENDERER_SOFTWARE);
    if(rendu == NULL){
        SDL_ExitWithError("La création du renderer à échoué");
    }
    SDL_RenderClear(rendu);

    SDL_Texture* croix = NULL;
    croix = SDL_CreateTexture(rendu, SDL_PIXELFORMAT_ABGR8888, SDL_TEXTUREACCESS_TARGET, 110, 110);
    SDL_SetRenderDrawColor(rendu, 255, 255, 0, 255);
    SDL_SetRenderTarget(rendu, croix);
    SDL_RenderDrawLine(rendu, 0, 0, 110, 110);
    SDL_RenderDrawLine(rendu, 0, 110, 110, 0);
    SDL_SetRenderTarget(rendu, NULL);

    SDL_Texture* cercle = NULL;
    cercle = SDL_CreateTexture(rendu, SDL_PIXELFORMAT_ABGR8888, SDL_TEXTUREACCESS_TARGET, 110, 110);
    SDL_SetRenderDrawColor(rendu, 255, 255, 0, 255);
    SDL_SetRenderTarget(rendu, cercle);
    SDL_Rect rect;
    rect.w = 110;
    rect.h = 110;
    rect.x = 0;
    rect.y = 0;
    SDL_RenderDrawRect(rendu,&rect);
    SDL_SetRenderTarget(rendu, NULL);

    SDL_Rect position;
    position.x = 200;
    position.y = 100;
    int start = 1;
    Struct_pos mouse;
    int compteur = 0;
    int tabJeu[3][3];

    for (int i = 0; i < 3; i++)
    {
        for (int y = 0; y < 3; y++)
        {
            tabJeu[i][y] = 0;
        }
        
    }
    

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
                    if(tabJeu[mouse.x][mouse.y] == 0)
                    {
                        compteur++;
                        if(compteur%2 == 0)
                        {
                            tabJeu[mouse.x][mouse.y] = 1;
                            DisplayCroix(mouse,cercle,rendu);
                            if(isWin(tabJeu,1))
                            {
                                printf("Le joueur avec le cercle a gagner avec %i coups\n",compteur/2);
                                start = 0;
                            }
                        }
                        else 
                        {
                            tabJeu[mouse.x][mouse.y] = 2;
                            DisplayCroix(mouse,croix,rendu);
                            if(isWin(tabJeu,2))
                            {
                                printf("Le joueur avec la croix a gagner avec %i coups\n",(compteur/2)+1);
                                start = 0;
                            }
                        }
                        
                        printf("x:%d y:%d\n",mouse.x,mouse.y);
                    }
                    break;
                case SDL_QUIT:
                    start = 0;
                    break;
                default:
                    break;
            }
        }
        SDL_SetRenderDrawColor(rendu, 255, 255, 0, 255);
        SDL_RenderDrawLine(rendu, 0, TCASE, 400, TCASE);
        SDL_RenderDrawLine(rendu, 0, 266, 400, 266);
        SDL_RenderDrawLine(rendu, 133, 0, 133, 400);
        SDL_RenderDrawLine(rendu, 266, 0, 266, 400);
        SDL_Delay(50);
        SDL_RenderPresent(rendu);
        if(compteur >= 9){start = 0; puts("Partie Terminer\nEgalite entre les deux joueurs.");}
    }
    system("start ./bin/a.exe");
    return 0;
}
int isWin(int tabJ[3][3], int pl){ // pl = player 1 ou 2
    for (int i = 0; i < 3; i++)
    {
        if(tabJ[i][0] == pl && tabJ[i][1] == pl && tabJ[i][2] == pl){return pl;}
        if(tabJ[0][i] == pl && tabJ[1][i] == pl && tabJ[2][i] == pl){return pl;}
    }
    if(tabJ[0][0] == pl && tabJ[1][1] == pl && tabJ[2][2] == pl){return pl;}
    if(tabJ[0][2] == pl && tabJ[1][1] == pl && tabJ[2][0] == pl){return pl;}
    return 0;
}