import * as React from "react";

function DragHandleDotsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.5 4.625a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zm4 0a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM10.625 7.5a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zM5.5 8.625a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zm5.125 2.875a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zM5.5 12.625a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default DragHandleDotsIcon;
