import { createSelector } from "@ngrx/store";
import { TabsFeature } from "./tabs.reducer";

export const {
    selectTabs
} = TabsFeature

export const selectActiveTab = createSelector(
    selectTabs,
    (tabs) => tabs.find(c => c.isActive === true)
)

export const selectFileId = createSelector(
    selectActiveTab,
    tab => tab!.fileId
)

export const selectScenarioId = createSelector(
    selectActiveTab,
    tab => tab!.scenarioId
)

export const selectNodeId = createSelector(
    selectActiveTab,
    tab => tab!.nodeId
)

export const selectToolbar = createSelector(
    selectActiveTab,
    tab => tab!.toolbar
)