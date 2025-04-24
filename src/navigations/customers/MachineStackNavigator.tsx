import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MachineStackNavigatorParamList} from '../../@types/navigation';
import {useTranslation} from 'react-i18next';

import {AddMyMachineScreen} from '../../features/customers/machine';
import useGlobalScreenOptions from '../../hooks/useGlobalScreenOptions';
// import {BackButton} from '../../components';

const Stack = createNativeStackNavigator<MachineStackNavigatorParamList>();

const StackNavigator: React.FC = () => {
  const {t} = useTranslation();
  const globalScreenOptions = useGlobalScreenOptions();

  return (
    <Stack.Navigator
      initialRouteName="AddMachine"
      screenOptions={{
        ...globalScreenOptions,
      }}>
      <Stack.Screen
        name="AddMachine"
        component={AddMyMachineScreen}
        options={{
          title: t('tabBarAddMachineLabel'),
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
