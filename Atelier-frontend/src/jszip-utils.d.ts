declare module 'jszip-utils' {
    const getBinaryContent: (path: string, callback: (error: any, data: any) => void) => void;
    export { getBinaryContent };
  }
  