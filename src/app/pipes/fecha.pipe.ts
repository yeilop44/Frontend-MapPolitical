import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';


@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: string, format?: string): string {
    console.log(value);
    
    if( value === null || typeof value === "undefined"  )
    {
      return new DatePipe('en-US').transform( new Date(), 'yyyy-MM-dd');
    }
    else{
      let date = value.toString().trim();

      try{
        return new DatePipe('en-US').transform(date, 'yyyy-MM-dd');
      }
      catch( e ){
        console.log( e );
        return value;
      }      
      
    }
  }

}
