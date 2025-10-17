fff

En analysant la v2 portfolios/v2/portfolios/characteristics,
il semble logique d’utiliser "onlyLatestData": true avec isGreaterOrEqual ou isLowerOrEqual.
Mais cela provoquait une erreur, donc si "onlyLatestData": true, alors il ne faut pas mettre de date.
Il faudra ajuster un peu la logique des requêtes envoyées à l’API.

