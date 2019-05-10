import { Component, OnInit } from '@angular/core';
import { AffiliatesService } from '../../services/affiliates.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js'
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {
  
  chart: any;
  chart2: any;
  professions: any[] = [];
  professionsName: any[] = [];
  professionsCount: any[] = [];
  constructor(private affiliatesService: AffiliatesService, public auth: AuthService, 
              private router: Router  ) { 
    if(!this.auth.isLogged){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {

    this.affiliatesService.getCountProfessions(this.auth.user)
      .subscribe((data: any) => {
        this.professions = data.profesions;
        console.log(this.professions);
        var coloR = [];
        var dynamicColors = function() {
          var r = Math.floor(Math.random() * 255);
          var g = Math.floor(Math.random() * 255);
          var b = Math.floor(Math.random() * 255);
          return "rgb(" + r + "," + g + "," + b + ")";
       };
       
        for(let i=0;i<this.professions.length;i++){
          this.professionsName[i] = this.professions[i]._id;
          this.professionsCount[i] = this.professions[i].count;
          coloR[i] = dynamicColors();
        }
        console.log(this.professionsName);
        console.log(this.professionsCount);

        this.chart = new Chart('canvas', {
          type: 'doughnut',
          data: {
            datasets: [{
                data: this.professionsCount,
                backgroundColor: coloR
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: this.professionsName
          },
          options: {
            title: {
              display: true,
              text: 'Profesiones'
            }
          } 
        });

        this.chart2 = new Chart('canvas2', {
          type: 'bar',
          data: {
            datasets: [{
                data: this.professionsCount,
                backgroundColor: coloR
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: this.professionsName
          },
          options: {
            title: {
              display: true,
              text: 'Profesiones'
            }
          } 
        });

      });
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }



}

