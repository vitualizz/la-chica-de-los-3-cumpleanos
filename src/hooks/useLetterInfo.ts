type LetterInfo = {
  isAvailable: boolean;
  timeUntil: number | null;
};

const useLetterInfo = (letterDay?: number): LetterInfo => {
  if (!letterDay) {
    return { isAvailable: true, timeUntil: null };
  }

  const now = new Date();

  // Fecha límite (último día de agosto 2025)
  const augustLimit = new Date(2025, 7, 31, 23, 59, 59);

  let isAvailable = false;
  let timeUntil: number | null = null;

  if (now > augustLimit) {
    // Después de agosto 2025 siempre disponible
    isAvailable = true;
  } else if (now.getFullYear() === 2025 && now.getMonth() === 7) {
    // En agosto 2025
    const targetDate = new Date(2025, 7, letterDay); // ej: 28/08/2025
    const diffMs = targetDate.getTime() - now.getTime();

    if (diffMs <= 0) {
      isAvailable = true;
    } else {
      timeUntil = diffMs;
    }
  }

  return { isAvailable, timeUntil };
};

export default useLetterInfo;
