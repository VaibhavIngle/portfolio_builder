import { Component, OnInit } from '@angular/core';
import { Project } from '../project.modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectState } from 'src/app/store/project.reducer';
import { Store } from '@ngrx/store';
import { loadProject } from 'src/app/store/project.actions';
import { selectSelectedProject } from 'src/app/store/project.selectors';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project | undefined;
  project$: any;
  loading$: any;
  constructor(private route: ActivatedRoute, private projectService: ProjectService,private store: Store<ProjectState>, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(loadProject({ id: String(id) }));
    this.project$ = this.store.select(selectSelectedProject);
    this.project$.subscribe((project: any) => {
      this.project = project;
    })
  }
}
