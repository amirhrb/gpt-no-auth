import * as React from 'react';
const SVGComponent = (props) => (
  <svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    width={300}
    height={100}
    viewBox="0 0 560 400"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g strokeWidth={5.625}>
      <path d="m55 155h90v90h-90z" fill="#ff6" />
      <path d="m145 155h90v90h-90z" fill="#42ffff" />
      <path d="m235 155h90v90h-90z" fill="#51da4c" />
      <path d="m325 155h90v90h-90z" fill="#ff6e3c" />
      <path d="m415 155h90v90h-90z" fill="#3c46ff" />
    </g>
  </svg>
);
export default SVGComponent;
