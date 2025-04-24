import {ServiceStatus} from '../../../../@types/booking';
import {ICONS} from '../../../../constants/theme';
import i18n from '../../../../i18n/i18n.config';

export type SegmentDataType = {
  key: number;
  title: string;
  color: string;
  icon: string;
};

export const getSegmentData = (): SegmentDataType[] => [
  {
    key: 0,
    title: i18n.t('BookingModule.Status.All'),
    color: '#1299DA',
    icon: ICONS.icnArrowSpin('#1299DA'),
  },
  {
    key: ServiceStatus.Pending,
    title: i18n.t('BookingModule.Status.Waiting'),
    color: '#FFD700',
    icon: ICONS.icnArrowSpin('#FFD700'),
  },
  {
    key: ServiceStatus.Accepted,
    title: i18n.t('BookingModule.Status.Approved'),
    color: '#31393F',
    icon: ICONS.icnArrowSpin('#31393F'),
  },
  {
    key: ServiceStatus.OnGoing,
    title: i18n.t('BookingModule.Status.OnGoing'),
    color: '#1299DA',
    icon: ICONS.icnArrowSpin('#1299DA'),
  },
  {
    key: ServiceStatus.OnProcess,
    title: i18n.t('BookingModule.Status.Progress'),
    color: '#FFA07A',
    icon: ICONS.icnArrowSpin('#FFA07A'),
  },
  {
    key: ServiceStatus.WaitingApproval,
    title: i18n.t('BookingModule.Status.CustomerApproval'),
    color: '#0DB0C4',
    icon: ICONS.icnArrowSpin('#0DB0C4'),
  },
  {
    key: ServiceStatus.Finish,
    title: i18n.t('BookingModule.Status.Finish'),
    color: '#32CD32',
    icon: ICONS.icnArrowSpin('#32CD32'),
  },
  {
    key: ServiceStatus.Canceled,
    title: i18n.t('BookingModule.Status.Cancelled'),
    color: '#DC143C',
    icon: ICONS.icnArrowSpin('#DC143C'),
  },
];
