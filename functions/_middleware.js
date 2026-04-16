export async function onRequest(context) {
  const url = new URL(context.request.url);

  // 🔒 só protege a pasta /fifa2026
  const isProtectedRoute = url.pathname.startsWith("/florianacoach");

  // se NÃO for essa pasta, deixa passar direto
  if (!isProtectedRoute) {
    return context.next();
  }

  // 👇 proteção só para /florianacoach
  const USER = "FLORIANA";
  const PASS = "COACHDOANO";

  const auth = context.request.headers.get("Authorization");

  const expected =
    "Basic " + btoa(`${USER}:${PASS}`);

  if (auth === expected) {
    return context.next();
  }

  return new Response("Auth required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Private Area"',
    },
  });
}
