import { create } from "zustand/react";
import type { IPreview } from "../types/types.ts";

interface CurrentPreviewState {
  currentPresentation: IPreview | null;
  setCurrentPresentation: (preview: IPreview | null) => void;
}

export const useCurrentPreviewStore = create<CurrentPreviewState>((set) => ({
  currentPresentation: null,
  setCurrentPresentation: (preview) => set({ currentPresentation: preview }),
}));
