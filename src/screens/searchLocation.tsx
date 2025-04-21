import axios from 'axios';

const API_KEY = '6e757cf97f9c47f2a530ea7fcbc53050';  // Thay thế bằng API Key của bạn

export const searchLocation = async (query) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${API_KEY}`
    );
    if (response.data.results.length > 0) {
      return response.data.results;
    } else {
      return [];  // Không tìm thấy địa điểm
    }
  } catch (error) {
    console.error('Error searching location:', error);
    return [];
  }
};
