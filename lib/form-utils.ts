/**
 * Converts form data with potential File inputs to a string-only record
 * @param formData Form data that may contain File or string values
 * @returns A record with only string values
 */
export function processFormData(formData: Record<string, string | File>): Record<string, string> {
  const processedData: Record<string, string> = {};
  Object.keys(formData).forEach(key => {
    const value = formData[key];
    processedData[key] = value instanceof File ? value.name : value as string;
  });
  return processedData;
}

/**
 * A higher-order function to wrap submit actions for dynamic forms
 * @param submitAction The original submit action that expects string-only data
 * @returns A new function that can handle mixed File and string inputs
 */
export function wrapFormSubmit<T extends (data: Record<string, string>) => Promise<void>>(
  submitAction: T
): (data: Record<string, string | File>) => Promise<void> {
  return async (formData: Record<string, string | File>) => {
    const processedData = processFormData(formData);
    return submitAction(processedData);
  };
}
