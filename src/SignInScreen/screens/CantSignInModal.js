import React from 'react';
import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';
import styles from '../style/styles'
export default function CantSignInModal({ visible, setVisible }) {
    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.textStyle}>
                        If you are having trouble logging in, 
                        please contact your administrator for assistance with checking or resetting your password.
                    </Text>
                    <Pressable 
                        style={styles.okButton} 
                        onPress={() => setVisible(false)}
                    >
                        <Text style={styles.buttonText}>OK</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};
