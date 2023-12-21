import React, { ReactNode } from "react";

const ContentCard = ({ children }: { children: ReactNode }) => {
  return <section className="content-card">{children}</section>;
};

export default ContentCard;
