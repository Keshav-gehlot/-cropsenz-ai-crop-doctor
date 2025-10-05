import React, { forwardRef } from 'react';
import { Card } from './card';
import { AnimationController } from '../../utils/animations';

interface AnimatedCardProps extends React.ComponentProps<"div"> {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
  animateOnHover?: boolean;
  animateOnClick?: boolean;
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({
    onClick,
    onMouseEnter,
    onMouseLeave,
    animateOnHover = true,
    animateOnClick = true,
    className = '',
    children,
    ...props
  }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
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

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (animateOnHover) {
        AnimationController.cardHover(e.currentTarget);
      }
      if (onMouseEnter) {
        onMouseEnter(e);
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (animateOnHover) {
        AnimationController.cardHoverOut(e.currentTarget);
      }
      if (onMouseLeave) {
        onMouseLeave(e);
      }
    };

    return (
      <Card
        ref={ref}
        className={`transition-all duration-200 ${onClick ? 'cursor-pointer' : ''} ${className}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </Card>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';
