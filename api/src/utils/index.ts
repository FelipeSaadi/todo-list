import JWT from 'jsonwebtoken'

export const generateToken = (id: string, email: string) => {
  return JWT.sign(
    { id, email },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: '2h' }
  )
}