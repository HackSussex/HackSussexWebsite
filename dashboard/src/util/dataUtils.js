export const arrayFromData = (data, primaryKey) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data[primaryKey] || [];
};