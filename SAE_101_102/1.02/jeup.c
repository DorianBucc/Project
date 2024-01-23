#include "lib.h"

int main()
{
    char ps[30];                                    // Initialisation de la variable du pseudo du joueur
    int nbl, nbc, niv, tour;                        // Initialisation de la variable nombre max de ligne et de colonne du choix du niveaux et de la variable pour connaitre le nombre de tour

    struct T_Case pion;                             // Structure des coordonné du pion
    pion.c = 1;                                     // Initialisation des coordonnés du pion (colonne)
    pion.l = 1;                                     // Initialisation des coordonnés du pion (ligne)
    
    parametre(ps, &nbl, &nbc, &niv, &tour);
    
    aff(nbl, nbc, &pion);                           // Affichage du tableau initial du jeu
    jeux(&pion, nbl, nbc, ps, niv,tour);            // Lancement du jeu

    // system("pause");
}




void topcase()                                      // Fonction ecrivant les 3 bar ───
{
    for (int a = 1; a <= 3; a++)
    {
        printf("─");
    }
}

void vidbuffer()                                    // Fonction permettant de vider le buffer pour empeche les boucle infinie
{
    while (getchar() != '\n'){}
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


void parametre(char ps[30], int *li, int *co, int *niv, int *tour)      // Fonction demandant la taille du tableaux souhaité
{
    do                                                                  // La saisit du pseudo
    {    
        printf("\e[0;34mVeuillez saisir votre pseudo pour la partie : \e[0m\n");   
        scanf("%s",ps);                                                 // La saisit du pseudo
        vidbuffer();                                                    // Fonction permettant de vider le buffer pour empeche les boucle infinie    
        if (strlen(ps) >= 30)       printf("\e[0;31mVeuillez réessayer\e[0m\n");     // Message d'erreur  

    }while(strlen(ps) >= 30);                                           // Repeter la boucle si le pseudo est trop long

    do
    {
        printf("\e[0;34mVeuillez saisir le nombre de lignes souhaitez pour le jeu :\e[0m\n");
        scanf("%d", &*li);                                                          // Affecte l'entré à li
        vidbuffer();                                                                // Fonction permettant de vider le buffer pour empeche les boucle infinie
        
        if (*li < VMIN || *li > VMAX)    printf("\e[0;31mNombre de lignes invalide.\e[0m\n");     // Vérifie l'entré est affiche un message d'erreur si besoin
    } while (*li < VMIN || *li > VMAX);                                             // Vérifie l'entré est relance la demande si besoin
    do
    {
        printf("\e[0;34mVeuillez saisir le nombre de colonnes souhaitez pour le jeu :\e[0m\n");
        scanf("%d", &*co);                                                          // Affecte l'entré à co
        vidbuffer();                                                                // Fonction permettant de vider le buffer pour empeche les boucle infinie
        
        if (*co < VMIN || *co > VMAX)    printf("\e[0;31mNombre de colonnes invalide.\e[0m\n");   // Vérifie l'entré est affiche un message d'erreur si besoin
    } while (*co < VMIN || *co > VMAX);                                             // Vérifie l'entré est relance la demande si besoin

    int re;
    do
    {
        re = 1;
        printf("\e[0;34mQuelle niveau d'IA souhaitez-vous affrontez :\n Debutant : d\n Intermediaire : i\n Expert : e\n Virtuose : v\e[0m\n");
        char get = getchar();           // Recupere l'entrée de l'utilisateur
        vidbuffer();
        switch (get)
        {
        case 'd':case 'D':              // Si la valeur récuperer vaut 'd' ou 'D'
            *niv = 1;
            break;
        case 'i':case 'I':              // Si la valeur récuperer vaut 'i' ou 'I'
            *niv = 2;
            break;
        case 'e':case 'E':              // Si la valeur récuperer vaut 'e' ou 'E'
            *niv = 3;
            break;
        case 'v':case 'V':              // Si la valeur récuperer vaut 'v' ou 'V'
            *niv = 4;
            break;
        default:
            re = 0;
            break;
        }
    } while (re == 0);                  // Recommencer tant que valeur n'est pas correct

    do
    {
        printf("\e[0;34mQui doit commencer\nVous(0) ou l'IA(1) :\e[0m\n");
        scanf("%d",&*tour);                                     // recuperer l'entré de l'utilisateur
        vidbuffer();
    } while (*tour < 0 || *tour > 1);                           // Recommencer tant que l'entrée n'est pas valide
}



void aff(int li,int co,struct T_Case *pion)                 // Affichage du tableau
{

    //system("clear");
    printf("\33[H\33[2J");                              //Permet d'espacer les tableaux en fonction de la taille du terminal

    printf("\n┌");                                      // Ecrit une sur chaque début interligne le (┌)
    for (int b = 1; b < co; b++)                            // Boucle pour ecrire les 3 bar V (───) et la crois (┼)
    {
        topcase();                                          // Ecrit les 3 bar ───
        printf("┬");                                    // Ecrit l'intersection (┬)
    }
    topcase();                                              // Ecrit les 3 bar ───
    printf("┐\n");                                      // Ecrit une sur chaque fin interligne le (┐)

    for (int i = 1; i <= li; i++)                           // Boucle pour les ligne
    {
        if (i != 1)
        {
            printf("├");                                // Ecrit une sur chaque début interligne le (├)
            for (int b = 1; b < co; b++)                    // Boucle pour ecrire les 3 bar V (───) et la crois (┼)
            {
                topcase();                                  // Ecrit les 3 bar ───
                printf("┼");                             // Ecrit l'intersection (┼)
            }
            topcase();                                      // Ecrit les 3 bar ───
            printf("┤\n");                              // Ecrit une sur chaque fin interligne le (┤)
            
        }

        for (int j = 1; j <= co; j++)                       // Boucle pour les colonnes
        {
            if (j == co && i == li) printf("│ \e[0;35mP \e[0m");                              // Affichage de la case du puit
            else if(pion->l == i && pion->c == j)    printf("│ \e[0;36m♟ \e[0m");       // Affichage case du (*pion)
            else                                                                    // Affichage des cases à zero
                printf("│   ");                                                  // ↑ écriture de l'emplacement des 0 du tableaux
        }
        printf("│\n");                                   //Pour une fin de ligne d'un millieu de pour les colone
    }

    printf("└");                                        // Ecrit une sur chaque début interligne le (└)
    for (int b = 1; b < co; b++)                            // Boucle pour ecrire les 3 bar V (───) et la crois (┼)
    {
        topcase();                                          // Ecrit les 3 bar ───
        printf("┴");                                    // Ecrit l'intersection (┴)
    }
    topcase();                                              // Ecrit les 3 bar ───
    printf("┘\n\n");                                    // Ecrit une sur chaque fin interligne le (┘)

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


int cascase(int l,int c,int li, int co)             //Fonction vérifier si une case est gagnante ou perdante
{
    int cas = 1;                            // Default case perdante
    for (int i = li; i > 0; i-=3)           // Vise de trois en trois ligne en commencant par le coin où se situe le puit
    {
        for (int j = co; j > 0; j-=3)       // Vise de trois en trois colonne en commencant par le coin où se situe le puit
        {
            if ((j == c && i == l)||(j-1 == c && i-1 == l)||(j-2 == c && i-2 == l))         // Choisi la case pouvant etre une case gagnante
            {
                cas = 0;                    // Affecte à cas la valeur gagnante
            }       
        }       
    }
    return cas;                             // Retourne cas gagnant ou perdant (1 ou 0)
}

void move(struct T_Case *pion,int mov,int nb)       // Déplace le (*pion)
{      
    if (mov == 1)       pion->l+=nb;                // Si le mouvement demander et le bas
    else if (mov == 2)  pion->c+=nb;                // Si le mouvement demander et la droite
}

void alea(struct T_Case *pion,int li,int co, int *i ,int *j)    // Fonction pour l'ia aléatoire
{
    int t;
    do
    {
        t = 0;  *j = 1 + rand()%2;
        if (*j == 2)
        {
            t = 1;
            if (pion->c <= (co - 2))  *i = 1 + rand()%2 ;       // Si on est loin de la limite alors se sera 1 ou 2
            else if (pion->c == (co - 1)) *i = 1 ;              // Si on est moin loin de la limite alors se sera 1
            else t = 0;                                         // En cas de non possibilité il relance la boucle
        }
        else if (*j == 1)
        {
            t = 1; 
            if (pion->l <= (li - 2))    *i = 1 + rand()%2;      // Si on est loin de la limite alors se sera 1 ou 2
            else if (pion->l == (li - 1))  *i = 1 ;             // Si on est moin loin de la limite alors se sera 1                
            else t = 0;                                         // En cas de non possibilité il relance la boucle
        }
    } while (t == 0);
}

void trefle(struct T_Case *pion,int li,int co, int *nb ,int *mov)   // Fonction de l'ia qui tente de gagner 
{
// (si mov = 1 cest en bas sinon c'est mov = 2 donc à droite)
// (si nb = 1 alors déplacement d'une case sinon c'est nb = 2 donc 2 case)

    if (li == pion->l)                  // Si le pion et tous en bas
    {
        *mov = 2;                       // Deplacement à droite
        if(cascase(pion->l,pion->c+1,li,co) == 0) *nb = 1;
        else if (cascase(pion->l,pion->c+2,li,co) == 0) *nb = 2;
        else *nb = 1 + rand()%2;        // Si aucun coup gagnant possible alors aléatoire
    }
    else if (co == pion->c)
    {
        *mov = 1;                       // Deplacement en bas
        if(cascase(pion->l+1,pion->c,li,co) == 0) *nb = 1;
        else if (cascase(pion->l+2,pion->c,li,co) == 0) *nb = 2;
        else *nb = 1 + rand()%2;        // Si aucun coup gagnant possible alors aléatoire
    }
    
    else if (co-1 == pion->c && li-1 == pion->l)
    {
        *mov = 2;                       // Deplacement à droite
        if(cascase(pion->l,pion->c+1,li,co) == 0) *nb = 1;
        else
        {
            *mov = 1;                   // Deplacement en bas
            if(cascase(pion->l+1,pion->c,li,co) == 0) *nb = 1;
            else                        // Si aucun coup gagnant possible alors aléatoire
            {
                *mov = 1 + rand()%2;
                *nb = 1;
            }
        }
    }
    else if (li-1 == pion->l)
    {
        *mov = 2;                       // Deplacement à droite
        if(cascase(pion->l,pion->c+1,li,co) == 0) *nb = 1;
        else if (cascase(pion->l,pion->c+2,li,co) == 0) *nb = 2;
        else
        {
            *mov = 1;                   // Deplacement en bas
            if(cascase(pion->l+1,pion->c,li,co) == 0) *nb = 1;
            else                        // Si aucun coup gagnant possible alors aléatoire
            {
                *mov = 1 + rand()%2;
                if (*mov == 2)  *nb = 1 + rand()%2;
                else            *nb = 1;
            }
        }
    }
    else if (co-1 == pion->c)
    {
        
        *mov = 2;                       // Deplacement à droite
        if(cascase(pion->l,pion->c+1,li,co) == 0) *nb = 1;
        else
        {
            *mov = 1;                   // Deplacement en bas
            if(cascase(pion->l+1,pion->c,li,co) == 0) *nb = 1;
            else if (cascase(pion->l+2,pion->c,li,co) == 0) *nb = 2;
            else                        // Si aucun coup gagnant possible alors aléatoire
            {
                *mov = 1 + rand()%2;
                if (*mov == 1)  *nb = 1 + rand()%2;
                else            *nb = 1;
            }
        }
    }
    else
    {
        *mov = 2;                       // Deplacement à droite
        if(cascase(pion->l,pion->c+1,li,co) == 0 && rand()%2 == 1) *nb = 1;
        else if (cascase(pion->l,pion->c+2,li,co) == 0 && rand()%2 == 1) *nb = 2;
        else if(cascase(pion->l+1,pion->c,li,co) == 0)
        {
            *mov = 1;                   // Deplacement en bas
            *nb = 1;
        }
        else if (cascase(pion->l+2,pion->c,li,co) == 0)
        {
          *mov = 1;                     // Deplacement en bas
          *nb = 2;  
        }             
        else                            // Si aucun coup gagnant possible alors aléatoire
        {
            *mov = 1 + rand()%2;
            *nb = 1 + rand()%2;
        }
    }
    
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

void demande(struct T_Case *pion,int li, int co,int *nb, int *mov){

    int verif;
    do
    {
        printf("\e[0;34mVoulez-vous déplacer le pion vers le bas ou la droite : (b/B/d/D)\e[0m\n");   
        char rep = getchar();                                                   // recup de la saisit
        vidbuffer();
        switch (rep)                                                            // cas parmis la saisit
        {
        case 'd': case 'D':                                                     // cas pour aller à droite
            *mov = 2;
            do
            {
                printf("\e[0;34mDe combien de case souhaitez-vous vous deplacer : (1/2)\e[0m\n");
                scanf("%d", &*nb);                                              // recup de la saisit du nombre de case à ce déplacer
                vidbuffer();
                if (pion->c <= (co - 2))                                            // si on est loin de la limite alors se sera 1 ou 2
                {   
                    if (*nb == 2 || *nb == 1) verif = 1;                        // verification de la saisit puis validation ou non
                    else 
                    {
                        printf("\e[0;31mVeuillez réessayer\e[0m\n");                        // message d'erreur
                        *mov = -1;                                              // relancement de la grande boucle tant que
                        verif = 0;                                                  // pour sortir de la petite boucle tant que
                    }
                }
                else if (pion->c == (co - 1))                                             // si on est moin loin de la limite alors se sera 1                
                { 
                    if (*nb == 1) verif = 1;                                    // verification de la saisit puis validation ou non
                    else
                    {
                        printf("\e[0;31mVeuillez réessayer\e[0m\n");                        // message d'erreur
                        *mov = -1;                                              // relancement de la grande boucle tant que
                        verif = 0;                                                  // pour sortir de la petite boucle tant que
                    }
                }
                else if (pion->c == co)                                                 // si on est à la limite
                {
                    printf("\e[0;31mVeuillez réessayer une direction\e[0m\n");                   // message d'erreur
                    *mov = -1;                                                      // relancement de la grande boucle tant que
                    verif = 1;                                                      // pour sortir de la petite boucle tant que
                }
            }while (verif == 0);
            verif = 0;                                                          // mise à 0
            break;
        case 'b': case 'B':                                                       // cas pour aller en bas
            *mov = 1;
            do
            {
                printf("\e[0;34mDe combien de case souhaitez-vous vous déplacer : (1/2)\e[0m\n");
                scanf("%d", &*nb);                                                  // recup de la saisit du nombre de case à ce déplacer
                vidbuffer();
                if (pion->l <= (li - 2))                                               // si on est loin de la limite alors se sera 1 ou 2
                {
                    if (*nb == 2 || *nb == 1) verif = 1;                           // verification de la saisit puis validation ou non
                    else 
                    {
                        printf("\e[0;31mVeuillez réessayer\e[0m\n");                            // message d'erreur
                        *mov = -1;                                                  // relancement de la grande boucle tant que
                        verif = 0;                                                  // pour sortir de la petite boucle tant que
                    }
                }
                else if (pion->l == (li - 1))                                                 // si on est moin loin de la limite alors se sera 1
                { 
                    if (*nb == 1) verif = 1;                                        // verification de la saisit puis validation ou non
                    else 
                    {
                        printf("\e[0;31mVeuillez réessayer\e[0m\n");                            // message d'erreur
                        *mov = -1;                                                  // relancement de la grande boucle tant que
                        verif = 0;                                                  // pour sortir de la petite boucle tant que
                    }
                }
                else if (pion->l == li)                                                 // si on est à la limite                                                     
                {
                    printf("\e[0;31mVeuillez réessayer une direction\e[0m\n");               // message d'erreur
                    *mov = -1;                                                  // relancement de la grande boucle tant que
                    verif = 1;                                                  // pour sortir de la petite boucle tant que
                } 
            }while (verif == 0);
            verif = 0;                                                          // mise à 0
            break;
        default:                                                                    //cas par default
            *mov = -1;                                                          // relancement de la grande boucle tant que
            break;
        }
    } while (*mov == -1);
    
}

void tourIA(struct T_Case *pion,int niv,int li,int co, int *nb ,int *mov)           // Fonction pour la gestion du niveaux de l'ia
{
    printf("\e[0;32mTour de l'IA :\e[0m\n");
    srand((unsigned int) time( NULL ));
    if (niv == 4)                                                                   // si le niveau est sur virtuose
    {
        trefle(&(*pion),li,co,&*nb,&*mov);                                          //il y aura que la fonction du tour réfléchi
    }
    else if (niv == 3)                                                              // si le niveau est sur expert
    {
        int tier = rand()%3;
        if (tier == 1 || tier == 2)                                                // 2 tier du temp il jouera correctement 
        {   
            trefle(&(*pion),li,co,&*nb,&*mov);
        }
        else
        {
            alea(&(*pion),li,co,&*nb,&*mov);
        }
    }
    else if (niv == 2)                                                              // si le niveau est sur intermedaire
    {   
        int tier = rand()%3;
        if (tier == 1)                                                              // 1 tier du temp il jouera correctement
        {
            trefle(&(*pion),li,co,&*nb,&*mov);
        }
        else
        {
            alea(&(*pion),li,co,&*nb,&*mov);
        }
    }
    else    alea(&(*pion),li,co,&*nb,&*mov);                                        // sinon débutant donc il joue que aléatoirement
}

void end(struct T_Case *pion,int li,int co,int *endgame,int joueur,char *ps)        // Fonction permettant de savoir si il se situe sur le puit
{
    if (pion->l == li && pion->c == co)                                             // si le pion est sur le puit
    {
        *endgame = 0;                                                               // permet d'arreté la boucle du jeu
        printf("\e[0;33mFin de partie !\e[0m\a\n");                          
        if (joueur %2 == 1)     printf("\e[0;34mBien jouer %s\e[0m\n",ps);                       // pour connaitre le gagnant (grâce au nombre de tour de jeu)
        else    printf("\e[0;32mL'IA a batu %s\e[0m\n",ps);
    }  
}

void jeux(struct T_Case *pion,int nbl,int nbc,char *ps,int niv,int tour)            // Fonction déroule du jeux
{
    int mov, nb, endgame = 1;                             //déclaration variable 
    while (endgame)
    {
        if (tour%2 != 1)                                            // tour Joueur
        {
            demande(&(*pion),nbl,nbc,&nb,&mov);                     //fonction pour le tour du joueur
            move(&(*pion), mov, nb);                                //fonction pour le déplacement du pion dans la direction et la distance choisit

            aff(nbl, nbc, pion);                                    // affichage du tableau du jeu
            tour++;
            end(&(*pion), nbl,nbc,&endgame,tour,ps);                //vérification si le pion est sur le puit
            
        }
        if (tour%2 == 1 && endgame == 1)                            // tour IA
        {
            if (endgame)
            {
                tourIA(&(*pion),niv,nbl,nbc,&nb,&mov);              //fonction pour le tour de l'IA
                move(&(*pion),mov,nb);                              //fonction pour le déplacement du pion dans la direction et la distance choisit

                aff(nbl, nbc, pion);                                // affichage du tableau du jeu
                tour++;
                end(&(*pion), nbl,nbc,&endgame,tour,ps);           //vérification si le pion est sur le puit
            }
        }
    }
    
    

}

