export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      NEXT_TELEMETRY_DISABLED: string; // 1 | 0.
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_LOCALE: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_PORT: string;
      DB_HOST: string;
      DB_TYPE: string;
    }
  }
}
