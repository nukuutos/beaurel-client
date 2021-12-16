// mutate object!
const reorderSubServices = (subServices) => {
  for (let i = 0; i < subServices.length; i++) {
    const currentSubService = subServices[i];
    currentSubService.subOrder = i;
  }

  return subServices;
};

export default reorderSubServices;
