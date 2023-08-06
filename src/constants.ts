import defaultData from './default.data.json';
import customData_1 from './custom-1.data.json';
import customData_2 from './custom-2.data.json';
import { ReportData, Reports } from './types';

const DATA = {
  [Reports.DEFAULT]: defaultData as ReportData,
  [Reports.CUSTOM_1]: customData_1 as ReportData,
  [Reports.CUSTOM_2]: customData_2 as ReportData,
}

export { DATA };