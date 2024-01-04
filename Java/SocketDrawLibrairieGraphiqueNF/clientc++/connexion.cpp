#include "lib.h"
SOCKET Connexion(string addr,unsigned short* port)
{
    bool continu = true;
    while (continu)
    {
        try
        {
            //libraire winsock
            int r;
            WSADATA wsaData;
            r = WSAStartup(MAKEWORD(2, 0), &wsaData);

            if(r){
                throw Erreur("Echec de l'initialisation");
            }
            //création d'un socket
            SOCKET sock;

            int familleAdresses = AF_INET; //IPv4
            int typeSocket = SOCK_STREAM;
            int protocole = IPPROTO_TCP;

            sock = socket( familleAdresses, typeSocket, protocole );

            if(sock == INVALID_SOCKET) throw Erreur("La creation du socket a echouee : code d'erreur = " + WSAGetLastError());
            // cout << "La creation du socket a reussie\n";

            //création d'un représent local du serveur distant
            SOCKADDR_IN sockaddr;

            sockaddr.sin_family = AF_INET;
            sockaddr.sin_addr.s_addr = inet_addr(addr.c_str()); //inet_addr() convertit l'ASCII en entier
            sockaddr.sin_port = htons(*port); //htons() s'assure que le port est bien inscrit dans le format réseau (little-endian ou big-endian)

            //connexion au serveur
            r = connect(sock, (SOCKADDR * ) &sockaddr, sizeof(sockaddr));
            if(r == SOCKET_ERROR){
                throw Erreur("Echec de la connexion au serveur de majuscule");
            }
            // cout << "Connexion au serveur de majuscule reussie\n";

            return sock;
        }
        catch(const Erreur e)
        {
            
            
            if(strcmp(e.message,"Echec de la connexion au serveur de majuscule") == 1){
                system("start start.bat");
                Sleep(1500);
            }
            else{
                continu = false;
                cerr << e.message << '\n';
            }
            
        }
    }
    return SOCKET_ERROR;
}