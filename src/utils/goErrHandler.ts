type Result<T> = {
  data?: T | null;
  error: unknown;
};

const goErrorHandler = async <T>(
  callback: () => Promise<T>
): Promise<Result<T>> => {
  try {
    const data = await callback();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export default goErrorHandler;
