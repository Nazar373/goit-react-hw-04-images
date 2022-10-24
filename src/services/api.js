import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const KEY = '29429683-7d5809707a43a8cff1be91c83';
const OPTIONS = 'image_type=photo&orientation=horizontal&per_page=12';

const fetchItems = async (value, page) => {
  return await axios.get(`?q=${value}&page=${page}&key=${KEY}&${OPTIONS}`);
};

export default fetchItems;
