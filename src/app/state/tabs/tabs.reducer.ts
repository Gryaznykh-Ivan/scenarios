import { Action, createReducer, on, createFeature } from '@ngrx/store';
import * as TabsActions from './tabs.actions';
import { ITab } from 'src/app/models/tab.model';

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
    on(TabsActions.createTabInitiated, (state) => {
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
    on(TabsActions.removeTabInitiated, (state, action) => {
      const filteredTabs = state.tabs.filter((_, i) => action.index !== i);
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
    on(TabsActions.selectTabInitiated, (state, action) => {
      return {
        ...state,
        tabs: state.tabs.map((c, i) => ({
          ...c,
          isActive: action.index === i ? true : false,
        })),
      };
    }),
    on(TabsActions.updateActiveTabInitiated, (state, { type, ...rest }) => ({
      ...state,
      tabs: state.tabs.map((c) =>
        c.isActive === true ? { ...c, ...rest, isActive: true } : c
      ),
    })),
    on(TabsActions.rearrangeTabInitiated, (state, action) => {
      const tabs = [...state.tabs];

      const [removed] = tabs.splice(action.previousIndex, 1);
      tabs.splice(action.currentIndex, 0, removed);

      return {
        ...state,
        tabs: tabs,
      };
    }),
    on(TabsActions.toggleTabToolbarInitiated, (state, action) => ({
      ...state,
      tabs: state.tabs.map((c) =>
        c.isActive === true
          ? {
              ...c,
              toolbar: ['actions', 'scenarios'].includes(action.toolbar)
                ? {
                    ...c.toolbar,
                    actions: false,
                    scenarios: false,
                    [action.toolbar]: !c.toolbar[action.toolbar],
                  }
                : {
                    ...c.toolbar,
                    [action.toolbar]: !c.toolbar[action.toolbar],
                  },
            }
          : c
      ),
    }))
  ),
});
