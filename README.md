test  
En regardant la configuration du projet, j’ai vu qu’un environnement dev est bien défini dans le fichier angular.json, avec un remplacement du fichier environment.ts par environment.dev.ts.

Si je comprends bien, pour utiliser cet environnement, il faudrait lancer l’application avec :

ng serve --configuration=dev

Mais actuellement, lorsque je fais cela, j’ai un message d’erreur :

Configuration 'dev' is not set in the workspace

Pourtant, l’environnement dev est bien présent dans la section fileReplacements de angular.json. Est-ce qu’il manquerait une ligne pour que cette configuration soit reconnue ?

De plus, j’ai remarqué que l’URL définie dans apiUrl de l’environnement dev retourne une erreur 404 (voir capture jointe).

Est-ce que cela signifie que l’API en environnement dev n’est pas (ou plus) déployée ? Ou faut-il utiliser une autre URL pour les tests en local ?
