export const useEmail = () => {
  const sendEmail = async (text: string) => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return { sendEmail };
};
