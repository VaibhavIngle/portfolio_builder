import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProjectState } from './project.reducer';

export const selectProjectState = createFeatureSelector<ProjectState>('projects');

export const selectAllProjects = createSelector(
    selectProjectState,
    (state: ProjectState) => state.projects
);

export const selectSelectedProject = createSelector(
    selectProjectState,
    (state: ProjectState) => state.selectedProject
);

export const selectProjectLoading = createSelector(
    selectProjectState,
    (state: ProjectState) => state.loading
);

export const selectProjectError = createSelector(
    selectProjectState,
    (state: ProjectState) => state.error
);
