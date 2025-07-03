rrGracias por reenviar las fotos. Ahora que revisé cuidadosamente toda la documentación interna de AXA IM y el mensaje del lead dev, te resumo exactamente lo que tienes que hacer paso por paso para que Git funcione correctamente detrás del proxy ZScaler.


---

✅ Objetivo

Permitir que Git funcione correctamente en el entorno de AXA, que usa un proxy ZScaler y requiere certificado raíz personalizado.


---

🧭 PASOS COMPLETOS (según la documentación interna de AXA IM)


---

① Configurar Git con proxy, backend SSL y usuario

Ejecuta estos comandos en Git Bash o CMD:

git config --global http.proxy http://127.0.0.1:9000/localproxy.pac
git config --global http.sslbackend openssl
git config --global http.sslverify false

git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@axa-im.com"

⚠️ Cambia "Tu Nombre" y el email por los tuyos reales.


---

② Instalar el certificado ZScaler (CA root)

1. Exporta el certificado desde el navegador:

Abre el sitio web https://dev.azure.com desde Microsoft Edge o Chrome.

Haz clic en el candado de la barra de direcciones.

Ve a Certificado > Ruta de certificación.

Selecciona ZScaler Root CA o ZScaler Intermediate Root CA.

Haz clic en "Copier dans un fichier...".

Elige Base-64 codé X.509 (.CER).

Guárdalo como: zsroot.cer.



2. Abre este archivo con Notepad y copia todo su contenido.


3. Ve a esta ruta:

C:\Program Files\Git\mingw64\ssl\certs\ca-bundle.crt

⚠️ Necesitarás permisos de administrador.


4. Pega el contenido del .cer al final del archivo ca-bundle.crt.




---

③ Verifica la configuración final

Corre esto:

git config --global --list

Y deberías ver algo así:

http.proxy=http://127.0.0.1:9000/localproxy.pac
http.sslbackend=openssl
http.sslverify=false
user.name=Arley Romero
user.email=arley.romero@axa-im.com


---

④ Diagnóstico si sigue fallando

Ejecuta este modo verbose para capturar errores exactos:

set GIT_TRACE_PACKET=1
set GIT_TRACE=1
set GIT_CURL_VERBOSE=1

git clone https://dev.azure.com/axa-im/path/to/repo 2> clone-error.txt


---

🟦 Variables de entorno (opcional según el lead)

Además de la config de Git, si te pidieron configurar variables de entorno del sistema, añade estas en Variables d’environnement de Windows:

HTTP_PROXY → http://127.0.0.1:9000

HTTPS_PROXY → http://127.0.0.1:9000



---

✅ Script .bat automático

Si quieres, puedo prepararte un script .bat que:

Configura Git.

Te abre el archivo ca-bundle.crt para que pegues el certificado fácilmente.


¿Te lo preparo?

