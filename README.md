
C’est étrange parce que je vois que la version 1, la V1, de l’API Portefeuille est en breakage. Mais dans EARNEST, ils utilisent la V1. Et ici, je la vois en breakage dans Swagger. C’est normal ?
host.json

Estás viendo la documentación Swagger de una Web API interna de AXA IM (concretamente /api/main/portfolios) y cuando haces clic en "Authorize", se abre una ventana para la autenticación mediante OAuth2 con PKCE (Proof Key for Code Exchange), un método seguro para aplicaciones sin backend (como clientes web).


---

🔐 ¿Qué es lo que estás viendo?

Esta ventana es para autorizarte como usuario para poder hacer pruebas o consumir endpoints protegidos en esa API. Estás viendo una configuración de autenticación con:

OAuth 2.0 (PKCE): Un flujo seguro que no requiere client_secret, pensado para aplicaciones cliente (por eso te dice "leave client_secret blank").

Authorization URL y Token URL: URLs de Microsoft que manejan el login y la entrega del token de acceso.

client_id: Es un identificador público de la aplicación registrada en Azure AD.

Scope: En este caso: user_impersonation para la API de https://axaim.omnicrosoft.com/...



---

✅ ¿Qué tienes que hacer?

Si estás autorizado a usar esta API como usuario interno de AXA IM, lo que debes hacer normalmente es:

1. Hacer clic en el botón verde Authorize (en la ventana emergente).


2. Esto redirigirá a la página de login de Microsoft (SSO corporativo).


3. Inicias sesión con tu cuenta profesional de AXA (ej. prenom.nom@axa-im.com).


4. Una vez autenticado, Swagger obtendrá un access token válido y podrás usar los endpoints como el POST /v1/benchmarks/characteristics.




---

⚠️ Si no funciona o da error:

Asegúrate de estar conectado a la red corporativa AXA o VPN.

Tienes que estar registrado como usuario autorizado en Azure AD para esa API.

Si no estás autorizado, tendrás que pedir acceso a la DataPlatform Support (hay un enlace en la documentación).



---

📌 En resumen:

No tienes que escribir nada en esa ventana. Solo:

1. Deja el client_secret en blanco.


2. Dale a Authorize.


3. Inicia sesión con tu cuenta corporativa.



Y listo, estarás autenticado para probar los endpoints.

¿Quieres que te ayude a hacer una prueba con el endpoint POST /v1/benchmarks/characteristics?

Perfecto, gracias por compartir las capturas. Te explico paso a paso cómo funciona la parte Ágil en Azure DevOps, especialmente en Boards, User Stories, y Sprints, para que puedas orientarte mejor (aunque vengas de JIRA, los conceptos son similares):


---

🧩 Conceptos clave en Azure DevOps (Agile)

📘 1. Work Item

Es cualquier tarea o elemento de trabajo que se necesita seguir en el proyecto. Puede ser:

User Story: Lo que un usuario quiere hacer (como en JIRA).

Bug: Un error o defecto.

Task: Subtareas que se dividen desde una historia.

Epic: Gran funcionalidad o agrupación de historias.

Feature: Un conjunto de funcionalidades (puede contener User Stories).


📌 Aparece en tus pantallas como una lista con columnas: ID, Title, Assigned To, State, etc.


---

👤 2. User Story

Representa una funcionalidad o requerimiento desde el punto de vista del usuario. Por ejemplo:

> "As a P&R analyst, I want the LEI Name to be retrieved"



Esto indica qué quiere hacer el usuario, para qué, y por qué.

💡 Equivalente a una "Story" en JIRA.


---

📅 3. Sprint

Un periodo de tiempo fijo (usualmente 2 semanas) donde se planifican y completan ciertos work items (historias, bugs, tareas).

En tus capturas vemos por ejemplo:

Sprint 25.2.3 (16 juin - 4 juillet)
→ Este sprint está activo ahora.



---

🗂️ 4. Boards

Es el tablero visual (tipo Kanban) donde ves las historias divididas por columnas de estado:

New, Ready, Active, Resolved, On-Hold, Closed


Permite mover las historias de una columna a otra según su progreso, igual que en JIRA.


---

📥 5. Backlog

Lista priorizada de todas las historias pendientes. Desde allí puedes:

Ver todas las historias no asignadas a un sprint.

Reordenarlas.

Arrastrarlas a un sprint futuro.


📌 En tu imagen se ve: Planning > Sprint 25.2.3 (16/06–04/07).


---

👥 6. Asignación

Cada historia o tarea está asignada a alguien. Ejemplo:

"DIDENKO Danil", "MOTA GOMES William", "OGOR Anna"


Puedes filtrar por personas para ver tu propio trabajo.


---

🧭 ¿Cómo usarlo tú como dev?

Aquí va una mini-guía rápida:

1. Ir a Boards > Backlog
→ Ahí verás todas las historias priorizadas.


2. Sprint actual
→ Ve a Boards > Sprints > Taskboard, selecciona el sprint actual (por fechas), y verás tu trabajo.


3. Mover historias o tareas
→ Desde el Taskboard, puedes cambiar el estado arrastrando los elementos entre columnas (New → Active → Resolved...).


4. Crear tareas
Dentro de una historia, puedes crear tareas (Tasks) para dividir el trabajo.




---

🛠️ ¿Qué diferencia hay con JIRA?

Concepto	Azure DevOps	JIRA

Historia	User Story	Story
Tarea	Task	Sub-task / Task
Épica	Epic	Epic
Sprint	Sprint (en Boards)	Sprint (en Scrum Board)
Tablero Kanban	Board (Taskboard)	Kanban Board
Backlog general	Backlogs	Product Backlog



---

¿Quieres que te haga un esquema visual con flechas explicando cómo se conecta todo eso (backlog → sprint → tareas → estado)?
¿O prefieres que lo conecte a tus capturas?


