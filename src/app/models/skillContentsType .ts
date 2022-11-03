import { Data } from "@angular/router";

export interface ISkillContentsType {
  skillId: number;
  skillContentId: number;
  skillContents: string;
  imagesLink?: string;
  videosLink?: string;
  modifiedBy?: string;
  modifiedDt?: string;
  
  
}
