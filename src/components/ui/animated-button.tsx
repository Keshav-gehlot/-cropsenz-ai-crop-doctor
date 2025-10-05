import React, { forwardRef } from 'react';
import { Button } from './button';
import { AnimationController } from '../../utils/animations';

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  animateOnClick?: boolean;
  animateOnHover?: boolean;
  pulseEffect?: boolean;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({
    onClick,
    onMouseEnter,
    onMouseLeave,
    animateOnClick = true,
    animateOnHover = false,
    pulseEffect = false,
    className = '',
    children,
    ...props
  }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (animateOnClick) {
        AnimationController.buttonPress(e.currentTarget);
      }
      if (onClick) {
        if (animateOnClick) {
          setTimeout(() => onClick(e), 150);
        } else {
          onClick(e);
        }
      }
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (animateOnHover) {
        AnimationController.cardHover(e.currentTarget);
      }
      if (pulseEffect) {
        AnimationController.buttonPulse(e.currentTarget);
      }
      if (onMouseEnter) {
        onMouseEnter(e);
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (animateOnHover) {
        AnimationController.cardHoverOut(e.currentTarget);
      }
      if (pulseEffect) {
        AnimationController.stopAnimation(e.currentTarget);
      }
      if (onMouseLeave) {
        onMouseLeave(e);
      }
    };

    return (
      <Button
        ref={ref}
        className={`transition-all duration-200 ${className}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';
