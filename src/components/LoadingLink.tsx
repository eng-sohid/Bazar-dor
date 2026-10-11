"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { LOADING_KEY } from "./LoadingBanner";

type Props = ComponentProps<typeof Link> & { label: string };

export default function LoadingLink({ label, onClick, ...rest }: Props) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        sessionStorage.setItem(LOADING_KEY, label);
        onClick?.(e);
      }}
    />
  );
}
