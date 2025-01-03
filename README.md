# MQTT React Native App

A React Native application that connects to an MQTT broker, displays received messages, and allows users to configure MQTT settings dynamically. This app supports real-time status updates and error handling.

---

## Features

- **MQTT Connection**: Connect and disconnect from an MQTT broker.
- **Real-time Messages**: Display incoming messages in real-time.
- **Dynamic Settings**: Configure broker settings (domain, port, client ID, and topic) through the app.
- **Error Handling**: Display errors if the connection fails or is lost.
- **Custom UI**: Stylish buttons and user-friendly interface.

---

## Screenshots

<!-- Add image URLs or local paths -->
![collage](https://github.com/user-attachments/assets/ea1d50bf-80e8-458e-997b-e92f0f23a8ac)

![collage 2](https://github.com/user-attachments/assets/993c1d93-5204-47e8-9576-fad3ebed65a9)

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/mqtt-react-native-app.git
   cd mqtt-react-native-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Install React Native Async Storage**:
   ```bash
   npm install @react-native-async-storage/async-storage
   ```

4. **Install React Native MQTT Library**:
   ```bash
   npm install react-native-paho-mqtt
   ```

5. **Link Native Modules** (if required):
   ```bash
   npx react-native link
   ```

6. **Run the App**:
   - For Android:
     ```bash
     npx react-native run-android
     ```
   - For iOS:
     ```bash
     npx react-native run-ios
     ```

---

## Usage

1. Open the app on your device.
2. Go to **Settings**:
   - Enter the MQTT broker domain, port, client ID, and topic.
   - Save the settings.
3. On the **Home Screen**:
   - Press the **Connect** button to establish a connection.
   - View incoming messages in real-time.
   - Disconnect when needed.
4. Handle errors gracefully with notifications and alerts.

---

## Code Overview

### Home Screen (`home.tsx`)
- Manages MQTT connection.
- Displays status, messages, and allows connecting/disconnecting.

### Settings Screen (`settings.tsx`)
- Allows dynamic configuration of MQTT settings.
- Saves settings to Async Storage.

---

## Dependencies

- React Native
- React Native Async Storage
- React Native Paho MQTT

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## License

This project is licensed under the MIT License.

---

