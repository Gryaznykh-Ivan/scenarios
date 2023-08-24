import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ScenariosFeature } from './scenario.reducer';

export const { selectError, selectScenarios, selectLoading, selectScenario } = ScenariosFeature;
