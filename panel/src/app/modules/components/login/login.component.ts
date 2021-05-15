import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from '../../services/snack-bar.service';
import { ApiService } from './../../services/api.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  options: AnimationOptions = {
    path: '/assets/character.json',
  };

  optionsHeart: AnimationOptions = {
    path: '/assets/heartbeat.json',
  };

  constructor(
    private apiService: ApiService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submit() {
    this.apiService
      .login({ email: this.email.value, password: this.password.value })
      .subscribe(
        (data) => {
          localStorage.setItem('email',this.email.value);
          localStorage.setItem('name',data);
          this.router.navigate(['/panel'])
        },
        (error) => {
          this.snackBarService.showSnackBar(
            'ایمیل یا رمز عبور اشتباه است',
            'warn',
            4000
          );
        }
      );
  }
}
