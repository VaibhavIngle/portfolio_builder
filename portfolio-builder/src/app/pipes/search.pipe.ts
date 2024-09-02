import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../projects/project.modal';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(projects: Project[], searchText: string): Project[] {
    if (!projects || !searchText) {
      return projects;
    }
    return projects.filter(project =>
      project.title.toLowerCase().includes(searchText.toLowerCase()) ||
      project.technologies.toLowerCase().includes(searchText.toLowerCase()) ||
      project.category.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
