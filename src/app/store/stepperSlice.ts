// stepperSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define this in a shared types file or at least make sure it matches the component's FormValues
interface FormValues {
  startStopResources?: boolean;
  startStop?: Record<string, boolean>;
  pauseResumeResources?: boolean;
  pauseResume?: Record<string, boolean>;
  resourceCleanup?: boolean;
  resourceCleanupOptions?: Record<string, boolean>;
}

interface StepperState {
  currentStep: number;
  formData: { [key: number]: FormValues }; // Use FormValues here
}

const initialState: StepperState = {
  currentStep: 1,
  formData: {},
};

const stepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < 4) state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 1) state.currentStep -= 1;
    },
    updateFormData: (state, action: PayloadAction<{ step: number; data: FormValues }>) => {
      const { step, data } = action.payload;
      state.formData[step] = { ...state.formData[step], ...data };
    },
  },
});

export const { nextStep, prevStep, updateFormData } = stepperSlice.actions;
export default stepperSlice.reducer;