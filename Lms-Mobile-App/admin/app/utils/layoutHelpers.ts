// Utility functions for safe data access

export const safelyGetLayoutData = (data: any, key: string) => {
  return data?.layout?.[key] || [];
};

export const hasLayoutData = (data: any, key?: string) => {
  if (!key) {
    return data && data.layout;
  }
  return data && data.layout && data.layout[key];
};

export const getLayoutDataWithFallback = (data: any, key: string, fallback: any = []) => {
  if (hasLayoutData(data, key)) {
    return data.layout[key];
  }
  return fallback;
};