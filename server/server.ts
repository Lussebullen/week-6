import { z } from "zod";
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

const userSchema = z.object({
  name: z.string().min(3).max(12),
  age: z.number()
  .min(18, { message: "Age must be at least 18" })
  .max(100, { message: "Age must be less than 100" })
  .optional()
  .default(28),
  email: z.email().toLowerCase(),
});

const randomUserResponseSchema = z.object({
  results: z.array(
    z.object({
      name: z.object({
        first: z.string(),
        last: z.string()
      }),
      location: z.object({
        country: z.string()
      })
    })
  )
});

app.get("/random-person", async (req, res) => {
  try {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();

    const validatedRandomUser = randomUserResponseSchema.safeParse(data);
    if (!validatedRandomUser.success) {
      return res.status(500).json({
        error: "Invalid users data from Randomuser API",
        details: validatedRandomUser.error,
      });
    }

    const randomUser = validatedRandomUser.data.results[0];
    return res.json({
      name: `Name: ${randomUser.name.first} ${randomUser.name.last}`,
      country: `Country: ${randomUser.location.country}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch random user data" });
  }
});

app.get("/ping", async (req, res) => {
    res.status(200).json({ message: "Pong (the server is up and running)" });
  });

  app.post("/users", (req, res) => {
  const validatedNewUser = userSchema.safeParse(req.body);
  if (!validatedNewUser.success) {
    return res.status(400).json({ error: "Invalid users data", details: validatedNewUser.error });
  } else {
    res.status(201).json({ message: "User created successfully", user: validatedNewUser.data });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});