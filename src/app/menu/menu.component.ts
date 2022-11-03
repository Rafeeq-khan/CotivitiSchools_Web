import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Iskill } from '../models/skillsType';
import { BehaviorSubject } from 'rxjs';
import { storageSessions } from 'src/sessions/session.storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  skillName: string = '';
  skills: Array<Iskill>=[];
  catId:any;
  selectedSkill:string="";
  isSelected:boolean=false;
  mid:any;


  constructor(private apiService: ApiService, private route: ActivatedRoute, private storage:storageSessions) {}

  ngOnInit(): void {

  var id = this.route.snapshot.queryParamMap.get('mid');
  this.mid= id;
    if (id == null || id == undefined) {
      id = '0';
    }
    var name = sessionStorage.getItem("menu");
    this.skillName = name ? name : "";

    this.apiService.getskills(parseInt(id.toString())).subscribe((data) => {
      console.log(data);
      sessionStorage.setItem("skillsList",JSON.stringify(data));
      this.skills = data;
    });

    this.storage.name.subscribe(nam => {
      while(nam){
        this.isSelected=this.storage.selected;
      }

      this.selectedSkill = nam;
    })
  }

  select(skillname : string ){

    this.storage.skillSelect(skillname);
  }

  getSubSkills(skilId:any){

  }

}
