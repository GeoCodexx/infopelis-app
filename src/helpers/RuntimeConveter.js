export const convertRuntime = (totalSeconds) => {
  const totalSecondsMod = totalSeconds * 60;
  const totalMinutes = Math.floor(totalSecondsMod / 60);

  const seconds = totalSecondsMod % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  //console.log({ h: hours, m: minutes, s: seconds });
  return { h: hours, m: minutes, s: seconds };
};
