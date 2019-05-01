import { Component, OnInit } from '@angular/core';
import { AffiliatesService } from '../../services/affiliates.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {
  // Doughnut
  public doughnutChartLabels:string[] = ['Idependiente', 'Ingeniero', 'otros', 'abogado'];
  public doughnutChartData:number[] = [0, 0, 0];
  public doughnutChartType:string = 'doughnut';

  afilliates: any [] = [];
  countProfession1 = 0;
  countProfession2 = 0;
  countProfession3 = 0;
  countProfession4 = 0;

  constructor(private affiliatesService: AffiliatesService, public auth: AuthService, 
              private router: Router  ) { }

  ngOnInit() {
    if(!this.auth.isLogged){
      this.router.navigate(['/login']);
    }

    this.affiliatesService.getAffiliatesByUser(this.auth.user)
      .subscribe((data: any) => {
        this.afilliates = data.Affiliates;
        console.log(data.Affiliates);
        for (let i=0; i<this.afilliates.length; i++) {
          if (this.afilliates[i].profession == 'independiente') {
             this.countProfession1++;
          } else if (this.afilliates[i].profession == 'ingeniero') {
            this.countProfession2++;
         } else if (this.afilliates[i].profession == 'otros') {
          this.countProfession3++;
         }
         else if (this.afilliates[i].profession == 'abogado') {
          this.countProfession4++;      
         }
        }
        console.log(this.countProfession1);
        console.log(this.countProfession2);
        this.doughnutChartData[0] = this.countProfession1;
        this.doughnutChartData[1] = this.countProfession2;
        this.doughnutChartData[2] = this.countProfession3;
        this.doughnutChartData[3] = this.countProfession4;

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

