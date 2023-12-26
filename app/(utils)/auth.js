import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10)
  return bcryptjs.hash(password, salt)
}

export const comparePassword = async (password, hashPassword) => {
  return bcryptjs.compare(password, hashPassword)
}

export const generateToken = (payload) => {
  try {
    console.log(process.env.JWT_SECRET)
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "4h"
    })
  } catch (error) {
    console.error(error)
    throw error;
  }
}