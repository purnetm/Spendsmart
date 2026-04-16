"use client";

import { CATS } from "@/lib/data/categories";
import { CatBar } from "@/components/shared/cat-bar";

export function HomeCatList() {
  return (
    <>
      {CATS.slice(0, 4).map((c) => (
        <CatBar key={c.id} cat={c} />
      ))}
    </>
  );
}
