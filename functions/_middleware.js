export async function onRequest(context) {
  const url = new URL(context.request.url);

  // 🔐 só protege essa página específica
  const isProtectedPage =
    url.pathname === "/florianacoach" ||
    url.pathname.startsWith("/florianacoach/");

  // se NÃO for essa página, deixa passar
  if (!isProtectedPage) {
    return context.next();
  }

  // 👇 proteção só para florianacoach
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
