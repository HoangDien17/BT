import { config } from 'dotenv';
export const envLoader = async () => {
  config();
};