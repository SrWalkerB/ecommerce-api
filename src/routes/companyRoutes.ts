import { Router } from 'express'
import CompanyController from '../controllers/CompanyController'

const company = Router()

company.post('/company', CompanyController.createCompany)

export default company
