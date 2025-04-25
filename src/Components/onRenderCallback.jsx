export const onRenderCallback = (
    id, 
    phase, 
    actualDuration, 
    baseDuration, 
    startTime, 
    commitTime, 
    interactions 
  ) => {
    if (phase === 'mount') {
      console.log(`[Profiler - ${id}] Mounted`, {
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
      });
    }
  };