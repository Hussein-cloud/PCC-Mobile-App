import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import CantSignInModal from '../screens/CantSignInModal';
import styles from '../style/styles'
export default function CantSignInText() {
    const [modalVisible, setModalVisible] = useState(false);

    const popupModal = () => {
        setModalVisible(true);
    };

    return (
        <View>
            <TouchableOpacity onPress={popupModal}>
                <Text style={styles.text}>
                    Can't sign in?
                </Text>
            </TouchableOpacity>
            <CantSignInModal visible={modalVisible} setVisible={setModalVisible} />
        </View>
    );
}


