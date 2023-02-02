import axios from 'axios';

const instance = axios.create({
  baseURL: `https://pixabay.com/api`,
  params: {
    q: '',
    page: 1,
    key: '31930152-30d8507b21f279e62dc6170e1',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const searchImages = async (q, page = 1) => {
  const { data } = await instance.get('/', { params: { q, page } });
  return data;
};