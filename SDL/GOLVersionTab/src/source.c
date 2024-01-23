#include "lib.h"
/* gcc src/*.c -o bin/a -I include -L lib -lmingw32 -lSDL2main -lSDL2 -lSDL2_ttf  (-mwindows) */
int main(int argc, char **argv)
{
    /*Initialisation des variables*/


    Struct_dim StrWindow = {1501,1001};         // dimension de la fenetre                                                            
    SDL_Window *window = NULL;				      // initialisation variable fenetre
    SDL_Renderer *FondEcran = NULL; 				// initialisation variable rendu

    /*Initialisation de la SDL*/

    if(SDL_Init(SDL_INIT_VIDEO) != 0)   SDL_ExitWithError("Initialisation SDL_VIDEO");        //Initialisation de la SDL

    /*Initialisation de la fenetre*/

    window = SDL_CreateWindow("GAME_OF_LIFE (Jeu de la vie)", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, StrWindow.w, StrWindow.h, 0); //window prend pour valeur la fenetre initialiser
    if(window == NULL) SDL_ExitWithError("Initialisation SDL_WINDOW");		//Si la fenetre ne s'execute pas, renvoyer message d'erreur

    /*Initialisation du rendu*/

    FondEcran = SDL_CreateRenderer(window, -1, SDL_RENDERER_SOFTWARE);			//renderer prend pour valeur le rendu de la fenetre
    if(FondEcran == NULL) SDL_ExitWithError("Initialisation SDL_RENDERER");		//Si le rendu ne s'execute pas, renvoyer message d'erreur
    if(SDL_RenderClear(FondEcran) != 0) SDL_ExitWithError("Nettoyage SDL_RenderClear");	//Supprime le rendu de la fenetre 

    /*Initialisation des textures*/

    SDL_Rect rCellule = {0,0,TCASE,TCASE};                          // Rectangle du pion 2 et 3
    SDL_Texture *celluleTexture = NULL;
    celluleTexture = SDL_CreateTexture(FondEcran, SDL_PIXELFORMAT_RGBA8888, SDL_TEXTUREACCESS_TARGET, TCASE, TCASE);   // Texture du pion 2 carré
    SDL_SetRenderDrawColor(FondEcran,255,255,255,255);
    SDL_SetRenderTarget(FondEcran, celluleTexture);
    SDL_RenderClear(FondEcran);	
    SDL_SetRenderTarget(FondEcran, NULL);

    /* Début du lancement du programme */


    SDL_bool prog_launch = SDL_TRUE;       // Booléen
    int count = 0;
    short** TabCellules;
    TabCellules = malloc(sizeof(short*) * yMAX);
    for (int i = 0; i < yMAX; i++)
    {
        TabCellules[i] = malloc(sizeof(short) * xMAX);
    }
    DepartTabCellule(TabCellules);
    

    while(prog_launch)		                                                    //Tant que programme = LANCER
    {
        SDL_Event event;                                                        //Declaration de la variable(struct) event de type evenement
        while(SDL_PollEvent(&event)) 									        //Tant qu'il y a des evenements
        {
            switch(event.type)												    //Dans le cas où s'est un type d'evenement
            {
            case SDL_KEYDOWN:												    //Dans l'évenement d'une touche enfoncée alors ...
                switch (event.key.keysym.sym)				                        //Dans le cas d'une touche du clavier
                {
                case SDLK_ESCAPE:								                //Dans le cas de la touche echap faire ...
                    prog_launch = SDL_FALSE;		                                //Le programme s'arrete
                    break;
                default:
                    break;
                }
            case SDL_QUIT:
                prog_launch = SDL_FALSE;
                break;
            default:
                break;
            }
        }
        displayCellules(FondEcran,celluleTexture,TabCellules);        
        SDL_RenderPresent(FondEcran);
        seeCellule(TabCellules);       
        SDL_SetRenderDrawColor(FondEcran,0,0,0,SDL_ALPHA_OPAQUE);       // Definir la couleur noir
        SDL_RenderClear(FondEcran);										//définir tous les pixels du renderer à la couleur
        //system("pause");
        count++;
        printf("%i\n",count);
        SDL_Delay(DELAYFRAME);
    }

    /*Fermeture de la fenetre SDL*/

    SDL_DestroyRenderer(FondEcran);	    //Destruction du rendu
    SDL_DestroyWindow(window);		    //Destruction de la fenetre
    SDL_Quit();						    //Fermeture de la SDL

    return EXIT_SUCCESS;	//Retour si fermeture bein executee
}