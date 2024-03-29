import { AppComponent } from '../app.component';
import { Product, World } from '../world';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MyProgressBarComponent, Orientation } from './ProgressComponent';
import { GraphqlService } from '../graphql.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [AppComponent, ProductComponent, MyProgressBarComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent {
  lastupdate: number = 0;
  progressbarvalue: number = 0;
  _qtmulti: string = "1";
  BACKEND = "http://localhost:4000/";
  server = ""
  run = false
  orientation = Orientation.horizontal
  auto = false
  vitesse = 0
  initialValue = 0
  quantiteProduct = 1
  world: World = new World();
  calcScore() {
    if (this.product.timeleft != 0) {
      let tempsEcoule = Date.now() - this.lastupdate;
      this.lastupdate = Date.now();
      this.product.timeleft = this.product.timeleft - tempsEcoule;
      if (this.product.timeleft <= 0) {
        this.product.timeleft = 0;
        this.run = false;
        this.notifyProduction.emit(this.product);
      }
      if (this.product.managerUnlocked && this.product.timeleft == 0 && this.product.quantite > 0) {
        this.product.timeleft = this.product.vitesse;
        this.auto = true;
        this.lastupdate = Date.now();
      }
    }
  }
  ngOnInit(): void {
    setInterval(() => { this.calcScore(); }, 100);
  }

  product: Product = new Product();
  @Input()
  set prod(value: Product) {

    this.product = value;
  }

  constructor(private servicesql: GraphqlService) {
    this.server = servicesql.server;
  }

  /*lancerProduction(){ this.service.lancerProduction(this.product).catch(reason =>
    console.log("erreur: " + reason)
    );
  }*/

  @Input()
  money = 0

  @Output() notifyProduction: EventEmitter<Product> = new
    EventEmitter<Product>();

  @Output() notifyAchat: EventEmitter<{qt:number, product:Product}> = new
    EventEmitter<{qt:number, product:Product}>();

  @Input()
  set qtmulti(value: string) {
    this._qtmulti = value;
    if (this._qtmulti && this.product) this.getQuantiteProduct();
  }
  @Input()
  set moneyJoueur(value: number) {
    this.money = value;
    if (this.money && this.product) this.getQuantiteProduct();
  }
  @Input()
  calcMaxCanBuy() {
    let argent = this.money;
    let calcmaxcanbuy = (Math.log(1 - (argent * (1 - this.product.croissance)) / this.product.cout) / (Math.log(this.product.croissance)))
  }


  startFabrication() {
    if (this.product.timeleft == 0) {
      this.servicesql.lancerProduction(this.product).catch(reason =>
        console.log("Erreur : " + reason)
      );

      this.product.timeleft = this.product.vitesse;
      this.run = true;
      this.world.lastupdate = Date.now();
    }
  }

  getQuantiteProduct() {

    switch (this._qtmulti) {
      case '1':
        this.quantiteProduct = 1;
        break;
      case '10':
        this.quantiteProduct = 10;
        break;
      case '100':
        this.quantiteProduct = 100;
        break;
      case 'Max':
        this.quantiteProduct = 20000;//avec calcmaxcanbuy
        break;
      default:
        break;

    }
    console.log(this.quantiteProduct)
  }

  acheterProduit() {
    if (this.product.timeleft == 0) {
      this.servicesql.acherterQtProduit(this.product.id, this.quantiteProduct).catch(reason =>
        console.log("Erreur : " + reason)
      );
    }
    
    this.product.quantite += this.quantiteProduct
    this.notifyAchat.emit({qt:this.quantiteProduct,product:this.product});
    this.product.cout *= Math.pow(this.product.croissance , this.quantiteProduct)
    console.log(this.quantiteProduct)
  }

}