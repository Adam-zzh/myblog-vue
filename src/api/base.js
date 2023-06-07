import {get,post} from './request'

let apiFun = {
  login: param => post('/admin/userController/login', param)
};
export default apiFun;
