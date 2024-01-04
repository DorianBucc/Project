/**
classe Erreur
*/
#ifndef ERREUR
#define ERREUR

using namespace std;

#include <stdio.h>
#include <string>
#include <iostream>
#include <sstream>
#include <fstream>
#include <winsock2.h>
#include <vector>
#include <cmath>

SOCKET Connexion(string addr,unsigned short* port);
void LitFichier(string const nomFichier);



class Erreur
{
public:
const static int LONGUEURMESSAGE = 100;
char message[1+LONGUEURMESSAGE];
Erreur();
Erreur(const char * messageErreur);

operator string() const;
};

ostream & operator << (ostream & os, const Erreur & erreur);

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
    double ymin = 0;
    double xmax = 1;
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
    Fenetre(string name,int w, int h,double xmin,double xmax,double ymin,double ymax)
    {
        this->name = name;
        this->width = w;
        this->height = h;
        this->xmin = xmin;
        this->ymin = ymin;
        this->xmax = xmax;
        this->ymax = ymax;
        this->Init();
    }
    void Init(){
        this->sock = Connexion(this->addServ,&this->portServ);
        Sleep(100);
        string requete = "window," + to_string(this->width) + "," + to_string(this->height)+ ","+ this->name +"\r\n" ;
        if(send(this->sock, requete.c_str(), requete.length(), 0) != SOCKET_ERROR){
            cout << requete.c_str();
        };
        this->CoordinateCalc();
        Sleep(350);
        Sleep(150);
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
        string requete = "droite," + to_string((int)x1) + "," + to_string((int)y1) + "," + to_string((int)x2) + "," + to_string((int)y2) ;
        Envoye(requete);
    }

    void DessineTrait(double x1,double y1, double x2, double y2, float epaisseur){
        this->toMapping(&x1,&y1);
        this->toMapping(&x2,&y2);
        string requete = "droite," + to_string((int)x1) + "," + to_string((int)y1) + "," + to_string((int)x2) + "," + to_string((int)y2) + "," + to_string((int)epaisseur) ;
        Envoye(requete);
    }

    void RempliRectangle(double x,double y, double w, double h){
        this->toMapping(&x,&y);
        string requete = "rectangle," + to_string((int)x) + "," + to_string((int)y) + "," + to_string((int)(w*this->multi)) + "," + to_string((int)(h*this->multi))+",fill" ;
        Envoye(requete);     
    }
    void DessineRectangle(double x,double y, double w, double h){
        this->toMapping(&x,&y);
        string requete = "rectangle," + to_string((int)x) + "," + to_string((int)y) + "," + to_string((int)(w*this->multi)) + "," + to_string((int)(h*this->multi)) ;
        Envoye(requete);
    }

    void DessineCercle(double x,double y, double rayon){
        this->toMapping(&x,&y);
        string requete = "cercle," + to_string((int)x) + "," + to_string((int)y) + "," + to_string((int)rayon*2) + "," + to_string((int)rayon*2) ;
        Envoye(requete);
    }
    
    void DessineTexte(double x,double y, string texte){
        this->toMapping(&x,&y);
        string requete = "text," + texte + "," + to_string((int)x) + "," + to_string((int)y) ;
        Envoye(requete);
    }

    void Envoye(string req){
        req = req +"\r\n";
        send(this->sock, req.c_str(), req.length(), 0);
        //Sleep(1);
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

#endif
