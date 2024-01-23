using namespace std;
#include "./J++/j++.h"
#include <fstream>

void Gecko(int max, double tab[][2], Fenetre &frame3);
void ecaillesGecko(int max, double tab[][2], Fenetre &frame3);

int main() {
    // Fenetre frame2("Exemple",800,800,0,5,0,5);
    // frame2.DessineTrait(0, 0, 1, 0.5);
    // frame2.DessineTrait(4, 4, 2, 2, 15,108,0,200,255);
    // frame2.DessineRectangle(2.5, 2.5, 1, 1);
    // frame2.DessineRectangle(2.5, 2.5, 2, 2,255,0,0,255);
    // frame2.DessineRectangle(2.5, 2.5, 3, 3);
    // frame2.RempliRectangle(3, 3, 1, 1);
    // frame2.RempliRectangle(3, 1.5, 1, 1,255,0,255,255,0,0,255,255);
    // frame2.DessineCercle(1, 1, 30,108,0,200,255);
    // frame2.RempliCercle(0.5, 0.5, 30,255,0,255,255,0,0,255,255);
    // double tabPoint[4][2] = {{1,1},{2,1},{2,3},{1,4}};
    // frame2.DessinePolygone(4,tabPoint,108,0,200,255);
    // double tabPoint2[4][2] = {{4.5,4.5},{4.5,3.8},{3.5,3.5},{3.8,4.5}};
    // frame2.RempliPolygone(4,tabPoint2,255,0,255,255,0,0,255,255);
    // frame2.DessineTexte(2.5,4,"Texte ...");
    // frame2.DessineTrait(1.1, 1.1, 1.5, 1.5,108,0,200,255);

    string const nomFichier("./Fichier/Nuage_noyaux_ecailles.txt");
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
        ecaillesGecko(max, tab, frame3);

        string const nomFichier2("./Fichier/Nuage_contour.txt");
        ifstream monFlux2(nomFichier2.c_str());

            if(monFlux2)
            {
                monFlux2 >> max;
                bool PremierTour = true;
                int i = 0;
                do
                {
                    monFlux2 >> val;
                    if(val == "(")
                    {
                        monFlux2 >> tab[i][0];
                        monFlux2 >> val;
                        if(val != ","){return 1;}
                        monFlux2 >> tab[i][1];
                        
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
                while(!monFlux2.eof());
                Gecko(max, tab, frame3);

            }else{
                cout << "ERREUR: Impossible d'ouvrir le fichier." << endl;
            }
    }

    Sleep(6000);

    return 0;
}

void Gecko(int max, double tab[][2], Fenetre &frame3){
    for (int i = 0; i < max; i++)
    {
        frame3.DessineTrait(tab[i][0], tab[i][1], tab[(i+1) % max][0], tab[(i+1) % max][1]);
    }
}

void ecaillesGecko(int max, double tab[][2], Fenetre &frame3){
    for (int i = 0; i < max; i++)
    {
        if(i > 650 && i < 687){
            frame3.RempliCercle(tab[i][0], tab[i][1], 5 + (i - 650) / 4, 255, (i / ((max - 230)/ 170)) % 170, 0, 255, 255, 30 + (i / ((max - 230) / 200)) % 200, 0, 255);
        }
        else if(i < 687){
            frame3.RempliCercle(tab[i][0], tab[i][1], 5, 255, (i / ((max - 230)/ 170)) % 170, 0, 255, 255, 30 + (i / ((max - 230) / 200)) % 200, 0, 255);
        }else {
            frame3.RempliCercle(tab[i][0], tab[i][1], 5, 255, 110, 0, 255, 255, 140, 0, 255);
        }

        Sleep(10);
    }
}

/*
for (int i = 0; i < max; i++){
        if(i > 650 && i < 687){
            frame3.RempliCercle(tab[i][0], tab[i][1], 5 + (i - 650) / 4, 255, (i / ((max - 230)/ 170)) % 170, 0, 255, 255, 30 + (i / ((max - 230) / 200)) % 200, 0, 255);
        }
        else if(i < 687){
            frame3.RempliCercle(tab[i][0], tab[i][1], 5, 255, (i / ((max - 230)/ 170)) % 170, 0, 255, 255, 30 + (i / ((max - 230) / 200)) % 200, 0, 255);
        }else {
            frame3.RempliCercle(tab[i][0], tab[i][1], 5, 255, 110, 0, 255, 255, 140, 0, 255);
        }

        Sleep(10);
}
*/