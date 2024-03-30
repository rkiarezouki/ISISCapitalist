import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { World } from './world';
import { GraphqlService } from './graphql.service';
import { BigvaluePipe } from './bigvalue.pipe';
import { Product } from './world';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { BACKEND } from './request';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BigvaluePipe, FormsModule, ProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  server = ""
  BACKEND = "http://localhost:4000/";
  _qtmulti = "1";
  username: string = '';

  world: World = new World();
  constructor(private service: GraphqlService) {
    service.getWorld().then(
      res => {
        this.world = res.data.getWorld;
      });
  }
  onProductionDone(p: Product) {
    this.world.money += p.revenu * p.quantite;
    this.world.score += p.revenu * p.quantite;
  }

  onMultiplicateur() {
    if (this._qtmulti === "1") {
      this._qtmulti = "10";
    }
    else if (this._qtmulti === "10") {
      this._qtmulti = "100";
    }
    else if (this._qtmulti === "100") {
      this._qtmulti = "Max";
    }
    else { this._qtmulti = "1" }
  }

  onBuy({qt, product} : {qt:number, product:Product}) {
    let cout = product.cout * (1 - Math.pow(product.croissance, qt)) / (1 - product.croissance);
    if(this.world.money>cout){
      this.world.money -= cout
    }
  }

  getUsername() {
    if (localStorage.getItem("username")) {
      this.username = localStorage.getItem("username")!;
    }
  }

  onUsernameChanged() {
    localStorage.setItem("username", this.username);
  }

  ngOnInit() {
    this._qtmulti = "1";
  }
}
