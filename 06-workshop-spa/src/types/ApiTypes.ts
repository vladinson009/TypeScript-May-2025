interface Geo {
  lat: string;
  lng: string;
}
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}
type CreateUserType = Omit<UserType, 'id'>;
type CreatePostType = Omit<PostType, 'id'>;

type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface OptionsType {
  method: MethodType;
  headers?: {
    'Content-Type'?: 'application/json';
  };
  body?: string;
}
export type {
  MethodType,
  UserType,
  PostType,
  CreateUserType,
  CreatePostType,
  OptionsType,
};
