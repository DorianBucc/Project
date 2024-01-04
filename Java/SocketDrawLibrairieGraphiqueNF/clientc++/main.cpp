using namespace std;
#include "lib.h"


int main() {
    
    // Fenetre frame2("Dorian",800,800,0,5,0,5);
    // //int ch;
    // //ch = cin.get();
    // frame2.DessineTrait(0, 0, 1, 0.5);
    // frame2.DessineTrait(4, 4, 2, 2, 15);
    // frame2.DessineRectangle(2.5, 2.5, 1, 1);
    // frame2.DessineRectangle(2.5, 2.5, 2, 2);
    // frame2.DessineRectangle(2.5, 2.5, 3, 3);
    // frame2.RempliRectangle(3, 3, 1, 1);
    // frame2.DessineTrait(1.1, 1.1, 1.5, 1.5);
    
    ///*

    string const nomFichier("../Fichier/Nuage_noyaux_ecaillesGecko.txt");// ./../Fichier/Nuage_contourGecko.txt
    ifstream monFlux(nomFichier.c_str());

    double xmax;
    double ymax;
    double xmin;
    double ymin;

    string val;
    double tab[1200][2];
    int max;
    int i=0;
    if(monFlux)
    {
        monFlux >> max;
        bool PremierTour = true;
        do
        {
            monFlux >> val;
            if(val == "(")
            {
                monFlux >> tab[i][0];
                monFlux >> val;
                if(val != ","){return 1;}
                monFlux >> tab[i][1];
                
                if(PremierTour){
                    xmax = tab[i][0]; xmin = tab[i][0];
                    ymax = tab[i][1]; ymin = tab[i][1];
                    PremierTour = false;}
                else{
                    if(xmax < tab[i][0]){xmax = tab[i][0];}
                    if(xmin > tab[i][0]){xmin = tab[i][0];}
                    if(ymax < tab[i][1]){ymax = tab[i][1];}
                    if(ymin > tab[i][1]){ymin = tab[i][1];}
                }
                i++;
            }
            
        }
        while(!monFlux.eof());
        

    double ecart = (abs(xmax)+abs(xmin))/20;
    Fenetre frame3("Gecko",600,600,xmin-ecart,xmax+ecart,ymin,ymax);
    frame3.show();
    cout << "Fenetre créée" << endl;
    
        //int max = 1142; // Attention valeur en dur
        //-----------------------------------------------------------------------
        // for (int i = 0; i < max-1; i++)
        // {
        //     //cout << i;
        //     frame3.DessineTrait(tab[i][0], tab[i][1], tab[i+1][0], tab[i+1][1]);
        // }
        // frame3.DessineTrait(tab[0][0], tab[0][1], tab[max-1][0], tab[max-1][1]);
        //-------------------------------------------------------------------------
        for (int i = 0; i < max; i++)
        {
            //cout << i;
            //frame3.DessineTrait(tab[i][0], tab[i][1], tab[(i+1) % max][0], tab[(i+1) % max][1]);
            frame3.DessineCercle(tab[i][0], tab[i][1], 5);
        }
        //--------------------------------------------------------------------------
    }
    else
    {
        cout << "ERREUR: Impossible d'ouvrir le fichier." << endl;
    }
    //*/
    
    Sleep(500);

    return 0;
}