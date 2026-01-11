import { Evacuation } from '@/src/types/Evacuation'
import { Ionicons } from '@expo/vector-icons'
import { ActivityIndicator, Linking, Text, TouchableOpacity, View } from 'react-native'

type ObjectProps = {
    values: Evacuation[],
    navigateCenter: (centerName: string, lat: number, long: number) => Promise<void>,
    isNavigating: string | null,
    location: {latitude: number, longitude: number} | null
}

export default function SafeZones({ values, navigateCenter, isNavigating, location }: ObjectProps) {
    return (
        <View
            className="bg-white rounded-2xl overflow-hidden p-6 gap-2"
            style={{
                borderWidth: 1,
                borderColor: 'rgba(18, 18, 18, 0.1)',
                shadowColor: 'rgba(0, 0, 0, 0.25)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 1,
                shadowRadius: 17.6,
                elevation: 6
            }}
        >
            <Text
                className="font-roboto font-bold text-normal text-secondary_black"
                style={{
                    lineHeight: 24
                }}
            >
                Nearest Safe Zones
            </Text>
            <View
                className='gap-2 pb-3'
            >
                {location ? (
                    values.map((safeZone, i) => (
                        <View
                            key={i}
                            className='flex-row justify-between items-center py-3 px-3 rounded-md overflow-hidden'
                            style={{
                                borderColor: 'rgba(34, 197, 94, 0.5)',
                                borderWidth: 0.5
                            }}
                        >
                            <View
                                className='gap-1 flex-1 pr-2'
                            >
                                <Text
                                    className='font-roboto text-secondary_black'
                                    style={{
                                        fontSize: 13,
                                        flexShrink: 1
                                    }}
                                >
                                    {safeZone.centerName}
                                </Text>
                                <Text
                                    className='font-roboto text-secondary_black'
                                    style={{
                                        fontSize: 10
                                    }}
                                >
                                    {safeZone.distanceFromLocation !== null ? safeZone.distanceFromLocation.toFixed(1) : "Location unavailable"}m
                                </Text>
                            </View>
                            <TouchableOpacity
                                className='p-2 rounded-xl'
                                style={{
                                    backgroundColor: 'rgba(0, 166, 62, 1)'
                                }}
                                onPress={() => navigateCenter(safeZone.centerName, safeZone.latitude, safeZone.longitude)}
                            >
                                {isNavigating === safeZone.centerName
                                ? (
                                    <ActivityIndicator size={"small"} color={"white"} />
                                ) : (
                                    <Ionicons 
                                        name='navigate-outline'
                                        size={20}
                                        color={'white'}
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <View
                        className='w-ful p-3 py-10 items-center'
                    >
                        <TouchableOpacity
                            className='w-ful tems-center p-4 w-[13em] rounded-xl'
                            style={{
                                backgroundColor: 'rgba(0, 166, 62, 1)'
                            }}
                            onPress={() => {
                                Linking.openSettings()
                            }}
                        >
                            <Text
                                className='text-center font-roboto font-bold text-normal text-primary_white'
                            >
                                Allow Location
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}