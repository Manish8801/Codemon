"use client";
import { ReactNode } from "react";

type Props = { children: ReactNode; label: string };

const FeatureCategory = ({ children, label }: Props) => (
  <div className="space-y-4">
    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
      {label}
    </h3>
    <ul className="space-y-3">{children}</ul>
  </div>
);

export default FeatureCategory;
