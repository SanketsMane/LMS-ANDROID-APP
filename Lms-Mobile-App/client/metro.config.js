const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Only support mobile platforms
config.resolver.platforms = ['ios', 'android', 'native'];

// Block specific web-specific imports that cause issues, but allow reanimated web files
config.resolver.blockList = [
  /.*\/node_modules\/react-native\/Libraries\/Utilities\/Platform\.js$/,
  /.*\/node_modules\/lottie-react-native\/.*\/.*\.web\.(js|ts|jsx|tsx)$/,
  // Allow react-native-reanimated web files to load
  /.*\/node_modules\/(?!react-native-reanimated).*\/.*\.web\.(js|ts|jsx|tsx)$/,
];

// Disable web transformations
config.transformer = {
  ...config.transformer,
  enableBabelRCLookup: false,
  platforms: ['ios', 'android'],
};

module.exports = config;