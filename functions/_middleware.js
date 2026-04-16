export async function onRequest(context) {
  const USER = "VISITOR";
  const PASS = "CANDIDATEPORTAL"; // troque isso depois

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
