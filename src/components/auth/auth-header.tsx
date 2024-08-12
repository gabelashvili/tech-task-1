'use client';

import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import Popper from './popper';

const langs = [
  {
    label: 'ქართული',
    value: 'geo',
  },
  {
    label: 'ინგლისური',
    value: 'eng',
  },
];

const AuthHeader = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(langs[0]);
  return (
    <div className="flex items-center justify-between gap-2 p-6">
      <h1 className="text-lg font-bold uppercase">my.gov.ge</h1>
      <div className="flex items-center gap-6">
        <Popper
          disableSameWidth
          renderButton={(setReferenceElement, referenceElement) => (
            <button
              type="button"
              onClick={(e) => setReferenceElement(referenceElement ? null : e.currentTarget)}
              className="inline-flex items-center gap-2 text-sm text-black"
            >
              {selectedLanguage.label}
              <IoMdArrowDropdown className="size-4" />
            </button>
          )}
          renderContent={(setReferenceElement) => (
            <div className="w-52 rounded-lg border bg-white shadow-md">
              {langs.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setReferenceElement(null);
                  }}
                  className="group flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-black data-[focus]:bg-white/10"
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        />
        <p className="text-sm">დახმარება</p>
      </div>
    </div>
  );
};

export default AuthHeader;
