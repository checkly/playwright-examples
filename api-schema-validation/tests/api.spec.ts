import { expect, test } from "@playwright/test";
import { z } from "zod";

const id = "9f6beeba-6791-4ee6-a2d8-d0c1730e1cef";

test("[Basic] GET API call has a valid response", async ({
  request,
}) => {
  const response = await request.get(`/?id=${id}`);
  const body = await response.json();

  await expect(response).toBeOK();
  expect(body).toMatchObject({
    id,
    name: "Check Lee",
  });
});

test("[Basic] POST API call has a valid response schema", async ({
  request,
}) => {
  const name = "Check Lee";
  const response = await request.post(`/`, {
    data: {
      name,
    },
  });
  const body = await response.json();

  await expect(response).toBeOK();

  expect(body).toMatchObject({
    name,
    id: expect.any(String),
  });
});

test("[Complex] API call has a valid response schema", async ({
  request,
}) => {
  const response = await request.get(`/complex`);
  const body = await response.json();
  await expect(response).toBeOK();

  const schema = z.object({
    id: z.string(),
    name: z.string(),
    relatedPeople: z
      .array(z.object({ name: z.string(), id: z.string() }))
      .or(z.null()),
  });

  expect(() => {
    schema.parse(body);
  }).not.toThrow();

  // {
  //   "id": String,
  //   "name": String,
  //   "relatedPeople": [
  //     {
  //       "id": String,
  //       "name": String
  //     },
  //     ...
  //   ] or null
  // }
});
