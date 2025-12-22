import { Image } from "react-native";
import Logo from '../../assets/images/onboarding-logo.png';

export default function LigtasCheckLogo() {
    return <Image 
        source={Logo}
        className={`h-[130px] w-[130px]`}
        resizeMode="contain"
    />
}