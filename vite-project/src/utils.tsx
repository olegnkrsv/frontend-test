export const throttle = <T extends (...args: any[]) => void>(func: T, delay: number) => {
    let throttled = false;
  
    return (...args: Parameters<T>) => {
      if (!throttled) {
        func(...args);
        throttled = true;
        setTimeout(() => {
          throttled = false;
        }, delay);
      }
    };
  };