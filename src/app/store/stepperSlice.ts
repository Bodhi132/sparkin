import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StepperState {
  currentStep: number;
  formData: { [key: number]: { [key: string]: any } };
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
    updateFormData: (state, action: PayloadAction<{ step: number; data: any }>) => {
      const { step, data } = action.payload;
      state.formData[step] = { ...state.formData[step], ...data };
    },
  },
});

export const { nextStep, prevStep, updateFormData } = stepperSlice.actions;
export default stepperSlice.reducer;