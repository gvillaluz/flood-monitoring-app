import { Image } from "react-native";
import Location from '../../assets/images/location-logo.png';

export default function LocationIcon() {
    return (
        <Image
            source={Location}
            resizeMode="contain"
        />
    )
}