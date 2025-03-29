"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { nextStep, prevStep, updateFormData } from "../store/stepperSlice";
import Fetch from "./addAccountSections/Fetch";
import LinkAwsAc from "./addAccountSections/LinkAwsAc";
import SelectActions from "./addAccountSections/SelectActions";
import Start from "./addAccountSections/Start";
import { useState, useEffect } from "react";

interface FormValues {
  startStopResources?: boolean;
  startStop?: Record<string, boolean>;
  pauseResumeResources?: boolean;
  pauseResume?: Record<string, boolean>;
  resourceCleanup?: boolean;
  resourceCleanupOptions?: Record<string, boolean>;
}

const steps = ["Start", "Select Actions", "Link AWS A/c", "Fetch"];

const Stepper = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state: RootState) => state.stepper.currentStep);
  const formData = useSelector((state: RootState) => state.stepper.formData);

  const [formValues, setFormValues] = useState<FormValues>({
    startStopResources: false,
    startStop: {
      EC2: false,
      RDS: false,
      "Light Sail": false,
      "Amazon Neptune": false,
    },
    pauseResumeResources: false,
    pauseResume: {
      "Redshift Clusters": false,
      "Aurora Serverless V2": false,
    },
    resourceCleanup: false,
    resourceCleanupOptions: {
      "Terminate EC2": false,
      "Delete EBS Volume": false,
      "Delete EBS Snapshot": false,
      "Delete RDS": false,
      "Delete RDS Snapshot": false,
    },
  });

  useEffect(() => {
    if (formData[currentStep]) {
      setFormValues(prev => ({
        ...prev,
        ...formData[currentStep]
      }));
    }
  }, [currentStep, formData]);

  const handleNext = () => {
    dispatch(updateFormData({ step: currentStep, data: formValues }));
    dispatch(nextStep());
  };

  const handleBack = () => {
    dispatch(updateFormData({ step: currentStep, data: formValues }));
    dispatch(prevStep());
  };

  return (
    <div className="w-[70%] border-1 rounded-sm p-5 bg-[#B6B6D5]" style={{ boxShadow: '7px 7px black' }}>
      {/* Stepper Progress Indicator */}
      <div className="flex items-center justify-between w-full relative mb-8">
        <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
        <div
          className="absolute top-4 left-0 h-1 bg-[#7551a5] -z-10 transition-all duration-300 ease-out"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, index) => (
          <div key={index} className="flex items-center justify-center z-10 h-5 gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              index + 1 < currentStep ? 'bg-[#0E0F23] text-white' :
              index + 1 === currentStep ? 'bg-white border-2 border-[#0E0F23] text-blue-500' :
              'bg-gray-200 text-gray-500'}`}
            >
              {index + 1}
            </div>
            <p className={`text-sm ${index + 1 === currentStep ? "font-semibold text-[#0E0F23]" : "text-gray-500"}`}>
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="border p-4 rounded-lg shadow-md h-[70%] overflow-y-auto">
        {currentStep === 1 && <Start />}
        {currentStep === 2 && (
          <SelectActions
            formValues={formValues}
            updateFormData={(data) => setFormValues(prev => ({ ...prev, ...data }))}
          />
        )}
        {currentStep === 3 && <LinkAwsAc />}
        {currentStep === 4 && <Fetch />}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50 cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 cursor-pointer"
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Stepper;