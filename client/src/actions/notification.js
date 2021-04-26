import axios from 'axios';
import { toast } from 'react-toastify';

const API = 'api/v1';

// Subscribe notification.
export const subscribeNotification = (dataObj) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(dataObj);

  try {
    await axios.post(`/${API}/notifications`, body, config);
    toast.success('Notification successfully subscribed!');
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        toast.error(`${error.param}: ${error.msg}`);
        console.log(error);
      });
    }
  }
};
