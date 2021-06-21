import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'app/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('username', { static: false })
  username?: ElementRef;

  authenticationError = false;

  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    rememberMe: [false],
  });

  imgSourceEsp = '../../content/images/esp.svg';
  imgSourceIng = '../../content/images/ing.svg';

  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private sessionStorage: SessionStorageService,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['']);
      }
    });
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorage.store('locale', languageKey);
    this.translateService.use(languageKey);
  }

  ngAfterViewInit(): void {
    if (this.username) {
      this.username.nativeElement.focus();
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action);
  }

  login(): void {
    this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: this.loginForm.get('rememberMe')!.value,
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          if (!this.router.getCurrentNavigation()) {
            this.router.navigate(['/product']);
          }
        },
        () => {
          this.openSnackBar(
            this.translateService.instant('login.messages.error.authentication'),
            this.translateService.instant('login.messages.error.accept')
          );
          this.authenticationError = true;
        }
      );
  }
}
