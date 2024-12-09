import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const TermsOfAgreement = () => {
    const router = useRouter();

    const handleAgree = () => {
        router.push('/StartScreen'); // Navigate to Start Screen after agreeing
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Terms of Agreement</Text>
                <Text style={styles.content}>
                    Welcome to the Terms of Agreement. By using this app, you agree to the following terms:
                    {"\n\n"}1. You will use this app for personal purposes only.
                    {"\n\n"}2. You will not misuse or attempt to reverse-engineer this application.
                    {"\n\n"}3. The developers of this app are not responsible for any harm caused by the misuse of this app.
                    {"\n\n"}4. All user data collected through this app is handled according to our privacy policy.
                    {"\n\n"}5. This app may be updated periodically, and continued use of the app implies acceptance of the updated terms.
                    {"\n\n"}6. The app is provided "as is" without warranty of any kind.
                    {"\n\n"}7. You acknowledge that visual testing results may vary based on device conditions.
                    {"\n\n"}Please read these terms carefully before proceeding.
                </Text>
                <Text style={styles.content}>
                    Additional Information:
                    {"\n\n"}- This app requires camera permissions to perform visual tests.
                    {"\n\n"}- Please use the app in a well-lit environment for accurate results.
                    {"\n\n"}- For further questions, contact support@example.com.
                </Text>
                <TouchableOpacity style={styles.button} onPress={handleAgree}>
                    <Text style={styles.buttonText}>I Agree</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    scrollContent: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    content: {
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 20,
        color: '#333',
        lineHeight: 22,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TermsOfAgreement;