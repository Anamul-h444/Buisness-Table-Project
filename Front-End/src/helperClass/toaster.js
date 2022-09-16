import toast from 'react-hot-toast';

class ToastHelper {
  SuccessToast(param){
    return toast.success(param)
  }
  ErrorToast(param){
    return toast.error(param)
  }
}
export const {
    SuccessToast, 
    ErrorToast
 } = new ToastHelper();