import React from 'react'

interface FormValues {
    startStopResources?: boolean;
    startStop?: Record<string, boolean>;
    pauseResumeResources?: boolean;
    pauseResume?: Record<string, boolean>;
    resourceCleanup?: boolean;
    resourceCleanupOptions?: Record<string, boolean>;
}

interface SelectActionsProps {
    formValues: FormValues;
    updateFormData: (data: Partial<FormValues>) => void;
}

const SelectActions: React.FC<SelectActionsProps> = ({ formValues, updateFormData }) => {
    // Handle parent checkbox changes
    const handleParentChange = (
        parentKey: 'startStopResources' | 'pauseResumeResources' | 'resourceCleanup',
        childKey: 'startStop' | 'pauseResume' | 'resourceCleanupOptions',
        childServices: string[]
    ) => {
        const newValue = !formValues[parentKey];
        const newChildren = childServices.reduce((acc, service) => {
            acc[service] = newValue;
            return acc;
        }, {} as Record<string, boolean>);

        updateFormData({
            [parentKey]: newValue,
            [childKey]: newChildren
        });
    };

    // Handle child checkbox changes
    const handleChildChange = (
        parentKey: 'startStopResources' | 'pauseResumeResources' | 'resourceCleanup',
        childKey: 'startStop' | 'pauseResume' | 'resourceCleanupOptions',
        service: string
    ) => {
        const newChildren = {
            ...formValues[childKey],
            [service]: !formValues[childKey]?.[service]
        };

        // Check if all children are now checked/unchecked
        const allChecked = Object.values(newChildren).every(Boolean);
        const noneChecked = Object.values(newChildren).every(val => !Boolean(val));

        updateFormData({
            [childKey]: newChildren,
            [parentKey]: allChecked ? true : noneChecked ? false : undefined
        });
    };

    // Check if parent should be indeterminate
    const isIndeterminate = (childValues: Record<string, boolean> | undefined) => {
        if (!childValues) return false;
        const values = Object.values(childValues);
        const hasTrue = values.some(Boolean);
        const hasFalse = values.some(val => !Boolean(val));
        return hasTrue && hasFalse;
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Cost Saving Actions</h2>

            {/* Start-Stop Resources */}
            <div className="mb-4">
                <label className="flex items-center space-x-2 font-medium">
                    <input
                        type="checkbox"
                        checked={!!formValues.startStopResources}
                        onChange={() => handleParentChange(
                            'startStopResources',
                            'startStop',
                            ['EC2', 'RDS', 'Light Sail', 'Amazon Neptune']
                        )}
                        ref={input => {
                            if (input) {
                                input.indeterminate = isIndeterminate(formValues.startStop);
                            }
                        }}
                        className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span>Start-Stop Resources</span>
                </label>
                <div className="ml-6 space-y-2 mt-2">
                    {['EC2', 'RDS', 'Light Sail', 'Amazon Neptune'].map((service) => (
                        <label key={service} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={!!formValues.startStop?.[service]}
                                onChange={() => handleChildChange(
                                    'startStopResources',
                                    'startStop',
                                    service
                                )}
                                className="h-4 w-4 text-blue-600 rounded"
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
                        checked={!!formValues.pauseResumeResources}
                        onChange={() => handleParentChange(
                            'pauseResumeResources',
                            'pauseResume',
                            ['Redshift Clusters', 'Aurora Serverless V2']
                        )}
                        ref={input => {
                            if (input) {
                                input.indeterminate = isIndeterminate(formValues.pauseResume);
                            }
                        }}
                        className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span>Pause-Resume Resources</span>
                </label>
                <div className="ml-6 space-y-2 mt-2">
                    {['Redshift Clusters', 'Aurora Serverless V2'].map((service) => (
                        <label key={service} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={!!formValues.pauseResume?.[service]}
                                onChange={() => handleChildChange(
                                    'pauseResumeResources',
                                    'pauseResume',
                                    service
                                )}
                                className="h-4 w-4 text-blue-600 rounded"
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
                        checked={!!formValues.resourceCleanup}
                        onChange={() => handleParentChange(
                            'resourceCleanup',
                            'resourceCleanupOptions',
                            ['Terminate EC2', 'Delete EBS Volume', 'Delete EBS Snapshot', 'Delete RDS', 'Delete RDS Snapshot']
                        )}
                        ref={input => {
                            if (input) {
                                input.indeterminate = isIndeterminate(formValues.resourceCleanupOptions);
                            }
                        }}
                        className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span>Resource Cleanup</span>
                </label>
                <div className="ml-6 space-y-2 mt-2">
                    {['Terminate EC2', 'Delete EBS Volume', 'Delete EBS Snapshot', 'Delete RDS', 'Delete RDS Snapshot'].map(
                        (service) => (
                            <label key={service} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={!!formValues.resourceCleanupOptions?.[service]}
                                    onChange={() => handleChildChange(
                                        'resourceCleanup',
                                        'resourceCleanupOptions',
                                        service
                                    )}
                                    className="h-4 w-4 text-blue-600 rounded"
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

export default SelectActions;