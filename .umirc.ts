import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  extraBabelPlugins:[ 
   [
    'import',
    {
      libraryName: 'project',
      camel2DashComponentName: false,
      "customName": (name: string) => `project/es/${name}`
    },
   ]
  ],
});
