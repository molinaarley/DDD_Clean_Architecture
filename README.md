fff
J’ai corrigé l’erreur liée au champ 142_Bail-in_Rule, mais en local je rencontre maintenant une autre erreur lors du chargement du fichier cm.csv :
SqlDateTime overflow, ce qui semble indiquer qu’il y a une date incorrecte ou hors plage dans le fichier (par exemple, une date antérieure à 1753 ou postérieure à 9999).

Est-ce que c’est quelque chose de connu ou attendu ?
Penses-tu qu’il faudrait en discuter avec le métier pour qu’ils puissent ajuster les dates dans le fichier source si nécessaire ?

Merci d’avance pour ton retour,
Arley
