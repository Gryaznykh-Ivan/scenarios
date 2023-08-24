import { Action, createReducer, on, createFeature } from '@ngrx/store';
import * as TabsActions from './tabs.actions';
import { ITab } from 'src/app/models/tab.model';
import {
  createTabInitiated,
  rearrangeTabInitiated,
  removeTabInitiated,
  selectTabInitiated,
  toggleTabToolbarInitiated,
  updateActiveTabInitiated,
} from './tabs.actions';
import {
  selectFileInitiated,
  selectNodeInitiated,
  selectScenarioInitiated,
} from '../tabs';

export interface TabsState {
  tabs: ITab[];
}

export const initialState: TabsState = {
  tabs: [
    {
      title: 'Новая страница',
      isActive: true,
      toolbar: {
        scenarios: true,
        actions: false,
        properties: true,
        console: false,
      },
      fileId: null,
      nodeId: null,
      scenarioId: null,
    },
  ],
};

export const TabsFeature = createFeature({
  name: 'tabs',
  reducer: createReducer(
    initialState,
    on(createTabInitiated, (state) => {
      if (state.tabs.length >= 20) return state;

      return {
        ...state,
        tabs: [
          ...state.tabs.map((c) => ({ ...c, isActive: false })),
          {
            title: 'Новая страница',
            isActive: true,
            toolbar: {
              scenarios: true,
              actions: false,
              properties: true,
              console: false,
            },
            fileId: null,
            nodeId: null,
            scenarioId: null,
          },
        ],
      };
    }),
    on(removeTabInitiated, (state, { payload }) => {
      const filteredTabs = state.tabs.filter((_, i) => payload.index !== i);
      if (filteredTabs.length < 1) return state;

      const isActiveTabExist = filteredTabs.some((c) => c.isActive === true);
      if (isActiveTabExist === false) {
        filteredTabs[filteredTabs.length - 1] = {
          ...filteredTabs[filteredTabs.length - 1],
          isActive: true,
        };
      }

      return {
        ...state,
        tabs: filteredTabs,
      };
    }),
    on(selectTabInitiated, (state, { payload }) => {
      return {
        ...state,
        tabs: state.tabs.map((c, i) => ({
          ...c,
          isActive: payload.index === i ? true : false,
        })),
      };
    }),
    on(updateActiveTabInitiated, (state, { type, payload }) => ({
      ...state,
      tabs: state.tabs.map((c) =>
        c.isActive === true ? { ...c, ...payload, isActive: true } : c
      ),
    })),
    on(
      selectFileInitiated,
      selectScenarioInitiated,
      selectNodeInitiated,
      (state, { payload }) => ({
        ...state,
        tabs: state.tabs.map((c) =>
          c.isActive === true ? { ...c, ...payload } : c
        ),
      })
    ),
    on(rearrangeTabInitiated, (state, { payload }) => {
      const tabs = [...state.tabs];

      const [removed] = tabs.splice(payload.previousIndex, 1);
      tabs.splice(payload.currentIndex, 0, removed);

      return {
        ...state,
        tabs: tabs,
      };
    }),
    on(toggleTabToolbarInitiated, (state, { payload }) => ({
      ...state,
      tabs: state.tabs.map((c) =>
        c.isActive === true
          ? {
              ...c,
              toolbar: ['actions', 'scenarios'].includes(payload.toolbar)
                ? {
                    ...c.toolbar,
                    actions: false,
                    scenarios: false,
                    [payload.toolbar]: !c.toolbar[payload.toolbar],
                  }
                : {
                    ...c.toolbar,
                    [payload.toolbar]: !c.toolbar[payload.toolbar],
                  },
            }
          : c
      ),
    }))
  ),
});
