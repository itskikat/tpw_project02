import {Component, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'; 
import {MatSidenav} from '@angular/material/sidenav';
import { Emitters } from '../emitters/emitters';
// SERVICE
import { LogoutService } from '../services/logout/logout.service';
import { CheckAuthUserService } from '../services/check-auth-user/check-auth-user.service';
import { GetUserTypeService } from '../services/get-user-type/get-user-type.service';
// MODEL
import { Brand } from '../models/Brand';
// CHILD - DIALOG
import { MatDialog  } from '@angular/material/dialog';
import { DialogBodyAccountComponent } from '../dialog-body-account/dialog-body-account.component';
import { Category } from '../models/Category';
import { CategoryService } from '../services/category/category.service';
import { BrandService } from '../services/brand/brand.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {
  message = '';
  @ViewChild('drawer') sidenav: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  authenticated: boolean;
  error: boolean | undefined;
  username: string;
  user_id: number;
  is_customer: boolean;
  category_id: boolean = false;
  categories: Category[];
  brand_id: boolean = false;
  brands: Brand[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient,
    private logoutService: LogoutService,
    private checkAuthUserService: CheckAuthUserService,
    private getUserTypeService: GetUserTypeService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog
  ) 
  {
    this.authenticated = false;
    this.is_customer = true;
  }

  ngOnInit(): void {
    this.subscribeToEmitters();
    this.checkAuthUserService.check();
    this.getCategories();
    this.getBrands();
  }

  subscribeToEmitters() {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );

    Emitters.userEmitterId.subscribe(
      (id: number) => {
        this.user_id = id;
      }
    );

    Emitters.userEmitter.subscribe(
      (username: string) => {
        this.username = username;
        this.getUserTypeService.getUserType(this.username).subscribe(
          user_type => {
            user_type = user_type['user_type'];
            if (user_type == "customer") {
              this.is_customer = true;
            } else if (user_type == "manager") {
              this.is_customer = false;
            } else {
              this.authenticated = false;
            }

          }
        );
      }
    );
  }


  deleteCookie(name: string) {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
  }

  logout(): void {
    this.logoutService.logout()
      .subscribe((res: any) => {
          Emitters.authEmitter.emit(false);
          this.deleteCookie('jwt');
          this.authenticated = false
          localStorage.clear();
          this.router.navigate(['/login']);
        },
        (err: HttpErrorResponse) => {
          alert("error logging out");
        });
  }

  closeSidenav() {
    this.sidenav.close();
  }

  accountDetailsDialog(): void {
    const dialogRef = this.dialog.open(DialogBodyAccountComponent, {
      data: {"username": `${this.username}`, "id": `${this.user_id}`}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(res => this.categories = res);
  }

  setCategoryId(cid: number): void {
    this.category_id = true;
    this.route.snapshot.paramMap['id'] = cid;
  }

  getBrands(): void {
    this.brandService.getBrands().subscribe(res => this.brands = res);
  }

  setBrandId(bid: number): void {
    this.brand_id = true;
    this.route.snapshot.paramMap['id'] = bid;
  }

}
