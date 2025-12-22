import { Image } from "react-native";
import Logo from '../../assets/images/shield-logo.png';

export default function ShieldLogo() {
    return <Image 
        source={Logo}
        className="h-[120px] w-[120px]"
        resizeMode="contain"
    />
}