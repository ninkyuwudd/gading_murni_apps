import {AfterServiceFormValues} from '../@types/service';

export const formatWithThousandSeparator = (value: number | string): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) {
    throw new Error('Input must be a valid number or numeric string');
  }
  return num.toLocaleString('en-US');
};

export const recalculateServiceCost = (
  data: AfterServiceFormValues['serviceItems'],
): AfterServiceFormValues['serviceItems'] => {
  let totalCost = data.list.reduce((sum, item) => {
    return sum + Number(item.cost) * Number(item.amount);
  }, 0);

  data.serviceCost = totalCost ? String(totalCost) : '';
  return data;
};

export const convertToInternationalFormat = (phoneNumber: string): string => {
  const regex = /^0/;
  return phoneNumber.replace(regex, '+62');
};

export const convertServiceType = (
  type: 'NEW_INSTALL' | 'SERVICES',
): string => {
  return type === 'NEW_INSTALL' ? 'Install Baru' : 'Servis';
};
