#include "lib.h"

void move(Bille* bille){
    
    
    if(DimWinH-TBILLE < bille->position.y)
    {
        bille->vector.y *= -1;
    }
    else if(bille->position.y < 0)
    {
        bille->vector.y *= -1;
    }
    if(DimWinW-TBILLE < bille->position.x)
    {
        bille->vector.x *= -1;
    }
    else if(bille->position.x < 0)
    {
        bille->vector.x *= -1;
    }
    bille->position.x += bille->velocity*bille->vector.x;
    bille->position.y += bille->velocity*bille->vector.y;
    
}

// void display(void* pMyID){
//     wchar_t MyCell, OldCell;
//     WORD    MyAttrib, OldAttrib = 0;
//     wchar_t BlankCell = 0x20;
//     COORD   Coords, Delta;
//     COORD   Old = { 0,0 };
//     DWORD   Dummy;
//     int MyID = (int)(uintptr_t)pMyID;
// }
