import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from '../project.modal';
import { Store } from '@ngrx/store';
import { ProjectState } from 'src/app/store/project.reducer';
import { selectAllProjects, selectProjectError, selectProjectLoading } from 'src/app/store/project.selectors';
import { deleteProject, loadProjects } from 'src/app/store/project.actions';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  projects$!: Observable<Project[]>;
  loading$: any;
  error$: any;
  searchQuery: string = '';

  constructor(private store: Store<ProjectState>, private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(loadProjects());
    this.projects$ = this.store.select(selectAllProjects);
    this.loading$ = this.store.select(selectProjectLoading);

    this.projects$.subscribe((projects: Project[]) => {
      this.projects = projects;
    })
  }

  deleteProject(id: any) {
    this.store.dispatch(deleteProject({ id: id }));
  }

  editProject(id: any): void {
    if (id !== undefined) {
      this.router.navigate(['/edit-project', id]);
    } else {
      console.error('Project ID is undefined.');
    }
  }
}
