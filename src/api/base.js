import {get,post} from './request'

let apiFun = {
  postLogin: param => post('api/v1/users/my_address/address_edit_before', param)
};
export default apiFun;
