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
  chart3: any;
  chart4: any;
  professions: any[] = [];
  professionsName: any[] = [];
  professionsCount: any[] = [];
  
  occupations: any[] = [];
  occupationsName: any[] = [];
  occupationsCount: any[] = [];

  zones: any[] = [];
  zonesName: any[] = [];
  zonesCount: any[] = [];

  subdivisions: any[] = [];
  subdivisionName: any[] = [];
  subdivisionCount: any[] = [];

  color:any[]=[];

  constructor(private affiliatesService: AffiliatesService, public auth: AuthService, 
              private router: Router  ) { 
    if(!this.auth.isLogged){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.getCountProfessions();
    this.getCountOccupations();
    this.getCountZones();
    this.getCountSubdivisions();
  }
  
  dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };
  
  getCountProfessions(){
    this.affiliatesService.getCountProfessions(this.auth.user)
      .subscribe((data: any) => {
        this.professions = data.profesions;
        console.log(this.professions);
      
        for(let i=0;i<this.professions.length;i++){
          if(this.professions[i]._id == "" || this.professions[i]._id == null){
            this.professionsName[i] = "No tiene";
            this.professionsCount[i] = this.professions[i].count;            
          }else{
            this.professionsName[i] = this.professions[i]._id;
            this.professionsCount[i] = this.professions[i].count;
          }
          this.color[i] = this.dynamicColors();
          
        }
        console.log(this.professionsName);
        console.log(this.professionsCount);

        this.chart = new Chart('canvas', {
          type: 'doughnut',
          data: {
            datasets: [{
                data: this.professionsCount,
                backgroundColor: this.color
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

  getCountOccupations(){
    this.affiliatesService.getCountOccupations(this.auth.user)
      .subscribe((data:any) => {
        this.occupations = data.occupations;
        console.log(this.occupations);
        console.log(this.color);
              
        for(let i=0;i<this.occupations.length;i++){
          if(this.occupations[i]._id == "" || this.occupations[i]._id == null){
            this.occupationsName[i] = "No tiene";
            this.occupationsCount[i] = this.occupations[i].count;            
          }else{
            this.occupationsName[i] = this.occupations[i]._id;
            this.occupationsCount[i] = this.occupations[i].count;          
          }
          this.color[i] = this.dynamicColors();         
        }
        console.log(this.color);
        console.log(this.occupationsName);
        console.log(this.occupationsCount);   
        
        this.chart2 = new Chart('canvas2', {
          type: 'doughnut',
          data: {
            datasets: [{
                data: this.occupationsCount,
                backgroundColor: this.color
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: this.occupationsName
          },
          options: {
            title: {
              display: true,
              text: 'Ocupaciones'
            }
          } 
        });

      });
  }

  getCountZones(){
    this.affiliatesService.getCountZones(this.auth.user)
      .subscribe((data:any) => {
        this.zones = data.zones;
              
        for(let i=0;i<this.zones.length;i++){
          if(this.zones[i]._id == "" || this.zones[i]._id == null){
            this.zonesName[i] = "No tiene";
            this.zonesCount[i] = this.zones[i].count;            
          }else{
            this.zonesName[i] = this.zones[i]._id;
            this.zonesCount[i] = this.zones[i].count;          
          }
          this.color[i] = this.dynamicColors();         
        }
         
        this.chart3 = new Chart('canvas3', {
          type: 'doughnut',
          data: {
            datasets: [{
                data: this.zonesCount,
                backgroundColor: this.color
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: this.zonesName
          },
          options: {
            title: {
              display: true,
              text: 'Zonas'
            }
          } 
        });

      });
  }

  getCountSubdivisions(){
    this.affiliatesService.getCountSubdivisions(this.auth.user)
      .subscribe((data:any) => {
        this.subdivisions = data.subdivisions;
              
        for(let i=0;i<this.subdivisions.length;i++){
          if(this.subdivisions[i]._id == "" || this.subdivisions[i]._id == null){
            this.subdivisionName[i] = "No tiene";
            this.subdivisionCount[i] = this.subdivisions[i].count;            
          }else{
            this.subdivisionName[i] = this.subdivisions[i]._id;
            this.subdivisionCount[i] = this.subdivisions[i].count;          
          }
          this.color[i] = this.dynamicColors();         
        }
         
        this.chart3 = new Chart('canvas4', {
          type: 'doughnut',
          data: {
            datasets: [{
                data: this.subdivisionCount,
                backgroundColor: this.color
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: this.subdivisionName
          },
          options: {
            title: {
              display: true,
              text: 'Subdivision (Barrios/veredas)'
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

