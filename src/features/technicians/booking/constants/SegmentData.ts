import {ServiceStatus, ServiceStatusKey} from '../../../../@types/booking';
import {ICONS} from '../../../../constants/theme';
import i18n from '../../../../i18n/i18n.config';

export type SegmentDataType = {
  key: number;
  code: string;
  title: string;
  color: string;
  icon: string;
};

export const getSegmentDataIndex = (code: ServiceStatus): number => {
  const segmentData: SegmentDataType[] = getSegmentData();
  return segmentData.findIndex(segment => segment.key === code);
};

export const getSegmentData = (): SegmentDataType[] => [
  {
    key: 0,
    code: '',
    title: i18n.t('segmentAllStatusLabel'),
    color: '#1299DA',
    icon: ICONS.icnArrowSpin('#1299DA'),
  },
  {
    key: ServiceStatus.Pending,
    code: ServiceStatusKey.Pending,
    title: i18n.t('segmentWaitingStatusLabel'),
    color: '#FFD700',
    icon: ICONS.icnArrowSpin('#FFD700'),
  },
  {
    key: ServiceStatus.Accepted,
    code: ServiceStatusKey.Accepted,
    title: i18n.t('segmentApprovedStatusLabel'),
    color: '#31393F',
    icon: ICONS.icnArrowSpin('#31393F'),
  },
  {
    key: ServiceStatus.OnGoing,
    code: ServiceStatusKey.OnGoing,
    title: i18n.t('segmentOnGoingStatusLabel'),
    color: '#1299DA',
    icon: ICONS.icnArrowSpin('#1299DA'),
  },
  {
    key: ServiceStatus.OnProcess,
    code: ServiceStatusKey.OnProcess,
    title: i18n.t('segmentProgressStatusLabel'),
    color: '#FFA07A',
    icon: ICONS.icnArrowSpin('#FFA07A'),
  },
  {
    key: ServiceStatus.WaitingApproval,
    code: ServiceStatusKey.WaitingApproval,
    title: i18n.t('segmentCustomerApprovalStatusLabel'),
    color: '#0DB0C4',
    icon: ICONS.icnArrowSpin('#0DB0C4'),
  },
  {
    key: ServiceStatus.Finish,
    code: ServiceStatusKey.Finish,
    title: i18n.t('segmentFinishStatusLabel'),
    color: '#32CD32',
    icon: ICONS.icnArrowSpin('#32CD32'),
  },
  {
    key: ServiceStatus.Canceled,
    code: ServiceStatusKey.Canceled,
    title: i18n.t('segmentCancelStatusLabel'),
    color: '#DC143C',
    icon: ICONS.icnArrowSpin('#DC143C'),
  },
];
