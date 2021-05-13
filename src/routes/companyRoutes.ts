import { Router } from 'express'
import CompanyController from '../controllers/CompanyController'
import autenticate from '../middlewares/autenticate'
import { verifyCompany } from '../middlewares/verifyCompanyMiddleware copy'

const company = Router()

company.get('/company', CompanyController.createCompany)

company.get('/company/sales/pending', autenticate.autenticate, verifyCompany, CompanyController.listMySalesPending)

export default company
