# SDL

GOL = Game of life = Jeu de la vie

## Comment ajouter la SDL ?

</br>

1. Telecharger le fichier *SDL Base.zip*
2. Extraire le fichier *SDL Base.zip*, il y aura la structure du projet à avoir pour la SDL. Dans *src* mettez vos fichier source.
3. Pour inclure la SDL ajouter `#include <SDL2/SDL.h>`.
4. Pour compiler il faudra se positionner au niveau de la racine du projet.
> `gcc src/*.c -o bin/a -I include -L lib -lmingw32 -lSDL2main -lSDL2` 
5. L'executable se trouvera dans *bin/a.exe*