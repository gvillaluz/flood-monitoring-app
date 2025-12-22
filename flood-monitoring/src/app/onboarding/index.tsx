import { useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from "react-native";
import FirstScreen from "../../screens/Onboarding/FirstScreen";
import SecondScreen from "../../screens/Onboarding/SecondScreen";
import ThirdScreen from "../../screens/Onboarding/ThirdScreen";

export default function OnBoarding() {
  const [page, setPage] = useState(0);
  const { width, height } = Dimensions.get('window');
  const [dotColor, setDotColor] = useState('#FFFFFF');

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const currentPage = Math.round(offsetX / width)
    setPage(currentPage)

    const color = currentPage === 1 ? 'rgba(43, 106, 237, 1)' : '#FFFFFF';
    setDotColor(color)
  }

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      > 
        <FirstScreen width={width} />
        <SecondScreen width={width} />
        <ThirdScreen width={width} />
      </ScrollView>
      
      <View
        className="absolute w-full bottom-16 items-center justify-center flex-row gap-[7]"
      > 
        {[0, 1, 2].map(i => (
          <View 
            key={i}
            className="h-[8] w-[8] rounded"
            style={{
              backgroundColor: page === i ? dotColor : '#D9D9D9'
            }}
          />
        ))}
      </View>
    </View>
  );
}