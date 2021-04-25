import { Color } from 'utils/types/enums';

export type SocketUser = {
  id: string | number;
  user: string;
};

export type MessageType = {
  date: Date;
  sender: string;
  text: string;
};

export type ListElementType = {
  name: string;
  path?: string;
  icon?: React.SVGProps<SVGSVGElement>;
  clickHandler?: () => any;
};

export type LoaderType = {
  isLoading: boolean;
  loadingMessage?: String;
  loaderColor?: Color;
};
