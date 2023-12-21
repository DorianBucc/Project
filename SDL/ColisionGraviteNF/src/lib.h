#ifndef LIB_H_
#define LIB_H_

#include <stdio.h>
#include <stdlib.h>
//#include <SDL2/SDL_image.h>
#include <SDL2/SDL.h>
//#include <pthreads/pthread.h>
#include <windows.h>
//#include <threadpoolapiset.h>

#define TCASE 133
#define TBILLE 60
#define DimWinW 1000
#define DimWinH 500

// typedef struct Dimension
// {
//     int w;
//     int h;
// } Struct_Dimension;

typedef struct Position
{
    int x;
    int y;
} Struct_Position;

typedef struct SDL_Circle
{
    int x;
    int y;
    int w;
} SDL_Circle;

typedef struct Vector
{
    int x;
    int y;
}Vector;

typedef struct Bille
{
    Struct_Position position;
    int velocity;
    int acceleration;
    Vector vector;

} Bille;


void SDL_ExitWithError(const char* text);
void DisplayTexture(Struct_Position pos,SDL_Texture* texture,SDL_Renderer* rendu);
void SDL_DrawnCircle(SDL_Renderer* rendu, SDL_Circle circle);
void SDL_DrawnCircleFill(SDL_Renderer* rendu,SDL_Circle circle);
void move(Bille* bille);
DWORD WINAPI ThreadFunction0(LPVOID lpParam);
DWORD WINAPI ThreadFunction1(LPVOID lpParam);
#endif

/*
#include <stdio.h>
#include <string.h>
#include <windows.h>

// Fonction qui sera exécutée dans le thread
DWORD WINAPI ThreadFunction(LPVOID lpParam) {
    for (int i = 0; i < 5; i++) {
        printf("%s%i\n","Thread: ",i);
        Sleep(1000);  // Pause d'une seconde
    }
    return 0;
}

int main() {
    HANDLE hThread;
    DWORD threadId;

    // Créer un thread
    hThread = CreateThread(NULL, 0, ThreadFunction, NULL, 0, &threadId);
    
    if (hThread == NULL) {
        puts("Impossible de créer le thread.\n");
        return 1;
    }
    puts("11111");
    Sleep(1000);  // Pause d'une seconde
    puts("22222");
    // Attendre la fin du thread
    WaitForSingleObject(hThread, INFINITE);

    // Fermer la poignée du thread
    CloseHandle(hThread);

    puts("Le thread a terminé son exécution.");

    return 0;
}
*/