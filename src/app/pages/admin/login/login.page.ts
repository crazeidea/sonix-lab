import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { Logo } from '../../../components/logo/logo';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-login',
  imports: [Logo, FormsModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css'
})
export default class LoginPage {
private readonly supabaseService = inject(SupabaseService);
private readonly router = inject(Router)
    loginForm = new FormGroup({
        email: new FormControl('', {validators: [Validators.required], nonNullable: true}),
        password: new FormControl('', {validators: [Validators.required], nonNullable: true}),
    })

    async submit() {
      if (this.loginForm.invalid) return;
      try {
      await this.supabaseService.login(this.loginForm.getRawValue())
      toast.success("로그인이 완료되었습니다.");
      this.router.navigate(['/admin', 'home'])
      } catch (error) {
          toast.error("이메일 또는 비밀번호가 올바르지 않습니다.")
      }
    }
}
