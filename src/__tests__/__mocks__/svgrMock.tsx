import React from "react";

const url = "SvgrURL";

const SvgrMock = React.forwardRef<HTMLSpanElement>((props, ref) => (
  <span ref={ref} {...props} />
));

export const ReactComponent = SvgrMock;
export default url;
