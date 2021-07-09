import { Component, OnInit } from '@angular/core';
import { Brand } from '../models/Brand';
import { BrandService } from '../services/brand/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brands: Brand[];
  

  constructor(private brandService: BrandService) {  }

  ngOnInit(): void {
    this.getBrands();
    
  }
    

  getBrands(): void {
    this.brandService.getBrands().subscribe(brands => this.brands = brands);
  
  }

}
