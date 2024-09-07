import { SvgIcon, SvgIconProps } from '@mui/material';

export default function LoadingIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 82 82"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40.9998 4V18.8"
          opacity="0.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        />
        <path
          d="M40.9998 63.1998V77.9998"
          opacity="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        />
        <path
          d="M14.8413 14.8412L25.3123 25.3122"
          opacity="0.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        />
        <path
          d="M56.6887 56.6879L67.1597 67.1589"
          opacity="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        />
        <path
          d="M4 41H18.8"
          opacity="0.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        />
        <path
          d="M63.2 41H77.9999"
          opacity="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        />
        <path
          d="M14.8413 67.1589L25.3123 56.6879"
          opacity="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        />
        <path
          d="M56.6887 25.3122L67.1597 14.8412"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        />
      </svg>
    </SvgIcon>
  );
}
