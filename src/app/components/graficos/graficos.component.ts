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
  public doughnutChartLabels: string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  affiliates: any [] = [];
  professions: any[] = [];
  countProfession1 = 0;
  countProfession2 = 0;
  countProfession3 = 0;
  countProfession4 = 0;

  constructor(private affiliatesService: AffiliatesService, public auth: AuthService, 
              private router: Router  ) { 
    if(!this.auth.isLogged){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {

    this.affiliatesService.getAffiliatesByUser(this.auth.user)
      .subscribe((data: any) => {
        this.affiliates = data.Affiliates;
        console.log(data.Affiliates);
        for(let i=0; i<this.affiliates.length;i++){
          this.professions[i] = this.affiliates[i].profession;
          this.doughnutChartLabels[i] = this.affiliates[i].profession;
        }
        console.log(this.doughnutChartLabels);

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

