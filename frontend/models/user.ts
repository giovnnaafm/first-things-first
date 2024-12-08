export interface User {
  name: string;
  email: string;
  password_hash: string;
  atlassian_access_token?: string;
  atlassian_cloud_id?: string;
  atlassian_token_updated_at?: string;
  created_at?:string;
}
