import jwt from 'jsonwebtoken'

export default new class TokenOptions {
  createToken (data: string) {
    return jwt.sign({ id: data }, process.env.TOKEN_KEY!, { expiresIn: '2h' })
  }
}()
