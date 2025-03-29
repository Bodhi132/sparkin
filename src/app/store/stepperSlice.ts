import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormData {
  [key: string]: unknown; // Replace any with unknown or more specific types
}

interface StepFormData {
  [key: number]: FormData;
}

interface StepperState {
  currentStep: number;
  formData: StepFormData;
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
    updateFormData: (
      state, 
      action: PayloadAction<{ step: number; data: FormData }>
    ) => {
      const { step, data } = action.payload;
      state.formData[step] = { ...state.formData[step], ...data };
    },
  },
});

export const { nextStep, prevStep, updateFormData } = stepperSlice.actions;
export default stepperSlice.reducer;