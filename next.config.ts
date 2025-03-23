import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  eslint: {
    dirs: ['app', 'functions/src']
  },
  // webpack: (config) => {
  //   return Object.assign({}, config, {
  //     entry: function () {
  //       return config.entry().then((entry: unknown) => {
  //         // Compile extra service workers
  //         return Object.assign({}, entry, {
  //           '../static/firebase-messaging-sw': {
  //             import: './workers/firebase-messaging-sw.ts',
  //             dependOn: undefined
  //           }
  //         })
  //       })
  //     }
  //   })
  // }
};

export default nextConfig;
