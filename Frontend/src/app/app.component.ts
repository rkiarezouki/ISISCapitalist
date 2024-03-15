import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { World } from './world';
import { GraphqlService } from './graphql.service';
import { BigvaluePipe } from './bigvalue.pipe';
import { Product } from './world';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BigvaluePipe, ProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  server = ""
  _qtmulti = "1";

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
    else if(this._qtmulti === "10"){
      this._qtmulti = "100";
    }
    else if(this._qtmulti === "100"){
      this._qtmulti = "Max";
    }
    else {this._qtmulti = "1"}

  }
}
