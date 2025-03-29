import React from 'react'

interface FormValues {
    startStopResources?: boolean;
    startStop?: {
        [key: string]: boolean;
    };
    pauseResumeResources?: boolean;
    pauseResume?: {
        [key: string]: boolean;
    };
    resourceCleanup?: boolean;
    resourceCleanupOptions?: {
        [key: string]: boolean;
    };
}

interface SelectActionsProps {
    formValues: any;
    updateFormData: (data: any) => void;
}

const SelectActions: React.FC<SelectActionsProps> = ({ formValues, updateFormData }) => {

    const handleCheckboxChange = (group: string, name: string) => {
        updateFormData({
            [group]: { ...formValues[group], [name]: !formValues[group]?.[name] },
        });
    };
    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Cost Saving Actions</h2>

            {/* Start-Stop Resources */}
            <div className="mb-4">
                <label className="flex items-center space-x-2 font-medium">
                    <input
                        type="checkbox"
                        checked={formValues.startStopResources || false}
                        onChange={() => {
                            const newValue = !formValues.startStopResources;
                            updateFormData({
                                startStopResources: newValue,
                                startStop: {
                                    EC2: newValue,
                                    RDS: newValue,
                                    "Light Sail": newValue,
                                    "Amazon Neptune": newValue,
                                },
                            });
                        }}
                    />
                    <span>Start-Stop Resources</span>
                </label>
                <div className="ml-6 space-y-2">
                    {["EC2", "RDS", "Light Sail", "Amazon Neptune"].map((service) => (
                        <label key={service} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={formValues.startStop?.[service] || false}
                                onChange={() => handleCheckboxChange("startStop", service)}
                            />
                            <span>{service}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Pause-Resume Resources */}
            <div className="mb-4">
                <label className="flex items-center space-x-2 font-medium">
                    <input
                        type="checkbox"
                        checked={formValues.pauseResumeResources || false}
                        onChange={() => {
                            const newValue = !formValues.pauseResumeResources;
                            updateFormData({
                                pauseResumeResources: newValue,
                                pauseResume: {
                                    "Redshift Clusters": newValue,
                                    "Aurora Serverless V2": newValue,
                                },
                            });
                        }}
                    />
                    <span>Pause-Resume Resources</span>
                </label>
                <div className="ml-6 space-y-2">
                    {["Redshift Clusters", "Aurora Serverless V2"].map((service) => (
                        <label key={service} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={formValues.pauseResume?.[service] || false}
                                onChange={() => handleCheckboxChange("pauseResume", service)}
                            />
                            <span>{service}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Resource Cleanup */}
            <div className="mb-4">
                <label className="flex items-center space-x-2 font-medium">
                    <input
                        type="checkbox"
                        checked={formValues.resourceCleanup || false}
                        onChange={() => {
                            const newValue = !formValues.resourceCleanup;
                            updateFormData({
                                resourceCleanup: newValue,
                                resourceCleanupOptions: {
                                    "Terminate EC2": newValue,
                                    "Delete EBS Volume": newValue,
                                    "Delete EBS Snapshot": newValue,
                                    "Delete RDS": newValue,
                                    "Delete RDS Snapshot": newValue,
                                },
                            });
                        }}
                    />
                    <span>Resource Cleanup</span>
                </label>
                <div className="ml-6 space-y-2">
                    {["Terminate EC2", "Delete EBS Volume", "Delete EBS Snapshot", "Delete RDS", "Delete RDS Snapshot"].map(
                        (service) => (
                            <label key={service} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formValues.resourceCleanupOptions?.[service] || false}
                                    onChange={() => handleCheckboxChange("resourceCleanupOptions", service)}
                                />
                                <span>{service}</span>
                            </label>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default SelectActions