import { DealsService } from './../services/deals.service';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {

  constructor(
    private DealsService:DealsService
  ) { }

  ngOnInit(): void {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    });
    this._getDeals();
  }
  
  potential:any=[];

  focus:any=[];

  contact:any=[];

  offer:any=[];

  getting:any=[];
  private _getDeals(){
    this.DealsService.deals().subscribe((res:any) => {
      for(var i =0 ;i<res.length ; i++){
        if(res[i].status =='Potential Value'){
          this.potential.push(res[i])
        }
        else if(res[i].status =='Focus'){
          this.focus.push(res[i])
        }
        else if(res[i].status =='Contact Made'){
          this.contact.push(res[i])
        }
        else if(res[i].status =='Offer Sent'){
          this.offer.push(res[i])
        }
        else if(res[i].status =='Getting Ready'){
          this.getting.push(res[i])
        }
      }
    })
  }
  
  private _updateDeals(data:any,value:string){
    this.DealsService.updateDeals(data,value).subscribe((res:any)=>{
      console.log(res)
    })
  }
  drop(event: CdkDragDrop<string[]>,value:string) {
    const index = event.currentIndex
    var data = '';
    setTimeout(() => {
      data = event.container.data[index]
      console.log(data,value)
      this._updateDeals(data,value)
    }, 10);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
