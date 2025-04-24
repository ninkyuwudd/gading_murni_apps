import {createNavigationContainerRef} from '@react-navigation/native';
import {RootNavigatorParamList} from '../@types/navigation';

export type RouteAndParams = {
  key: string;
  name: string;
  params?: object;
};

export const navigationRef =
  createNavigationContainerRef<RootNavigatorParamList>();

export const customerHomeNavigate = {
  index: 0,
  routes: [
    {
      name: 'CustomerHome',
      state: {
        routes: [
          {name: 'DashboardTab'},
          {name: 'BookingTab'},
          {name: 'ServiceTab'},
          {name: 'NotificationsTab'},
          {name: 'ProfileTab'},
        ],
        index: 0,
      },
    },
  ],
};
