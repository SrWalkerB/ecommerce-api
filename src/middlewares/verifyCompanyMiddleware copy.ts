import { Request, Response, NextFunction } from 'express'
import CompanyData from '../data/company/CompanyData'
import TokenOptions from '../utils/TokenOptions'

const verifyCompany = async (req: Request, resp: Response, next: NextFunction) => {
  const token = TokenOptions.removeBearer(req)
  const { id } = TokenOptions.verifyToken(token!).msg
  const searchID = await CompanyData.searchId(id)

  if (searchID.length === 0) {
    return resp.status(404).json({ message: 'company not found' })
  }

  next()
}

export {
  verifyCompany
}
