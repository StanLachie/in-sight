export const fetchPage = async (url: string) => {
  try {
    const response = await fetch(url);
    return response.text();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};
