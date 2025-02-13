import { Text, View, TouchableOpacity, Platform, Image, StyleSheet } from 'react-native';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';

const Gallery = () => {
    const os = Platform.OS;
    const [selectedImage, setSelectedImage] = useState(null);

    const handleGalleryOpen = () => {
        request(os === "ios" ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then((status) => {
            if (status === "granted") {
                launchImageLibrary({ mediaType: 'photo' }, (response) => {
                    if (!response.didCancel && response.assets && response.assets.length > 0) {
                        setSelectedImage(response.assets[0].uri);
                    }
                });
            }
        });
    };

    return (
        <View style={styles.container}>
            {selectedImage && (
                <Image
                    style={styles.image}
                    source={{ uri: selectedImage }}
                />
            )}

            <TouchableOpacity onPress={handleGalleryOpen} style={styles.button}>
                <Text style={styles.buttonText}>Select an image</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
    button: {
        width: '100%',
        backgroundColor: '#1E3A8A',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Bold',
    },
});

export default Gallery;