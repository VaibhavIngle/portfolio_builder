import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { ProjectState } from 'src/app/store/project.reducer';
import { Store } from '@ngrx/store';
import { createProject, updateProject } from 'src/app/store/project.actions';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<ProjectState>
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      technologies: ['', Validators.required],
      category: ['', Validators.required],
      githubLink: ['', Validators.required],
      liveDemo: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.projectService.getProject(id).subscribe((data) => {
        this.projectForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      if (this.isEditMode) {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.store.dispatch(updateProject({ id, project: this.projectForm.value }));
        }
      } else {
        this.store.dispatch(createProject({ project: this.projectForm.value }));
      }
      this.router.navigate(['/projects']);
    }
  }
}
