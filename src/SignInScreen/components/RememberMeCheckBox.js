import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import CheckBox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/styles'
export default function RememberMeCheckBox({ onRememberMeChange }) {
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const loadRememberMe = async () => {
            try {
                const value = await AsyncStorage.getItem('rememberMe');
                if (value !== null) {
                    const parsedValue = JSON.parse(value);
                    setRememberMe(parsedValue);
                    onRememberMeChange(parsedValue);
                }
            } catch (e) {
                console.error('Failed to load remember me option...', e);
            }
        };
        loadRememberMe();
    }, []);

    const handleRememberMeChange = async (newValue) => {
        setRememberMe(newValue);
        onRememberMeChange(newValue);
        try {
            await AsyncStorage.setItem('rememberMe', JSON.stringify(newValue));
            if (!newValue) {
                await AsyncStorage.removeItem('employeeID');
                await AsyncStorage.removeItem('password');
            }
        } catch (e) {
            console.error('Failed to save rememberMe', e);
        }
    };

    return (
        <View style={styles.containerRemember}>
            <CheckBox
                value={rememberMe}
                onValueChange={handleRememberMeChange}
                style={styles.checkBoxRemember}
            />
            <Text style={styles.labelRemember}>Remember me</Text>
        </View>
    );
};
