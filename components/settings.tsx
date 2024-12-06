import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ navigation }: { navigation: any }) => {
  const [domain, setDomain] = useState<string>(''); // For the broker's domain
  const [port, setPort] = useState<string>(''); // Default port
  const [clientId, setClientId] = useState<string>(''); 
  const [topic, setTopic] = useState<string>(''); 

  useEffect(() => {
    const loadSettings = async () => {
      const savedDomain = await AsyncStorage.getItem('brokerDomain');
      const savedPort = await AsyncStorage.getItem('brokerPort');
      const savedClientId = await AsyncStorage.getItem('clientId');
      const savedTopic = await AsyncStorage.getItem('topic');

      setDomain(savedDomain || 'broker.hivemq.com'); // Default domain
      setPort(savedPort || '8884'); // Default port
      setClientId(savedClientId || `mqtt-client-${Math.random().toString(16).slice(2)}`);
      setTopic(savedTopic || 'test/duhun'); // Default topic
    };

    loadSettings();
  }, []);

  const saveSettings = async () => {
    await AsyncStorage.setItem('brokerDomain', domain);
    await AsyncStorage.setItem('brokerPort', port);
    await AsyncStorage.setItem('clientId', clientId);
    await AsyncStorage.setItem('topic', topic);
    alert('Settings saved!');
    navigation.goBack(); // Go back to the home screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <TextInput
        style={styles.input}
        placeholder="Broker Domain (e.g., broker.hivemq.com)"
        value={domain}
        onChangeText={setDomain}
      />
      <TextInput
        style={styles.input}
        placeholder="Port (e.g., 8884)"
        value={port}
        keyboardType="numeric"
        onChangeText={setPort}
      />
      <TextInput
        style={styles.input}
        placeholder="Client ID"
        value={clientId}
        onChangeText={setClientId}
      />
      <TextInput
        style={styles.input}
        placeholder="Topic"
        value={topic}
        onChangeText={setTopic}
      />
      <Button title="Save" onPress={saveSettings} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Settings;
