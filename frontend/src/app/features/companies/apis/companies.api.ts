import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Company } from '../models/companies.model';

@Injectable()
export class CompaniesApi {
  constructor(private apiService: ApiService) {}

  getAllCompanies(userId: string) {
    return this.apiService.get<Company[]>(`companies?userId=${userId}`);
  }

  createCompany(company: Partial<Company>) {
    return this.apiService.post<Company>('companies', company);
  }

  updateCompany(id: string, company: Partial<Company>) {
    return this.apiService.put<Company>('companies', { id, ...company });
  }

  deleteCompany(id: string) {
    return this.apiService.delete<Company>(`companies?companyId=${id}`);
  }
}
