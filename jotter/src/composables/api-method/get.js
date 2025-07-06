import axios from 'axios';
import { Cookies, QSpinnerGears } from 'quasar';
import { loadingMessage } from '../notify/loadingMessage';
import { successMessage } from '../notify/successMessage';
import { errorMessage } from '../notify/errorMessage';

export async function getMethod(serverURL, url, $q, successMsg) {
  try {
    const response = await axios.get(`${serverURL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Ошибка:', error.response?.data);
    errorMessage($q, `Ошибка: ${error.response?.data.message}`);
  } finally {
    $q.loading.hide();
  }
}
