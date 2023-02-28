import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';

export interface carInfo{
  carNo: string,
  color:string,
  slotNo:string,
  date:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test';
  addCar:any;
  carData : any[] = [];
  totalSlots = 10;
  availableSlots = 0;
  submitted: boolean = false;
  errorMessage : boolean = false;
  newSlotNumber! : number;
  @ViewChild('closeButton') closeButton:any;

  constructor(){

  }

  ngOnInit(){
    this.addCar = new FormGroup({
      carNumber: new FormControl('', Validators.required),
      carColor: new FormControl('', Validators.required),
    })
    this.assignInitialValue();
    this.calculateCarCount();
  }

  assignInitialValue(){
    this.carData = [
      {
        carNumber: 'KA 04 AK 2245',
        carColor: 'red',
        slotNo: 1,
        date: new Date()
      }
    ]
  }

  calculateCarCount(){
    this.availableSlots = this.totalSlots - this.carData.length;
  }

  removeCar(slotNo:number){
    this.carData = this.carData.filter(function(item) {
      return item.slotNo !== slotNo
    });
    this.calculateCarCount();
  }

  addNewCar(){
    this.submitted = true;
    if(this.addCar.valid){
      this.closeButton.nativeElement.click();
      let newCarInfo =  this.addCar.value;
      newCarInfo.date = new Date();
      newCarInfo.slotNo = 0;
      this.checkSlotNumber(newCarInfo.slotNo);
      newCarInfo.slotNo = this.newSlotNumber;
      this.carData.push(newCarInfo);
      this.addCar.reset();
    } else {
      this.errorMessage = true;
    }
    this.calculateCarCount();
  }

  checkSlotNumber(slotNo:number){
    var slotNumber = this.carData.find(item => item.slotNo == slotNo);
    if(slotNumber){
      slotNo = slotNo + 1;
      this.checkSlotNumber(slotNo);
    }
    else {
      this.newSlotNumber = slotNo;
    }
  }
}
