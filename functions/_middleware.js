export async function onRequest(context) {
  const url = new URL(context.request.url);

  // 🔐 protege SOMENTE o site florianacoach inteiro
  const isFlorianaCoachSite =
    url.hostname === "florianacoach.pages.dev";

  // se não for esse site, deixa passar (caso use monorepo depois)
  if (!isFlorianaCoachSite) {
    return context.next();
  }

  const USER = "Floriana";
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
