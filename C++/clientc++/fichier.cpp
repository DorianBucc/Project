#include "lib.h"
using namespace std;


//non fonctionnelle
void LitFichier(string const nomFichier)
{
    //ofstream monFlux(nomFichier.c_str());
    ifstream monFlux(nomFichier.c_str());

    if(monFlux)
    {
        // monFlux << "Bonjour, je suis une phrase écrite dans un fichier." << endl;
        // monFlux << 42.1337 << endl;
        // int age(36);
        // monFlux << "J'ai " << age << " ans." << endl;
        string val;
        double tab[610][2];
        int i=0;
        do
        {
            monFlux >> val;
            if(val == "("){
                monFlux >> tab[i][0];
                monFlux >> val;
                if(val != ","){return ;}//NULL
                monFlux >> tab[i][1];

                cout << tab[i][0] << ", " << tab[i][1] << endl;
                i++;
            }
            
        }
        while(val != ";");
        return ;//tab
    }
    else
    {
        cout << "ERREUR: Impossible d'ouvrir le fichier." << endl;
    }
    return ;
}
// int main(int argc, char const *argv[])
// {
//     LitFichier("C:/Project/test.txt");
//     return 0;
// }


