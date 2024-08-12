'use client';

import React, { Dispatch, FC, ReactElement, SetStateAction, useCallback, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { AnimatePresence, motion } from 'framer-motion';
import { ModifierArguments, ModifierPhases, Placement, offset } from '@popperjs/core';

interface IPopper {
  renderButton: (setReferenceElement: Dispatch<SetStateAction<HTMLElement | null>>, referenceElement: HTMLElement | null) => ReactElement;
  renderContent: (setReferenceElement: Dispatch<SetStateAction<HTMLElement | null>>) => ReactElement;
  disableCloseOnAwayClick?: boolean;
  disableSameWidth?: boolean;
  placement?: Placement;
  offsetY?: number;
  offsetX?: number;
  onAnimationEnter?: () => void;
  onAnimationExit?: () => void;
  onAnimationStart?: () => void;
}

const sameWidth = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite' as ModifierPhases,
  requires: ['computeStyles'],
  fn: ({ state }: ModifierArguments<object>) => {
    state.styles.popper.minWidth = `${state.rects.reference.width}px`;
  },
  effect: ({ state }: ModifierArguments<object>) => {
    state.elements.popper.style.minWidth = `${(state.elements.reference as any)?.offsetWidth}px`;
  },
};

const Popper: FC<IPopper> = ({
  renderButton,
  disableCloseOnAwayClick,
  disableSameWidth,
  placement = 'bottom',
  renderContent,
  offsetX,
  offsetY,
  onAnimationEnter,
  onAnimationExit,
  onAnimationStart,
}) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      ...(disableSameWidth ? [] : [sameWidth]),
      {
        name: 'offset',
        options: {
          offset: [offsetX || 0, offsetY || 10],
        },
      },
    ],
    strategy: 'fixed',
  });

  const handleClickOutside = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!popperElement?.contains(e.target as Node) && !referenceElement?.contains(e.target as Node)) {
        setReferenceElement(null);
      }
    },
    [popperElement, referenceElement],
  );

  useEffect(() => {
    if (referenceElement && popperElement && !disableCloseOnAwayClick) {
      document.addEventListener('mouseup', handleClickOutside);
      document.addEventListener('touchend', handleClickOutside);
    } else {
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [referenceElement, popperElement, handleClickOutside, disableCloseOnAwayClick]);

  return (
    <>
      <div>{renderButton(setReferenceElement, referenceElement)}</div>
      <AnimatePresence>
        {referenceElement && (
          <motion.div
            onAnimationComplete={(definition: any) => {
              if (definition?.opacity === 1 && onAnimationEnter) {
                onAnimationEnter();
              }
              if (definition?.opacity === 0 && onAnimationExit) {
                onAnimationExit();
              }
            }}
            onAnimationStart={onAnimationStart}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            ref={setPopperElement}
            style={styles.popper}
            className="z-50 !m-auto"
            {...attributes.popper}
          >
            {renderContent(setReferenceElement)}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Popper;
