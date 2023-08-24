import { Component,OnInit  } from '@angular/core';
import { FormServiceService } from '../form-service.service';
// import { Facility } from '../facility.model';
// import { Option } from '../option.model';
@Component({
  selector: 'app-form-screen',
  templateUrl: './form-screen.component.html',
  styleUrls: ['./form-screen.component.css']
})
export class FormScreenComponent implements OnInit {

  facilities= [];
  selectedOptions = {};
  exclusionsList
  constructor(public formservice: FormServiceService){}
  firstSelection=[];
  optionValue=[]

async ngOnInit() {

  this.formservice.getFacilitiesAndExclusions().subscribe(data => {
    this.facilities = data.facilities;
    this.exclusionsList = data.exclusions;
    this.initializeSelectedOptions();
  });
    console.log(" this is the data ",  this.facilities, this.exclusionsList);


}

initializeSelectedOptions() {
  for (const facility of this.facilities) {
    this.selectedOptions[facility.facility_id] = null;
  }
}

handleOptionSelection(facilityId: string, selectedOptionId: string) {
  // rule apply
const exclusions = this.getExclusionsForFacility(facilityId);
let exeData= this.isExcluded(facilityId, selectedOptionId, exclusions )

}

getExclusionsForFacility(facilityId: string): any[] {
  // feaching Excution list
  return this.exclusionsList.filter(exclusion => exclusion.some(item => item.facility_id === facilityId));
}
isExcluded(fac_id, sel_id, exclusions )
{
  // console.log("is Exclude",fac_id, sel_id)
 for(let i=0; i<exclusions.length; i++ )
 {
    for(let j=0; j<exclusions[i].length; j++)
    {
      const key11 = Object.keys(this.selectedOptions).find(key => this.selectedOptions[key] === sel_id);
      // console.log('key val', Object.keys(this.selectedOptions[fac_id]), key11)
      if(j==0){
      if(exclusions[i][j].options_id==this.selectedOptions[fac_id]  && exclusions[i][j].facility_id==key11 )
      {
        for(let k=0; k<this.facilities.length; k++ ){
   if(this.facilities[k]['facility_id']==exclusions[i][j+1].facility_id){
    this.facilities[k]['options']= this.facilities[k]['options'].map((item, index)=>{
        if(item.id==exclusions[i][j+1].options_id){
          item['disabled']=true;
        }

      return item;
        })

     }
        }
      }
    }
    }

 }
}




}
