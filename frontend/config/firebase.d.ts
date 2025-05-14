declare module '../config/firebase' {
  import { Database } from 'firebase/database';
  import { Auth } from 'firebase/auth';
  
  export const database: Database;
  export const auth: Auth;
} 