// /pages/api/login.ts

import type { NextApiRequest, NextApiResponse } from 'next'

interface User {
  email: string
  password: string
}

const users: User[] = [
  {
    email: "user@example.com", // Replace with your user data source
    password: "password123",    // Ensure you're securely storing passwords in production (hashed)
  },
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body

    // Simple validation (use proper validation and hashing in production)
    const user = users.find((user) => user.email === email && user.password === password)

    if (user) {
      // Return a success response (set up a session or token here if needed)
      return res.status(200).json({ message: "Login successful", token: "fake-jwt-token" })
    } else {
      return res.status(401).json({ message: "Invalid email or password" })
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" })
  }
}
