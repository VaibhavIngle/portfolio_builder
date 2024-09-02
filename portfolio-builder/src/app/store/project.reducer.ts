import { createReducer, on } from '@ngrx/store';
import * as ProjectActions from './project.actions';
import { Project } from '../projects/project.modal';

export interface ProjectState {
    projects: Project[];
    selectedProject: Project | null;
    error: string | null;
    loading: boolean;
}

export const initialState: ProjectState = {
    projects: [],
    selectedProject: null,
    error: null,
    loading: false,
};

export const projectReducer = createReducer(
    initialState,
    on(ProjectActions.loadProjects, state => ({
        ...state,
        loading: true
    })),
    on(ProjectActions.loadProjectsSuccess, (state, { projects }) => ({
        ...state,
        projects,
        loading: false,
        error: null
    })),
    on(ProjectActions.loadProjectsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(ProjectActions.loadProject, state => ({
        ...state,
        loading: true
    })),
    on(ProjectActions.loadProjectSuccess, (state, { project }) => ({
        ...state,
        selectedProject: project,
        loading: false,
        error: null
    })),
    on(ProjectActions.loadProjectFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(ProjectActions.createProject, state => ({
        ...state,
        loading: true
    })),
    on(ProjectActions.createProjectSuccess, (state, { project }) => ({
        ...state,
        projects: [...state.projects],
        loading: false,
        error: null
    })),
    on(ProjectActions.createProjectFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(ProjectActions.updateProject, state => ({
        ...state,
        loading: true
    })),
    on(ProjectActions.updateProjectSuccess, (state, { project }) => ({
        ...state,
        projects: state.projects.map(p => p.id === project.id ? project : p),
        loading: false,
        error: null
    })),
    on(ProjectActions.updateProjectFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(ProjectActions.deleteProject, state => ({
        ...state,
        loading: true
    })),
    on(ProjectActions.deleteProjectSuccess, (state, { id }) => ({
        ...state,
        projects: state.projects.filter(p => p.id !== id),
        loading: false,
        error: null
    })),
    on(ProjectActions.deleteProjectFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
