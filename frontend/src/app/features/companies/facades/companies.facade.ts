import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CompaniesApi } from '../apis/companies.api';
import { Company } from '../models/companies.model';
import { TokenService } from '../../../services/token.service';

@Injectable()
export class CompaniesFacade {
  public companies$: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);
  public count$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private companiesApi: CompaniesApi,
    private tokenService: TokenService,
  ) {}

  getAllCompanies(): void {
    const userId = this.tokenService.decodeToken()?.userId ?? '';
    this.companiesApi.getAllCompanies(userId).subscribe((response) => {
      if (response.data) {
        this.companies$.next(response.data);
        this.count$.next(response.count || response.data.length);
      }
    });
  }

  createCompany(company: Partial<Company>): void {
    this.companiesApi.createCompany(company).subscribe(() => {
      this.getAllCompanies();
    });
  }

  updateCompany(id: string, company: Partial<Company>): void {
    this.companiesApi.updateCompany(id, company).subscribe(() => {
      this.getAllCompanies();
    });
  }

  deleteCompany(id: string): void {
    this.companiesApi.deleteCompany(id).subscribe(() => {
      this.getAllCompanies();
    });
  }
}
