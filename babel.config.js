module.exports = function (api) {
  api.cache(true);
  return {
    // Resolved from the `expo` package itself (not a standalone `babel-preset-expo`
    // dependency) so this preset can never drift out of sync with the installed
    // Expo SDK version — see loadBabelConfig.js in @expo/metro-config for the
    // same resolution order.
    presets: ["expo/internal/babel-preset"],
    // Must be listed last — required by react-native-reanimated v4 / react-native-worklets.
    plugins: ["react-native-worklets/plugin"],
  };
};
