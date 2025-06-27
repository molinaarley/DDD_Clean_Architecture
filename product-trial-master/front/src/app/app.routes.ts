import { Routes } from "@angular/router";
import { HomeComponent } from "./shared/features/home/home.component";
import { authGuard } from "./auth/auth.guard";


export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "login",
    loadComponent: () =>
      import("./auth/login/login.component").then((m) => m.LoginComponent)
  },
  {
    path: "products",
    canActivate: [authGuard], // 🔒 Protege acceso
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES)
  },
  {
    path: 'contact',
    canActivate: [authGuard], // opcional si quieres proteger esta ruta
    loadComponent: () =>
      import('./features/contact/contact.component').then(m => m.ContactComponent)
  }
  
  ,
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  }
];
