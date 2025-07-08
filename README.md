

Te hago un resumen completo del documento "AIFMD Prime – Target Solution" de AXA Investment Managers, con una explicación clara de los objetivos, contexto y planificación del proyecto:


---

📝 Resumen General – AIFMD Prime Target Solution

📌 Objetivo del Proyecto

Migrar el proceso actual de reporting AIFMD desde la solución existente hacia una nueva solución objetivo (Target Solution) basada en el sistema ARRakis y la base de datos STR, mejorando automatización, calidad de datos y reduciendo tareas manuales.


---

📘 1. Contexto

Un módulo “Prime” ya existe en la versión actual de STR.

Se busca reutilizarlo y migrar los datos de ARRakis como fuente principal para posiciones, pasivos, transacciones y rendimiento.

Se dividirá en 2 lotes: el primero en septiembre de 2025 (sin derivados).



---

📎 2. Supuestos (Assumptions)

Datos disponibles en ARRakis:

Posiciones, pasivos, liquidez, indicadores de riesgo, leverage.

Algunos endpoints deben crearse o mejorarse en colaboración con el equipo técnico Prime.


Atributos claves incluidos:

ISIN, valor de mercado, país legal, ratings (S&P, Fitch), etc.

Endpoints nuevos para rendimientos y transacciones (por fondo).


Referenciales:

Mapeo por tipo de instrumento.

Segmentación por tipo de inversor profesional y subsegmentos AIFMD.


Sin proveedores externos ni fondos NPPR (fuera del perímetro Prime).



---

💰 3. Estimación de Costes

Total estimado:

BA (Business Analyst): 30 md

Dev (Desarrolladores): 88 md

Costo total estimado: 118 md / 88.5k€


Costo validado hasta ahora: 60k€

Actividades destacadas:

Crear endpoints en ARRakis

Integración con STR (posiciones, pasivos, etc.)

Adaptar código de reporting AIFMD




---

🧩 4. User Stories

Una serie de User Stories detallan tareas como:

Crear directorio Active Directory.

Crear endpoints para ARRakis (posiciones, rendimiento, transacciones).

Integrar datos en STR.

Adaptar reporting AIFMD.

Actualizar documentación y guías de usuario.



---

📅 5. Planificación (Roadmap)

Actividades planificadas por trimestre entre Q2 y Q3 2025.

Mayo – junio: trabajos técnicos de API ARRakis.

Julio – agosto: integración en STR y adaptaciones del código.

Septiembre: pruebas, formación de usuarios, validaciones finales.

Incluye fase de Go / No Go antes del despliegue final.



---

📌 6. Fondos Prime ya disponibles

En SCD ya están disponibles los siguientes fondos Prime:

AXA Japan Global Alternative Investment Fund

AXA Japan Legacy Global Alternative Investment Fund

AXA IM Prime NAVFI SCSp, SICAV-RAIF – NAV Financing Fund



---

¿Quieres ahora que te lo resuma en francés o en inglés también? ¿O esperas las otras 2 imágenes para completar el análisis?

git config --global http.proxy http://127.0.0.1:9000/localproxy.pac

git config --global --unset http.proxy
