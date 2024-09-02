import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectService } from '../services/project.service';
import * as ProjectActions from './project.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProjectEffects {

    constructor(
        private actions$: Actions,
        private projectService: ProjectService,
        private toastr: ToastrService
    ) { }

    loadProjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.loadProjects),
            mergeMap(() =>
                this.projectService.getProjects().pipe(
                    map(projects => ProjectActions.loadProjectsSuccess({ projects })),
                    catchError(error => of(ProjectActions.loadProjectsFailure({ error: error.message })))
                )
            )
        )
    );

    loadProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.loadProject),
            mergeMap(({ id }) =>
                this.projectService.getProject(id).pipe(
                    map(project => ProjectActions.loadProjectSuccess({ project })),
                    catchError(error => of(ProjectActions.loadProjectFailure({ error: error.message })))
                )
            )
        )
    );

    createProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.createProject),
            mergeMap(({ project }) =>
                this.projectService.createProject(project).pipe(
                    map(newProject => ProjectActions.createProjectSuccess({ project: newProject })),
                    catchError(error => of(ProjectActions.createProjectFailure({ error: error.message })))
                )
            )
        )
    );

    createProjectSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.createProjectSuccess),
            tap(() => {
                this.toastr.success('Project created successfully!', 'Success');
            })
        ),
        { dispatch: false }
    );

    createProjectFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.createProjectFailure),
            tap(({ error }) => {
                this.toastr.error(`Failed to create project: ${error}`, 'Error');
            })
        ),
        { dispatch: false }
    );

    updateProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.updateProject),
            mergeMap(({ id, project }) =>
                this.projectService.updateProject(id, project).pipe(
                    map(updatedProject => ProjectActions.updateProjectSuccess({ project: updatedProject })),
                    catchError(error => of(ProjectActions.updateProjectFailure({ error: error.message })))
                )
            )
        )
    );

    updateProjectSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.updateProjectSuccess),
            tap(() => {
                this.toastr.success('Project updated successfully!', 'Success');
            })
        ),
        { dispatch: false }
    );

    updateProjectFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.updateProjectFailure),
            tap(({ error }) => {
                this.toastr.error(`Failed to update project: ${error}`, 'Error');
            })
        ),
        { dispatch: false }
    );

    deleteProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.deleteProject),
            mergeMap(({ id }) =>
                this.projectService.deleteProject(id).pipe(
                    map(() => ProjectActions.deleteProjectSuccess({ id })),
                    catchError(error => of(ProjectActions.deleteProjectFailure({ error: error.message })))
                )
            )
        )
    );

    deleteProjectSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.deleteProjectSuccess),
            tap(() => {
                this.toastr.success('Project deleted successfully!', 'Success');
            })
        ),
        { dispatch: false }
    );

    deleteProjectFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.deleteProjectFailure),
            tap(({ error }) => {
                this.toastr.error(`Failed to delete project: ${error}`, 'Error');
            })
        ),
        { dispatch: false }
    );
}
