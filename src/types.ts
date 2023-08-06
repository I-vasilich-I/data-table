const enum Align {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

enum Reports {
  DEFAULT = 'default',
  CUSTOM_1 = 'custom-1',
  CUSTOM_2 = 'custom-2',
}

type Header = {
  id: string;
  type: 'string' | 'float' | 'int' | 'boolean';
  caption: string;
  align?: Align;
}

type Primitive = string | number | boolean | null;

type CustomData = {
  d: Primitive;
  color: string;
}

type ReportData = {
  header: Header[];
  data: [Primitive | CustomData][];
}

export { Align, Reports };

export type {
  Header,
  Primitive,
  CustomData,
  ReportData
}