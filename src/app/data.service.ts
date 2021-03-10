import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 private urlOfDatabase='http://localhost:3000/products';
 public first: string = "";
 public prev: string = "";
 public next: string = "";
 public last: string = "";

  constructor(private httpClient:HttpClient ) { }
  handleError(error: HttpErrorResponse)
  {
    let errorMessage='Unknown error!';
    if (error.error instanceof ErrorEvent)
    {
      errorMessage=error.error.message;//erreur client
      console.log(errorMessage);
      console.log(error.status);
    }
    else
    {
      errorMessage='ERROR Code:'+ error.status + 'and errormessage='+error.message;
    }
    window.alert(errorMessage);
    this.sendRquest();
    return throwError(errorMessage);
    console.log(error.status);

  }



   public sendRquest()

  {
    const options = { params: new HttpParams({fromString: "_page=1&_limit=20"}) };
    return this.httpClient.get(this.urlOfDatabase,options,observe: "response").pipe(retry(3),catchError(this.handleError), tap(res => {
      console.log(res.headers.get('Link'));
      this.parseLinkHeader(res.headers.get('Link'));
    }));
  }


  parseLinkHeader(header:string) {
    if (header.length == 0) {
      return ;
    }

    let parts = header.split(',');
    var links = {first:'',last:'',prev:'',next:'',name:''};
    parts.forEach( p => {
      let section = p.split(';');
      console.log(section);
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      console.log(url)
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links['name'] = url;
      console.log(links['name'] );


    });

    this.first  = links.first;
    this.last   = links["last"];
    this.prev   = links["prev"];
    this.next   = links["next"];
  }

}
