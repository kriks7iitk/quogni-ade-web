export const createError = (
  ERROR_CODE_OBJECT: any,
  ERROR_MESSAGE_OBJECT: any,
  ERROR_TYPE: string,
) => {
  return {
    code: ERROR_CODE_OBJECT[ERROR_TYPE],
    message: ERROR_MESSAGE_OBJECT[ERROR_TYPE],
  };
};
