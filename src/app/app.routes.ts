import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { PacketsComponent } from './Pages/packets/packets.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { LoginComponent } from './Pages/login/login.component';
import { FindComponent } from './Pages/find/find.component';
import { BoxComponent } from './Pages/box/box.component';

export const routes: Routes = [
    {path:'', redirectTo:'home',pathMatch:'full'},
    {path:"home", component:HomeComponent },
    {path:"packets",component:PacketsComponent},
    {path:"contact",component:ContactComponent},
    {path:"login", component:LoginComponent},
    {path:"find", component:FindComponent},
    {path:"box",component:BoxComponent},
];
