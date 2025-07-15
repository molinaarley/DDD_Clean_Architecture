
Sí, pero imagínate, yo tengo un controller donde tengo un endpoint que yo mismo desbloqueé. Es ese endpoint que yo quiero testear. Ese endpoint va a llamar al mismo tiempo al interior del endpoint una API externa. Entonces quiere decir que desde mi test de integración yo quisiera llamar al endpoint mío del controller y que él llame la API. Quiere decir que a mi endpoint yo le voy a pasar los mismos portafolios. O quizás yo le pase, por ejemplo, una transa de 300 portafolios. Eso lo puedo hacer. Aunque yo, por ejemplo, en la parte de test de integración yo pase, por ejemplo, dos o tres portafolios nada más. Pero para mí, al local, yo podría pasar mil portafolios para probar la API en local nada más.


Sí, puedes hacer eso perfectamente y es una práctica válida para probar el rendimiento y comportamiento de tu propio endpoint (controller) en local, incluso si ese endpoint llama a una API externa internamente.

Aquí te explico cómo hacerlo correctamente:


---

✅ Tu objetivo

Tienes un controller local (MiController) con un endpoint, por ejemplo:


[HttpPost("api/mis-datos")]
public async Task<IActionResult> ProcesarPortafolios([FromBody] List<int> ids)
{
    // Lógica que llama a una API externa por dentro
}

Quieres testear este endpoint localmente con:

pocos IDs en tests automáticos (2–3 portafolios)

muchos IDs para probar performance local (1000–2000 portafolios)




---

💡 ¿Cómo hacerlo bien?

✅ 1. Crear un test de integración personalizado

Puedes crear una clase de test con HttpClient que llame a tu API local pasando los IDs desde un archivo JSON (por ejemplo: portfolios-300.json o portfolios-1000.json).

🧪 Ejemplo con xUnit

public class IntegrationPerformanceTests
{
    private readonly HttpClient _client;

    public IntegrationPerformanceTests()
    {
        // Aquí puedes apuntar al puerto de tu API local, por ejemplo 5000 o 7071
        _client = new HttpClient { BaseAddress = new Uri("https://localhost:5001/") };
    }

    [Fact(Skip = "Solo ejecución manual de performance local")]
    public async Task TestMiEndpointConMilPortafolios()
    {
        var json = await File.ReadAllTextAsync("TestData/portfolios-1000.json");
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var stopwatch = Stopwatch.StartNew();
        var response = await _client.PostAsync("api/mis-datos", content);
        stopwatch.Stop();

        var responseText = await response.Content.ReadAsStringAsync();

        Console.WriteLine($"Duración: {stopwatch.ElapsedMilliseconds} ms");
        Console.WriteLine($"Status: {response.StatusCode}");
        Console.WriteLine($"Tamaño respuesta: {responseText.Length}");

        response.EnsureSuccessStatusCode();
    }
}

✅ 2. Usar diferentes archivos JSON para distintas cargas

En tu carpeta TestData/, puedes tener:

portfolios-3.json → para test unitario/integración básico

portfolios-300.json → para test de volumen medio

portfolios-1000.json → para performance local


Ejemplo de contenido:

{
  "ids": [10001, 10002, 10003, ..., 11000]
}


---

❗ Cuidado con la API externa

Como tu endpoint llama internamente una API externa, asegúrate de lo siguiente durante las pruebas:

Caso	¿Qué hacer?

✅ En local quieres que la llamada real se haga	Ok, no cambies nada
❌ No quieres golpear la API real en ciertos tests	Usa un HttpClient mockeado o un DelegatingHandler para simular la respuesta



---

✅ Conclusión

Sí, puedes y debes:

Crear tests de integración que llamen a tu propio endpoint local.

Pasarle listas de portafolios reales (2, 300, 1000...).

Medir el tiempo de ejecución con Stopwatch.

Y hacer esto de forma manual o semi-automática para pruebas de carga local.
