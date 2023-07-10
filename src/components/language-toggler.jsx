"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePopper } from "react-popper";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const toggleTooltip = () => {
    setShow((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (show && !referenceElement.contains(e.target)) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [referenceElement, show]);

  return (
    <>
      <button
        type="button"
        className={clsx(
          "p-2",
          "hover:bg-gray-200 hover:rounded-md transition-all"
        )}
        ref={setReferenceElement}
        onClick={toggleTooltip}
      >
        <span className="relative p-2.5">
          <Image src={globe} alt="language" fill />
        </span>
      </button>
      {show && (
        <motion.ul
          initial="hidden"
          animate="visible"
          ref={setPopperElement}
          style={styles.popper}
          variants={variants}
          {...attributes.popper}
          className={`border-2 border-gray-100 bg-white px-2 pt-2 rounded-md`}
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
                <Link href={`/${locale}/${path}`}>
                  {localeFullName[locale]}
                </Link>
              </li>
            );
          })}
        </motion.ul>
      )}
    </>
  );
}
