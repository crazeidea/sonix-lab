import { Component } from "@angular/core";
import { RouterOutlet, RouterLinkWithHref } from "@angular/router";

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin.layout.html',
    imports: [RouterOutlet, RouterLinkWithHref]
})
export default class AdminLayout {
    
}