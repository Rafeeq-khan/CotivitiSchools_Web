import { Component, OnInit, SecurityContext, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { ISkillContentsType } from '../models/skillContentsType ';
import { IUpdatesType} from '../models/updateContentsType';
import { Isubskills } from '../models/subskillsType';
import { DomSanitizer, SafeResourceUrl,SafeHtml } from '@angular/platform-browser';

declare var window:any
@Component({
  selector: 'app-skillcontent',
  templateUrl: './skillcontent.component.html',
  styleUrls: ['./skillcontent.component.css']
})
export class SkillcontentComponent implements OnInit{
/*save(changedContent:string) {
  alert("saved");
  console.log(changedContent);
}*/

  contentsData: Array<ISkillContentsType>=[];
  subSkills: Array<Isubskills> = [];
  enableEditor: boolean = false;
  inEditorMode: boolean = false;
  editSubskill:boolean=false;
  isAdmin: boolean = false;
  savedChanges: boolean= false;
  addVideo : boolean=false;
  videoLink:string="";
  formModal:any;
  formSaveModal:any;
  formExitModal:any;

  constructor(private api:ApiService,private route:ActivatedRoute,
    public sanitizer: DomSanitizer, private storage: storageSessions) { }



  ngOnInit(): void {

    var id = this.route.snapshot.params['skillId'];
    this.api.getSubskills(parseInt(id)).subscribe(subskills => {
      console.log(subskills);
      this.subSkills = subskills;
    });

    var admin = sessionStorage.getItem("currentUserRoleId");
    if (admin == "999") {
      this.isAdmin = true;
    }


    this.storage.editorModeOn.subscribe(res => {
      if (res) {
        this.enableEditor = true;
      }
    });

    this.formSaveModal = new window.bootstrap.Modal(
      document.getElementById("mySaveModal")
    );

    this.formExitModal = new window.bootstrap.Modal(
      document.getElementById("exitModall")
    );
    }

    showModal(){
      this.formModal.show();
    }

    showSaveChangesModal(){
      this.formSaveModal.show();
    }
    hideSaveChangesModal(){
      this.formSaveModal.hide();
    }
    showExitModal(){
      this.formExitModal.show();
    }

  getContent(skillId:any){
    console.log(skillId);
    var id = parseInt(skillId);
    this.api.getSkillContent(id).subscribe(content=>{
      console.log(content);
      this.contentsData = content;
    })
  }



  editorMode() {
    alert("Editor Mode");
    this.storage.enableEditor();
    this.storage.editorModeOn.subscribe(res => {
      if (res) {
        sessionStorage.setItem("editorMode", "true");
        this.inEditorMode = true;
      }
    });
  }


  subskillEditorMode(){
    alert("Edit Subskills");
    this.storage.enableEdit4Subskills();
    this.storage.editorModeSubskills.subscribe(res =>
      {
        if(res){
          this.editSubskill = true;
        }
      })
  }

  exitEditorSave() {
    if (this.savedChanges) {
      alert("Exiting editor mode");
      this.inEditorMode = false;
      this.enableEditor = false;
    } else {
      this.save();
      this.inEditorMode = false;
      this.enableEditor = false;
    }
    this.formExitModal.hide();
  }
  exitEditorNoSave(){
    this.inEditorMode = false;
    this.enableEditor = false;
    this.formExitModal.hide();
  }
  exitEditorCancel(){
    this.formExitModal.hide();
  }


  save() {
    this.formSaveModal.hide();
    console.log(this.contentsData);
    var contents = this.sanitizer.sanitize(SecurityContext.HTML, this.contentsData[0].skillContents);
    var safeContents = contents ? contents : "";
    var user = sessionStorage.getItem("currentUserFirstname");
    var presentUser = user ? user : "";
    var id = this.contentsData[0].skillContentId;

    var updateContents :IUpdatesType = {
      SkillId: this.contentsData[0].skillId.toString(),
      SkillContentId: this.contentsData[0].skillContentId.toString(),
      SkillContents: safeContents,
      ImagesLink: this.contentsData[0].imagesLink ? this.contentsData[0].imagesLink: "",
      VideosLink: this.videoLink,
      ModifiedBy: user ? user : ""
    };
    //var cont = this.sanitizer.sanitize(SecurityContext.SCRIPT(updateContents));
    console.log("Contents Typoe:-", typeof (updateContents));
    this.api.updateSkillContent(id, presentUser, updateContents).subscribe(res =>
    {
      console.log(res);
      if (res == "Success") {
        this.savedChanges = true;
        alert("Updated changes");
      }
    });
  }

  updateSubskill(subskillId:number,subskillName:string){
    console.log("from methos"+subskillId,subskillName);
    var sskillname  = this.sanitizer.sanitize(SecurityContext.STYLE,subskillName);
    var skill = sskillname ? sskillname : "";
    var user = sessionStorage.getItem("currentUserFirstname") ? sessionStorage.getItem("currentUserFirstname") : "";
    var admin = user ? user : "";
    var sskillId = subskillId.toString();
    this.api.updateSSkills(sskillId,skill,admin).subscribe(res => {
      alert("Updated");
      console.log(res);
    })
  }

  sanitizeHtml(data: string) {
    var result = this.sanitizer.sanitize(SecurityContext.HTML, data);

    return result;
  }


  includeVideo(){
    this.addVideo = true;
  }

  getSanitisedUrl(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


import { Pipe, PipeTransform } from '@angular/core';
import { OnChanges } from '@angular/core';
import { storageSessions } from '../../sessions/session.storage';

@Pipe({name: 'mySafe'})
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
    }

    public transform(url: string) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
