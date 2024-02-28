import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { World } from './world';
import { GraphqlService } from './graphql.service';
import { BigvaluePipe } from './bigvalue.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BigvaluePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  server = ""

  world: World = new World();
    constructor(private service: GraphqlService) {
     service.getWorld().then(
     res => {
     this.world = res.data.getWorld;
     });
    }
}
