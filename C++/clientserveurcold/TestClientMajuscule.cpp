using namespace std;

#include <winsock2.h>
#include <iostream>
#include <sstream>
#include <string>
#include <string.h>
#include "Erreur.h"
const int L = 200; //longueur max en octets de la réponse du serveur

//#pragma comment(lib, "ws2_32.lib");

int main(){
    try
    {
        //libraire winsock
    int r;
    WSADATA wsaData;

    r = WSAStartup(MAKEWORD(2, 0), &wsaData);
    if(r){
        cout << "Echec de l'initialisation" << endl;
    }

    //création d'un socket
    SOCKET sock;

    int familleAdresses = AF_INET; //IPv4
    int typeSocket = SOCK_STREAM;
    int protocole = IPPROTO_TCP;

    sock = socket( familleAdresses, typeSocket, protocole );

    if(sock == INVALID_SOCKET){
        //ostringstream oss;
        //oss << "La creation du socket a echouee : code d'erreur = " << WSAGetLastError() << endl;
        //exception("La creation du socket a echouee : code d'erreur = " + WSAGetLastError());
    }else {
        cout << "La creation du socket a reussie" << endl;
    }

    //création d'un représent local du serveur distant
    char adresseServeur[L];
    short portServeur;

    cout << "Tapez l'adresse du serveur de majuscule : " << endl;
    cin >> adresseServeur;
    cout << "Tapez le port du serveur de majuscule : " << endl;
    cin >> portServeur;

    SOCKADDR_IN sockaddr;

    sockaddr.sin_family = AF_INET;
    sockaddr.sin_addr.s_addr = inet_addr(adresseServeur); //inet_addr() convertit l'ASCII en entier
    sockaddr.sin_port = htons(portServeur); //htons() s'assure que le port est bien inscrit dans le format réseau (little-endian ou big-endian)

    //connexion au serveur
    r = connect(sock, (SOCKADDR * ) &sockaddr, sizeof(sockaddr));
    if(r == SOCKET_ERROR){
        cout << "Echec de la connexion au serveur de majuscule" << endl;
        throw Erreur("Echec de la connexion au serveur de majuscule");
        //throw exception();
    }
    cout << "Connexion au serveur de majuscule reussie" << endl;

    //envoie d'un message au serveur
    bool continuer;
    do
    {
        char requete[L];
        cout << "Afficher dans la fenetre java ?" << endl;
        cout << "1 - Une Croix (Ex: croix,posX,posY,posX2,posY2)" << endl;
        cout << "2 - Un Rectangle (Ex: rectangle,posX,posY,longueur,largeur)" << endl;
        cout << "3 - Un Cercle (Ex: cercle,posX,posY,diametre)" << endl;
        cout << "4 - Un Cercle plein (Ex: cercleplein,posX,posY,diametre)" << endl;
        cout << "5 - Une Phrase (Ex: phrase,votremessage,posX,posY)" << endl;
        cout << endl;
        cout << "Afficher votre message en majuscule dans la console ?" << endl;
        cout << "Tapez simplement une chaine de caractere ou \"quitter\" pour arreter : " << endl;
        cin >> requete;

        continuer = strcmp(requete, "quitter") != 0;
        if(continuer){
            strcat(requete, "\r\n");
            int l = strlen(requete);

            r = send(sock, requete, l, 0);
            if(r == SOCKET_ERROR){
                cout << "Echec de l'envoie de la requete" << endl;
            }

            char reponse[L];

            r = recv(sock, reponse, l, 0);
            if(r == SOCKET_ERROR){
                cout << "La reception de la reponse a echouee";//throw Erreur("La reception de la reponse a echouee");
            }

            char * p = strchr(reponse, '\n');
            *p = '\0';

            cout << reponse << endl;
        }
    } while (continuer);

    r = shutdown(sock, SD_BOTH);
    if(r){
        cout << "Echec de la coupure de connexion" << endl;
    }

    r = closesocket(sock);
    if(r){
        cout << "Echec de la fermeture du socket" << endl;
    }else {
        cout << "Arret du client sur votre demande" << endl;
    }

    WSACleanup();
    }
    catch(const Erreur e)
    {
        std::cerr << e.message << '\n';
    }

    return 0;
}