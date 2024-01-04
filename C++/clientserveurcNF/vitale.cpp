using namespace std;

#include <winsock2.h>
#include <iostream>
#include <ws2tcpip.h>
#include <sstream>
#include "Erreur.h"

int main(){
    //libraire winsock
    int r;
    WSADATA wsaData;

    r = WSAStartup(MAKEWORD(2, 0), &wsaData);
    if(r){
        cout << "Echec n°1";//throw Erreur("L'initialisation a echouee");
    }else {
        cout << "L'initialisation a reussie" << endl;
    }

    //création d'un socket
    SOCKET sock;

    int familleAdresses = AF_INET; //IPv4
    int typeSocket = SOCK_STREAM;
    int protocole = IPPROTO_TCP;

    sock = socket( familleAdresses, typeSocket, protocole );

    if(sock == INVALID_SOCKET){
        ostringstream oss;
        oss << "La creation du socket a echouee : code d'erreur = " << WSAGetLastError() << endl;
        
        cout << "Echec n°2" << endl; // throw Erreur(oss.str().c_str());
    }

    //création d'un représent local du serveur distant
    const char * adresseServeur = "127.0.0.1";
    short portServeur = 1664;

    SOCKADDR_IN sockaddr;

    sockaddr.sin_family = AF_INET;
    sockaddr.sin_addr.s_addr = inet_addr(adresseServeur); //inet_addr() convertit l'ASCII en entier
    sockaddr.sin_port = htons(portServeur); //htons() s'assure  le port est bien inscrit dans le format réseau (little-endian ou big-endian)

    //connexion au serveur
    r = connect(sock, (SOCKADDR * ) &sockaddr, sizeof(sockaddr));
    if(r == SOCKET_ERROR){
        cout << "Echec n°3"; //throw Erreur("La connexion a echouee");
    }

    //envoie d'un message au serveur
    const char * requete = "bonjour \r\n";
    int l = strlen(requete);

    r = send(sock, requete, l, 0);
    if(r == SOCKET_ERROR){
        cout << "echec de l'envoie de la requete" << endl;//throw Erreur("echec de l'envoie de la requete");
    }

    //réception d'un message
    const int L = 200; //longueur max en octets de la réponse du serveur

    int taille = L-1;
    char reponse[L];

    r = recv(sock, reponse, taille, 0);
    if(r == SOCKET_ERROR){
        cout << "La reception de la reponse a echouee";//tthrow Erreyr("La reception de la reponse a echouee");
    }

    char * p = strchr(reponse, '\n');
    *p = '\0';

    cout << reponse << endl;
    return 0;
}