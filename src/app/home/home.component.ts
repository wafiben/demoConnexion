import { Component, OnInit ,OnDestroy} from '@angular/core';
import { DataService } from '../data.service';
import { Observable, Subject } from 'rxjs';
import { Product } from '../models/product.model';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,OnDestroy{
  products : Product[] =[]  ;
  destroy: Subject<boolean> = new Subject<boolean>();



  constructor( private dataService:DataService) { }

  ngOnInit(): void
  {

    this.dataService.sendRquest().pipe(takeUntil(this.destroy)).subscribe((res: HttpResponse<any>)=>{
      console.log(res);
      this.products=res.body;


    });
  }
  ngOnDestroy()
    { this.destroy.next(true);
      this.destroy.unsubscribe();


    }





}


