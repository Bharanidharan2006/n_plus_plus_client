const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const ALIASES = {
  tslib: require.resolve('tslib/tslib.es6.js'),
  'tslib/modules/index.js': require.resolve('tslib/tslib.es6.js'),
};

config.resolver.sourceExts = config.resolver.sourceExts.filter((ext) => ext !== 'wasm');
config.resolver.assetExts = [...config.resolver.assetExts, 'wasm'];

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const alias = ALIASES[moduleName];
  return context.resolveRequest(context, alias ?? moduleName, platform);
};

config.symbolicator = config.symbolicator || {};
config.symbolicator.customizeFrame = (frame) => {
  try {
    if (!frame || !frame.file) return {};
    if (typeof frame.file === 'string' && frame.file.includes('<anonymous>')) {
      return { collapse: true };
    }
  } catch {}
  return {};
};

config.symbolicator.customizeStack = async (stack) => {
  try {
    return stack.filter((frame) => typeof frame.file === 'string' && !frame.file.includes('<anonymous>'));
  } catch {
    return stack;
  }
};

module.exports = config;
