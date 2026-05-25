import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableComponent } from '../../../components/table/containers/table.component';
import { TotalizerComponent } from '../../../components/totalizer/containers/totalizer.component';
import { ModalComponent } from '../../../components/modal/containers/modal.component';
import { CompanyModalComponent } from '../components/company-modal/company-modal.component';
import { CompaniesFacade } from '../facades/companies.facade';
import { CompaniesApi } from '../apis/companies.api';
import { Company, COMPANIES_COLUMNS } from '../models/companies.model';

@Component({
  imports: [
    CommonModule,
    TableComponent,
    TotalizerComponent,
    ModalComponent,
    CompanyModalComponent,
  ],
  selector: 'feature-companies',
  templateUrl: './companies.component.html',
  providers: [CompaniesFacade, CompaniesApi],
})
export class CompaniesComponent implements OnInit {
  public open: boolean = false;
  public companyFormGroup!: FormGroup;
  public columns = COMPANIES_COLUMNS;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public companiesFacade: CompaniesFacade,
  ) {}

  ngOnInit(): void {
    this.companyFormGroup = this.formBuilder.group({
      id: [null],
      name: [''],
      cnpj: [''],
    });
    this.companiesFacade.getAllCompanies();
  }

  openCreateCompany(): void {
    this.companyFormGroup.reset({ id: null, name: '', cnpj: '' });
    this.open = true;
  }

  openEditCompany(company: Company): void {
    this.companyFormGroup.patchValue(company);
    this.open = true;
  }

  submitCompany(): void {
    const { id, ...payload } = this.companyFormGroup.value;
    if (id) {
      this.companiesFacade.updateCompany(id, payload);
    } else {
      this.companiesFacade.createCompany(payload);
    }
    this.open = false;
  }

  deleteCompany(company: Company): void {
    this.companiesFacade.deleteCompany(company.id);
  }
}
