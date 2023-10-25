export const filterFields = (objToFilter, ...fields) => {
  const copyOfObjToFilter = { ...objToFilter };
  Object.keys(objToFilter).forEach((field) => {
    if (!fields.includes(field)) delete copyOfObjToFilter[field];
  });
  return copyOfObjToFilter;
};
