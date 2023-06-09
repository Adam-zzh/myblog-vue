import {get, post} from '@/setting/request.js';

let apiFun = {
  login: param => post('/admin/userController/login', param)
};
export default apiFun;
