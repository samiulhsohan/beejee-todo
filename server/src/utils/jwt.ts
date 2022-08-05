import jwt from 'jsonwebtoken'

export function generateToken(id: number, username: string) {
  return jwt.sign({ id, username }, process.env.JWT_SECRET)
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET)
}
