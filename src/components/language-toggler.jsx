"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePopper } from "react-popper";
import { usePathname } from "next/navigation";

import globe from "public/globe.svg";
import { i18n, localeFullName } from "@/i18n-config";
import clsx from "clsx";

export default function Toggler() {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "offset", options: { offset: [-30, 10] } }],
    placement: "bottom",
  });
  const [show, setShow] = useState(false);
  const path = usePathname().slice(4);
  const currentLocale = usePathname().slice(1, 3);

  const toggleTooltip = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      <button
        type="button"
        className="relative px-2.5 py-2.5"
        ref={setReferenceElement}
        onClick={toggleTooltip}
      >
        <Image src={globe} alt="language" fill />
      </button>
      <ul
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className={` border-2 border-gray-100 bg-white px-2 pt-2 rounded-md ${
          show ? "" : "hidden"
        }`}
      >
        {i18n.locales.map((locale) => {
          return (
            <li
              key={locale}
              className={clsx(
                "pb-2",
                currentLocale === locale && "text-primary"
              )}
            >
              <Link href={`/${locale}/${path}`}>{localeFullName[locale]}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
