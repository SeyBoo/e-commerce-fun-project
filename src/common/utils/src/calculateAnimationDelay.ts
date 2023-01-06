export const calculateAnimationDelay = (index: number): number => {
  let i = index;
  if (i > 3) {
    i = i % 4;
  }
  const baseDelay = 0.075;

  return baseDelay * i;
};
