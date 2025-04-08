const { faker } = require("@faker-js/faker");
const http = require("node:http");

const server = http.createServer({}, (req, res) => {
  const url = new URL(
    req.url || "/",
    "http://localhost:8080"
  );
  const id = url.searchParams.get("id");

  if (url.pathname === "/complex") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    return res.end(
      JSON.stringify({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        relatedPeople:
          Math.random() > 0.5
            ? Array.from({ length: 5 }, () => ({
                id: faker.string.uuid(),
                name: faker.person.fullName(),
              }))
            : null,
      })
    );
  }

  if (req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    return res.end(
      JSON.stringify({
        id,
        name: "Check Lee",
      })
    );
  }

  if (req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      let parsedBody;
      try {
        parsedBody = JSON.parse(body);
        console.log(parsedBody);
      } catch (e) {
        res.writeHead(400, {
          "Content-Type": "application/json",
        });
        return res.end(
          JSON.stringify({ error: "Invalid JSON" })
        );
      }

      res.writeHead(201, {
        "Content-Type": "application/json",
      });
      return res.end(
        JSON.stringify({
          id: faker.string.uuid(),
          name: parsedBody.name,
        })
      );
    });
  }
});

server.listen(8000);
