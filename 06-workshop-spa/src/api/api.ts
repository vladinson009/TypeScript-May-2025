import type {
  CreatePostType,
  CreateUserType,
  MethodType,
  OptionsType,
} from '../types/ApiTypes';

const baseUrl = 'https://jsonplaceholder.typicode.com';

async function fetcher<TData, VReturn>(
  url: string,
  method: MethodType,
  data?: TData
): Promise<VReturn> {
  const options: OptionsType = {
    method,
    headers: {},
  };
  if (data) {
    options.headers!['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  try {
    const response = await fetch(baseUrl + url, options);
    return response.json();
  } catch (error) {
    alert(error);
    return Promise.reject(error);
  }
}

function get<TData>(url: string): Promise<TData> {
  return fetcher<undefined, TData>(url, 'GET');
}
function post<TData>(
  url: string,
  data: CreateUserType | CreatePostType
): Promise<TData> {
  return fetcher<typeof data, TData>(url, 'POST', data);
}
function put<TData>(
  url: string,
  data: CreateUserType | CreatePostType
): Promise<TData> {
  return fetcher<typeof data, TData>(url, 'PUT', data);
}
function del(url: string): Promise<void> {
  return fetcher<undefined, void>(url, 'DELETE');
}
export default { get, post, put, del };
