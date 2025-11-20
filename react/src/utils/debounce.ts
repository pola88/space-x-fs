export const debounce = <T extends (...args: any[]) => any>(func: T, delay: number) => {
  let timer: NodeJS.Timeout | null = null; 

  return (...args: Parameters<T>) => {
      const context = this;
      if (timer) {
          clearTimeout(timer);
      }
      timer = setTimeout(() => {
          func.apply(context, args);
      }, delay);
  };
}