import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/app/(database)/db";
const Users = require('@/app/(database)/(schema)/Users');
import { hashPassword, comparePassword, generateToken } from "@/app/(utils)/auth";

connectDB()

export async function POST(request) {
  const req = await request.json()
  const { action, username, password } = req

  if (action == 'register') {
    try {
      const hashedPassword = await hashPassword(password)
      const user = new Users({ username, password: hashedPassword })
      await user.save()
      return NextResponse.json({ message: "No register internal error found" })
    } catch (error) {
      return NextResponse.json({ error: 'Registration internal error'})
    } 
  } else if (action === 'login') {
    try {
      const user = await Users.findOne({ username })
      if (!user) {
        return NextResponse.json({ error: 'Invalid username or password' })
      }

      const passwordMatch = await comparePassword(password, user.password)
      if (!passwordMatch) {
        return NextResponse.json({ error: 'Invalid username or password' })
      }

      const token = generateToken({ userId: user._id, username: user.username })
      return NextResponse.json({ token, username: user.username }, { message: 'Token generated' })
    } catch (error) {
      return NextResponse.json({ error: 'Login internal error' })
    }
  } else {
    return NextResponse.json({ error: 'Invalid action' })
  }

  // if (NextRequest.method == "POST") {
  //   const { action, username, password } = NextRequest.body

  //   if (action === 'register') {
  //     try {
  //       const hashedPassword = await hashPassword(password)
  //       const user = new Users({ username, password: hashedPassword })
  //       await user.save()

  //       const token = generateToken({ userId: user._id, username: user.username })
  //       NextResponse.status(201).json({ token })
  //     } catch (error) {
  //       NextResponse.status(200).json({ error: 'Registration failed' })
  //     }
  //   } else if (action === 'login') {
  //     try {
  //       const user = await Users.findOne({ username })
  //       if (!user) {
  //         return NextResponse.status(401).json({ error: 'Invalid credentials' })
  //       }

  //       const passwordMatch = await comparePassword(password, user.password)
  //       if (!passwordMatch) {
  //         return NextResponse.status(401).json({ error: 'Invalid credentials' })
  //       }

  //       const token = generateToken({ userId: user._id, username: user.username })
  //       NextResponse.status(200).json({ token })
  //     } catch (error) {
  //       NextResponse.status(500).json({ error: 'Login failed' })
  //     }
  //   } else {
  //     NextResponse.status(400).json({ error: 'Invalid action' })
  //   }
  // } else {
  //   NextResponse.status(405).end()
  // }
}