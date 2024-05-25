import axios from 'axios';
import { toast } from 'react-toastify';

export const handleHttpError = (error) => {
  let errMeg;
  if (axios.isCancel(error)) {
    errMeg = `Request canceled: ${error.message}`;
  } else if (error.response) {
    const { status } = error.response;
    if (status >= 500) {
      errMeg = 'Server error';
    } else if (error.response.data.detail) {
      errMeg = error.response.data.detail;
    } else if (error.response.data.non_field_errors) {
      errMeg = error.response.data.non_field_errors[0];
    } else if (error.response.data.name) {
      errMeg = error.response.data.name[0];
    } else if (error.response.data.message) {
      errMeg = error.response.data.message;
    } else if (status === 403) {
      errMeg = 'Taqiqlangan';
    } else {
      errMeg = `${error.message}`;
    }
  } else if (error.request) {
    if (error.request.status === 0) {
      errMeg = "Internetga ulanmagansiz, iltimos internetga ulanib qaytib harakat qilib ko'ring";
    } else {
      errMeg = `No response received. Status code: ${error.request.status}`;
    }
  } else {
    errMeg = `Error: ${error.message}`;
  }
  toast.error(errMeg, { position: 'top-right', theme: 'colored', autoClose: 3000 });
};
