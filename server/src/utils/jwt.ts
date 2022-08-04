import jwt from 'jsonwebtoken'

export function generateToken(username: string) {
  return jwt.sign({ username }, process.env.JWT_SECRET)
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET)
}
