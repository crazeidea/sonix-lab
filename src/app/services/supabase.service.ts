import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import {
  CreateSoundRequest,
  SoundRequest,
} from '../libs/sound-request.interface';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = new SupabaseClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );
  }


 async login(body:{email: string; password: string}) {
    
  
    const { data, error } = await this.supabase.auth.signInWithPassword(body);
    if (data && !error) {

      localStorage.setItem('token', data.session?.access_token);

      return true;
    }
   
      throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.")

}
}
