using namespace std;
#include "./J++/j++.h"
#include <fstream>


int main() {
    
    Fenetre frame2("Exemple",800,800,0,5,0,5);
    frame2.DessineTrait(0, 0, 1, 0.5);
    frame2.DessineTrait(4, 4, 2, 2, 15,108,0,200,255);
    frame2.DessineRectangle(2.5, 2.5, 1, 1);
    frame2.DessineRectangle(2.5, 2.5, 2, 2,255,0,0,255);
    frame2.DessineRectangle(2.5, 2.5, 3, 3);
    frame2.RempliRectangle(3, 3, 1, 1);
    frame2.RempliRectangle(3, 1.5, 1, 1,255,0,255,255,0,0,255,255);
    frame2.DessineCercle(1, 1, 30,108,0,200,255);
    frame2.RempliCercle(0.5, 0.5, 30,255,0,255,255,0,0,255,255);
    double tabPoint[4][2] = {{1,1},{2,1},{2,3},{1,4}};
    frame2.DessinePolygone(4,tabPoint,108,0,200,255);
    double tabPoint2[4][2] = {{4.5,4.5},{4.5,3.8},{3.5,3.5},{3.8,4.5}};
    frame2.RempliPolygone(4,tabPoint2,255,0,255,255,0,0,255,255);
    frame2.DessineTexte(2.5,4,"Texte ...");
    frame2.DessineTrait(1.1, 1.1, 1.5, 1.5,108,0,200,255);
    
    Sleep(500);

    return 0;
}