import { Injectable } from '@angular/core';
import { Client, fetchExchange } from '@urql/core';
import { BACKEND, GET_WORLD, ACHETER_PRODUIT, ENGAGER_MANAGER, LANCER_PRODUCTION} from './request';
import { World, Palier } from './world';
import { Product } from './world';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  user = "rokaya"
  server = BACKEND + "graphql"


  createClient() {
    return new Client({
      url: this.server,
      exchanges: [fetchExchange],
      fetchOptions: () => {
        return {
          headers: { 'x-user': this.user },
        };
      },
    });
  }


  getWorld() {
    return this.createClient().query(GET_WORLD, {}).toPromise();
  }

  lancerProduction(product: Product) {
    return this.createClient().mutation(LANCER_PRODUCTION, {
      id:
        product.id
    }).toPromise();
  }

  acherterQtProduit(id: number, quantite: number) {
    return this.createClient().mutation(ACHETER_PRODUIT, {
      id: id,
      
        quantite : quantite
    }).toPromise();
  }

  engagerManager(palier: Palier) {
    return this.createClient().mutation(ENGAGER_MANAGER, {name: palier.name}).toPromise();
  }

}

