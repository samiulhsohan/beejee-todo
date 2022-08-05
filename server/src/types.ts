import { Request } from 'express'

export interface RequestWithUser extends Request {
  user?: DecodedAccessToken
}

export type DecodedAccessToken = {
  id: number
  username: string
}
