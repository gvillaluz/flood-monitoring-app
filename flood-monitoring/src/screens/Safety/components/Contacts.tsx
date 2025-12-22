import { Hotlines } from '@/src/types/Evacuation'
import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'

type ObjectProps = {
    contacts: Hotlines[],
    redirectToDial: (number: string) => void
}

export default function Contacts({ contacts, redirectToDial }: ObjectProps) {
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
                Emergency Contacts
            </Text>
            <View
                className='gap-2 pb-3'
            >
                {contacts.map((contact, i) => (
                    <View
                        key={i}
                        className='flex-row justify-between items-center px-3 py-4 gap-2 overflow-hidden'
                        style={{
                            backgroundColor: 'rgba(254, 242, 242, 1)'
                        }}
                    >
                        <Text
                            className='font-roboto text-primary_black flex-1'
                            style={{
                                fontSize: 13,
                                flexShrink: 1
                            }}
                        >
                            {contact.hotlineName}
                        </Text>
                        <TouchableOpacity
                            className='flex-row justify-between items-center p-2 rounded-md gap-1'
                            style={{
                                backgroundColor: 'rgba(239, 68, 68, 1)'
                            }}
                            onPress={() => redirectToDial(contact.hotlineNumber)}
                        >
                            <Ionicons 
                                name='call-outline'
                                size={13}
                                color={'white'}
                            />
                            <Text
                                className='text-primary_white'
                                style={{
                                    fontSize: 13
                                }}
                            >
                                {contact.hotlineNumber}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    )
}