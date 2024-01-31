
import {BACKEND} from "./request";
import { Component } from "@angular/core";
import { World } from "./world";
import { GraphqlService } from "./graphql.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class Appcomponent {


  world:World = new World()

  constructor(services:GraphqlService){
    services.getWorld().then(res => 
      this.world = res.data.getWorld)
  }
}