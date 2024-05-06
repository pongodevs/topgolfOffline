
import { SafeAreaView, StatusBarStyle } from 'react-native';
import VrViewer from './components/vrViewer';
import { StatusBar } from 'expo-status-bar';

export default function App() {
    return (
        <SafeAreaView
            style={{
                backgroundColor:`grey`
            }}
        >
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                hidden={true}
            />
            <VrViewer/>
        </SafeAreaView>
    );
}


