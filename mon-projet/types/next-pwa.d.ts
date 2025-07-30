/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'next-pwa' {
  import { NextConfig } from 'next';

  type PWAOptions = {
    dest: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    buildExcludes?: string[];
    runtimeCaching?: any;
    [key: string]: any;
  };

  function withPWA(config: PWAOptions): (nextConfig: NextConfig) => NextConfig;

  export default withPWA;
}
