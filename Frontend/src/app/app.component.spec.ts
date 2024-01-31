import {GraphqlService} from "./graphql.serive";
import {Product, World} from ".world";
import {BACKEND} from "./request";
import { Component } from "@angular/core";

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