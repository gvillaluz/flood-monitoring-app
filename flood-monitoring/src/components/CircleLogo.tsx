import { Image } from "react-native";
import Logo from '../../assets/images/circle-logo.png';

export default function CircleLogo() {
    return <Image 
        source={Logo}
        className="h-[120px] w-[120px]"
        resizeMode="contain"
    />
}