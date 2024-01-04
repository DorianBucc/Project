using namespace std;
#include "lib.h"

const int L = 200; //longueur max en octets de la réponse du serveur



class Fenetre{
private:
    SOCKET sock;
    string addServ = "127.0.0.1";
    unsigned short portServ = 1664;
    string name;
    int width = 600;
    int height = 600;
    // partie mapping (Tous en brute)
    double xmin = 0;
    double ymin = -2;
    double xmax = 5;
    double ymax = 1;
    double lambda1;
    double lambda2;
    int a;
    int b;
    double multi;
    

public:
    Fenetre(string name,int w, int h)
    {
        this->name = name;
        this->width = w;
        this->height = h;
        this->Init();
    }
    Fenetre(string name,string add,unsigned short port,int w, int h)
    {
        this->name = name;
        this->addServ = add;
        this->portServ = port;
        this->width = w;
        this->height = h;
        this->Init();
    }
    void Init(){
        this->sock = Connexion(this->addServ,&this->portServ);
        Sleep(100);
        string requete = "Window," + to_string(this->width) + "," + to_string(this->height)+ ","+ this->name +"\r\n" ;
        if(send(this->sock, requete.c_str(), requete.length(), 0) != SOCKET_ERROR){
            cout << requete.c_str();
        };
        this->CoordinateCalc();
        Sleep(350);
        //this->show();
    }
    void CoordinateCalc(){ // calcule les valeur lambda1, lambda2, a et b
        vector<double> point = { this->xmax-this->xmin,this->ymax-this->ymin};
        vector<double> pointPrime = { (double)this->width,(double)-this->height};
        double l1 = abs(pointPrime[0])/abs(point[0]);
        double l2 = abs(pointPrime[1])/abs(point[1]);
        double lambda;
        if(l1 > l2) lambda = l2;
        else lambda = l1;
        short eta1;
        short eta2;
        if(pointPrime[0] > 0 && point[0] > 0) eta1 = 1;
        else eta1 = -1;
        if(pointPrime[1] > 0 && point[1] > 0) eta2 = 1;
        else eta2 = -1;
        this->lambda1 = lambda*eta1;
        this->lambda2 = lambda*eta2;
        vector<double> Cpoint = { (this->xmax+this->xmin)/2,(this->ymax+this->ymin)/2};
        vector<double> CpointPrime = { (double)this->width/2,(double)this->height/2};
        this->a = CpointPrime[0]-(this->lambda1)*Cpoint[0];
        this->b = CpointPrime[1]-(this->lambda2)*Cpoint[1];

        this->multi = abs(this->lambda1); // multiplicateur
    }

    void DessineTrait(double x1,double y1, double x2, double y2){
        this->toMapping(&x1,&y1);
        this->toMapping(&x2,&y2);
        string requete = "droite," + to_string((int)x1) + "," + to_string((int)y1) + "," + to_string((int)x2) + "," + to_string((int)y2)+"\r\n" ;
        send(this->sock, requete.c_str(), requete.length(), 0);
        Sleep(1);
    }

    void DessineRectangle(double x,double y, double w, double h){
        this->toMapping(&x,&y);
        
        string requete = "rectangle," + to_string((int)x) + "," + to_string((int)y) + "," + to_string((int)(w*this->multi)) + "," + to_string((int)(h*this->multi))+"\r\n" ;
        send(this->sock, requete.c_str(), requete.length(), 0);
        Sleep(1);        
    }

    void DessineCercle(double x,double y, double rayon){
        this->toMapping(&x,&y);
        string requete = "cercle," + to_string((int)x) + "," + to_string((int)y) + "," + to_string((int)rayon*2) + "," + to_string((int)rayon*2)+"\r\n" ;
        send(this->sock, requete.c_str(), requete.length(), 0);
        Sleep(1);
    }
    
    void DessineTexte(double x,double y, string texte){
        this->toMapping(&x,&y);
        string requete = "text," + texte + "," + to_string((int)x) + "," + to_string((int)y)+"\r\n" ;
        send(this->sock, requete.c_str(), requete.length(), 0);
        Sleep(1);
        // if(send(this->sock, requete.c_str(), requete.length(), 0) != SOCKET_ERROR){
        //     cout << requete.c_str();
        // };
    }

    void show(){
        string requete = "show\r\n" ;
        if(send(this->sock, requete.c_str(), requete.length(), 0) != SOCKET_ERROR){
            cout << requete.c_str();
        };
        Sleep(350);
    }

    void toMapping(double* x, double* y){
        *x = this->lambda1*(*x)+this->a;
        *y = this->lambda2*(*y)+this->b;
    }
};

int main() {

    // Fenetre frame("NomPage", 600, 600);
    // frame.DessineTrait(0, 0, 0.5, 0.5);
    // frame.DessineTrait(0.6, 0.6, 1, 1);
    // frame.DessineTrait(1.1, 1.1, 1.5, 1.5);
    // frame.DessineTrait(1.6, 1.6, 2, 2);
    // frame.DessineTrait(2.1, 2.1, 2.5, 2.5);
    // frame.DessineTrait(2.6, 2.6, 3, 3);
    // frame.DessineTrait(3.1, 3.1, 3.5, 3.5);
    
    // Fenetre frame2("Dorian",800,800);
    // frame2.DessineTrait(0, 0, 1, 0.5);
    // frame2.DessineRectangle(1, 4, 3, 3);
    // frame2.DessineTrait(1.1, 1.1, 1.5, 1.5);
    Fenetre frame3("Gecko",600,600);
    int ch;
    ch = cin.get();
    cout << "Fenetre créée" << endl;
    string const nomFichier("C:/Project/test.txt");
    ifstream monFlux(nomFichier.c_str());

    string val;
    double tab[1200][2];
    int i=0;
    if(monFlux)
    {
        // monFlux << "Bonjour, je suis une phrase écrite dans un fichier." << endl;
        // monFlux << 42.1337 << endl;
        // int age(36);
        // monFlux << "J'ai " << age << " ans." << endl;
        
        do
        {
            monFlux >> val;
            if(val == "("){
                monFlux >> tab[i][0];
                monFlux >> val;
                if(val != ","){return 1;}
                monFlux >> tab[i][1];

                //cout << tab[i][0] << ", " << tab[i][1] << endl;
                i++;
            }
            
        }
        while(val != ";");

    //     string const nomFichier2("C:/Project/test.txt");
    // ifstream monFlux2(nomFichier2.c_str());

    // string val2;
    // double tab2[1200][2];
    // int i=0;
    // if(monFlux2)
    // {
    //     // monFlux << "Bonjour, je suis une phrase écrite dans un fichier." << endl;
    //     // monFlux << 42.1337 << endl;
    //     // int age(36);
    //     // monFlux << "J'ai " << age << " ans." << endl;
        
    //     do
    //     {
    //         monFlux2 >> val2;
    //         if(val2 == "("){
    //             monFlux2 >> tab2[i][0];
    //             monFlux >> val;
    //             if(val != ","){return 1;}
    //             monFlux >> tab[i][1];

    //             //cout << tab[i][0] << ", " << tab[i][1] << endl;
    //             i++;
    //         }
            
    //     }
    //     while(val != ";");
        
        int max = 1142; // Attention valeur en dur
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
            frame3.DessineTrait(tab[i][0], tab[i][1], tab[(i+1) % max][0], tab[(i+1) % max][1]);
        }
        //--------------------------------------------------------------------------
        int ch2;
        ch2 = cin.get();
    }
    else
    {
        cout << "ERREUR: Impossible d'ouvrir le fichier." << endl;
    }

    


    return 0;
}