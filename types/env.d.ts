export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_TELEMETRY_DISABLED: string; // 1 | 0.
      DB_FILE_NAME: string;
    }
  }
}
