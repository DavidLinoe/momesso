import { Injectable } from '@nestjs/common';
import { CompaniesRepository } from '../repositories/companies.repository';
import { ResponseApi } from 'src/utils/models/responseApi.model';
import { Company } from 'src/database/models/company';

@Injectable()
export class CompaniesService {
  constructor(private companiesRepository: CompaniesRepository) {}

  async find(userId: string): Promise<ResponseApi<Company[] | null>> {
    if (!userId) {
      return {
        statusCode: 400,
        message: 'User ID is required',
        data: null,
      };
    }
    return await this.companiesRepository
      .find(userId)
      .then(([data, count]: [Company[], number]) => {
        return {
          statusCode: 200,
          message: 'Companies found',
          data,
          count,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message:
            'An error occurred while fetching companies: ' + error.message,
          data: null,
        };
      });
  }
  async create(company: Company): Promise<ResponseApi<Company | null>> {
    if (!company || !company.name || !company.cnpj) {
      return {
        statusCode: 400,
        message: 'Company data is required',
        data: null,
      };
    }
    return await this.companiesRepository
      .create(company)
      .then((data: Company) => {
        return {
          statusCode: 201,
          message: 'Company created',
          data,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message: 'An error occurred while creating company: ' + error.message,
          data: null,
        };
      });
  }

  async update(company: Company): Promise<ResponseApi<Company | null>> {
    if (!company || !company.name || !company.cnpj) {
      return {
        statusCode: 400,
        message: 'Company data is required',
        data: null,
      };
    }
    return await this.companiesRepository
      .update(company)
      .then((data: Company | null) => {
        if (!data) {
          return {
            statusCode: 404,
            message: 'Company not found',
            data: null,
          };
        }
        return {
          statusCode: 201,
          message: 'Company Updated',
          data,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message: 'An error occurred while updating company: ' + error.message,
          data: null,
        };
      });
  }
  async delete(companyId: string): Promise<ResponseApi<Company | null>> {
    if (!companyId) {
      return {
        statusCode: 400,
        message: 'Company ID is required',
        data: null,
      };
    }
    return await this.companiesRepository
      .delete(companyId)
      .then((data: Company | null) => {
        if (!data) {
          return {
            statusCode: 404,
            message: 'Company not found',
            data: null,
          };
        }
        return {
          statusCode: 201,
          message: 'Company deleted',
          data,
        };
      })
      .catch((error: Error) => {
        return {
          statusCode: 500,
          message: 'An error occurred while deleting company: ' + error.message,
          data: null,
        };
      });
  }
}
