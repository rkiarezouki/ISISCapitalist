import { Injectable } from '@angular/core';
import { Client, fetchExchange } from '@urql/core';
import { BACKEND, GET_WORLD } from './request';
import { World } from './world';

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


}

