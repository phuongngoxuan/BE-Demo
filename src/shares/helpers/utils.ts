import ShortUniqueId from 'short-unique-id';

export const sleep = (time: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, time));

export const uid = new ShortUniqueId({ dictionary: 'hex', length: 15 });

export const checkElementsExist = (sourceArray: number[], targetArray: number[]): boolean => {
  return sourceArray.some((element) => targetArray.includes(element));
};
