import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ScenariosFeature } from './scenarios.reducer';

export const { selectError, selectScenarios, selectLoading } = ScenariosFeature;
