import React, { PropsWithChildren } from "react";

function Main(props: PropsWithChildren) {
  return <main className="main">{props.children}</main>;
}

export default Main;
