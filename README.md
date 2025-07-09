
Bonjour Boris,

Pour le projet Deloitte > Confluence, j’ai grossièrement esquissé l’architecture, pourrais-tu me donner ton avis ?

1. Une Azure Function Timer (ou Durable Function dans le cas où l’on décide d’éviter l’appel à l’API STR)


2. Call HTTP POST Web App STR


3. Construction / génération du fichier dans le contrôleur de la Web App STR


4. Envoi du fichier vers le Blob Storage


5. Azure Function déclenchée une fois le fichier ajouté dans le Blob Storage → éventuel envoi de mail, ajout du fichier à l’historique, etc.


6. Les données récupérées depuis la DataPlateforme : je ne sais pas s’il est nécessaire de les insérer dans la base BD_STR, étant donné que nous avons déjà envoyé le fichier .csv contenant ces données.
