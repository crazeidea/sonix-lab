import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Logo } from '../../components/logo/logo';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin.layout.html',
  imports: [RouterOutlet, RouterLinkWithHref, Logo],
})
export default class AdminLayout {}
