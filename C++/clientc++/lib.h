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

#endif
