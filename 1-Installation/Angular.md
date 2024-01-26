## Angular

Src : [lien](https://angular.fr/get_started/installation.html), [problem](https://www.c-sharpcorner.com/article/how-to-fix-ps1-can-not-be-loaded-because-running-scripts-is-disabled-on-this-sys/)

1. Installer Angular/cli.
> `npm install -g @angular/cli`

Si vous avez un problème du type :

```
ng.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
```

- > `set-ExecutionPolicy RemoteSigned -Scope CurrentUser`

- > `Get-ExecutionPolicy`

- > `Get-ExecutionPolicy -list`


2. Créer une projet.
> `ng new nomProjet`
> `ng new nomProjet --no-standalone --routing --ssr=false`

3. Lancer le projet.

Ensuite rentré dans le projet et taper `ng serve` pour le lancer en serveur en *http://localhost:4200* ou `ng serve --port 4300` en 4300 par exemple.