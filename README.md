# Welcome to your Expo App 👋

This is an [Expo](https://expo.dev) project built using [Expo Application Services (EAS)](https://expo.dev/eas).

## Get Started

1. **Install dependencies**  

   ```bash
   npm install
   ```

2. **Prebuild the project**  

   ```bash
   npx expo prebuild
   ```

3. **Open the project in Xcode**  

   ```bash
   open ios/OnlineEyeTestFrontend.xcworkspace
   ```

4. **Set up build configuration**  
   - Set the build configuration to `Release`.
   - In the Xcode project navigator, select your project, go to the **"Signing & Capabilities"** tab, and set your Team Name and Bundle Identifier.  
   - If you don’t have an Apple Developer account, register here: [Apple Developer Program](https://developer.apple.com/programs/).

5. **Run the app on a physical iOS device**  
   - Choose your local device in Xcode, then click **Run**.

## Troubleshooting

1. **Error: "No script URL provided..."**
   - Make sure the Metro Bundler is running:  
     ```bash
     npx expo start
     ```
   - Ensure your phone and computer are on the same network, and VPNs are disabled.

2. **Rebuild if necessary**  
   If issues persist, remove the `ios` directory and prebuild again:  
   ```bash
   rm -rf ios
   npx expo prebuild
   ```

