using namespace std;
#include "./J++/j++.h"
#include <fstream>

void Gecko(int max, double tab[][2], Fenetre &frame3);
void ecaillesGecko(int max, double tab[][2], Fenetre &frame3);
void Serpent(int max, double tab[][2], Fenetre &frame4);
void ecaillesSerpent(int max, double tab[][2], Fenetre &frame4);

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
    // Fenetre frame4("Serpent",600,600,-1,2,0,8);
    // frame4.show();
    string const nomFichier("./Fichier/Nuage_noyaux_ecaillesGecko.txt");
    ifstream monFlux(nomFichier.c_str());

    double xmax;
    double ymax;
    double xmin;
    double ymin;

    string val;
    double tab[1400][2];
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
        monFlux.close();

            double ecart = (abs(xmax)+abs(xmin))/20;
            Fenetre frame3("Gecko",600,600,xmin-ecart,xmax+ecart,ymin,ymax);
            frame3.show();
            cout << "Fenetre n°3 créée" << endl;
            ecaillesGecko(max, tab, frame3);

            string const nomFichier2("./Fichier/Nuage_contourGecko.txt");
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
                monFlux2.close();
                Gecko(max, tab, frame3);
                
                }else{
                    cout << "ERREUR: Impossible d'ouvrir le fichier." << endl;
                }
                
                
    }
    Sleep(1000);
    string const nomFichier3("./Fichier/Nuage_noyaux_ecailles.txt");
    ifstream monFlux3(nomFichier3.c_str());
    cout << "monFlux3" << endl;
    if(monFlux3)
    {
        
        monFlux3 >> max;
        bool PremierTour = true;
        i = 0;
        do
        {
            monFlux3 >> val;
            
            if(val == "(")
            {
                monFlux3 >> tab[i][0];
                monFlux3 >> val;
                if(val != ","){return 1;}
                monFlux3 >> tab[i][1];
                
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
        while(!monFlux3.eof());

            double ecart = (abs(xmax)+abs(xmin))/20;
            Fenetre frame4("Serpent",600,600,xmin-ecart,xmax+ecart,ymin,ymax);
            frame4.show();
            cout << "Fenetre n°4 créée" << endl;
            ecaillesSerpent(max, tab, frame4);

            string const nomFichier4("./Fichier/Nuage_contour.txt");
            ifstream monFlux4(nomFichier4.c_str());

                if(monFlux4)
                {
                    monFlux4 >> max;
                    bool PremierTour = true;
                    int i = 0;
                    do
                    {
                        monFlux4 >> val;
                        if(val == "(")
                        {
                            monFlux4 >> tab[i][0];
                            monFlux4 >> val;
                            if(val != ","){return 1;}
                            monFlux4 >> tab[i][1];
                        
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
                while(!monFlux4.eof());
                Serpent(max, tab, frame4);

                }else{
                    cout << "ERREUR: Impossible d'ouvrir le fichier." << endl;
                }
    }else{
        cout << "ERREUR: Impossible d'ouvrir le fichier." << endl;
    }

    Sleep(10000);

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

        //Sleep(1);
    }
}

void Serpent(int max, double tab[][2], Fenetre &frame4){
    for (int i = 0; i < max; i++)
    {
        frame4.DessineTrait(tab[i][0], tab[i][1], tab[(i+1) % max][0], tab[(i+1) % max][1]);
    }
}

void ecaillesSerpent(int max, double tab[][2], Fenetre &frame4){
    for (int i = 0; i < max; i++)
    {
        if(i < 4){
            frame4.RempliCercle(tab[i][0], tab[i][1], 2 + i, 255, (i / ((max)/ 170)), 0, 255, 255, 30 + (i / ((max) / 200)), 0, 255);
        }else if((i == 1294) || (i >= 1298 && i <= 1299) || (i >= 1301 && i <= 1303)){
            frame4.RempliCercle(tab[i][0], tab[i][1], 10 + (i - 1302) / 4, 255, (i / ((max)/ 170)), 0, 255, 255, 30 + (i / ((max) / 200)), 0, 255);
        }else {
            frame4.RempliCercle(tab[i][0], tab[i][1], 5, 255, (i / ((max)/ 170)), 0, 255, 255, 30 + (i / ((max) / 200)), 0, 255);
        }

        //Sleep(1);
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