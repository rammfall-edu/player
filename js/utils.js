export const calcTime = (seconds) => {
  const date = new Date(seconds * 1000);

  return `${date.getMinutes().toString()}:${date.getSeconds().toString().padStart(2, '0')}`;
}
