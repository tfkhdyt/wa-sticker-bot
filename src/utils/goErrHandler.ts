const goErrorHandler = async <T>(
  callback: () => Promise<T>
): Promise<[T | null, unknown]> => {
  try {
    const data = await callback();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export default goErrorHandler;
