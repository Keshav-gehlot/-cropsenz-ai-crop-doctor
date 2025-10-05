import anime from 'animejs';

export class AnimationController {
  static pageEnter(target: string | HTMLElement) {
    return anime({
      targets: target,
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 600,
      easing: 'easeOutCubic'
    });
  }

  static pageExit(target: string | HTMLElement) {
    return anime({
      targets: target,
      opacity: [1, 0],
      translateY: [0, -30],
      duration: 400,
      easing: 'easeInCubic'
    });
  }

  static cardEntrance(target: string | HTMLElement, delay: number = 0) {
    return anime({
      targets: target,
      opacity: [0, 1],
      scale: [0.9, 1],
      translateY: [20, 0],
      duration: 500,
      delay: delay,
      easing: 'easeOutBack'
    });
  }

  static cardHover(target: string | HTMLElement) {
    return anime({
      targets: target,
      scale: [1, 1.02],
      duration: 200,
      easing: 'easeOutQuad'
    });
  }

  static cardHoverOut(target: string | HTMLElement) {
    return anime({
      targets: target,
      scale: [1.02, 1],
      duration: 200,
      easing: 'easeOutQuad'
    });
  }

  static buttonPress(target: string | HTMLElement) {
    return anime({
      targets: target,
      scale: [1, 0.95, 1],
      duration: 150,
      easing: 'easeOutQuad'
    });
  }

  static buttonPulse(target: string | HTMLElement) {
    return anime({
      targets: target,
      scale: [1, 1.1, 1],
      duration: 1000,
      loop: true,
      easing: 'easeInOutSine'
    });
  }

  static modalEnter(target: string | HTMLElement) {
    return anime({
      targets: target,
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 400,
      easing: 'easeOutElastic(1, .8)'
    });
  }

  static modalExit(target: string | HTMLElement) {
    return anime({
      targets: target,
      opacity: [1, 0],
      scale: [1, 0.8],
      duration: 300,
      easing: 'easeInCubic'
    });
  }

  static loadingSpinner(target: string | HTMLElement) {
    return anime({
      targets: target,
      rotate: '1turn',
      duration: 1000,
      loop: true,
      easing: 'linear'
    });
  }

  static loadingPulse(target: string | HTMLElement) {
    return anime({
      targets: target,
      opacity: [0.5, 1, 0.5],
      duration: 1500,
      loop: true,
      easing: 'easeInOutQuad'
    });
  }

  static floatingButtonEntrance(target: string | HTMLElement) {
    return anime({
      targets: target,
      scale: [0, 1],
      opacity: [0, 1],
      rotate: [180, 0],
      duration: 800,
      easing: 'easeOutElastic(1, .8)',
      delay: 200
    });
  }

  static floatingButtonBounce(target: string | HTMLElement) {
    return anime({
      targets: target,
      translateY: [0, -10, 0],
      duration: 2000,
      loop: true,
      easing: 'easeInOutSine'
    });
  }

  static staggeredListEntrance(targets: string | HTMLElement[], delay: number = 100) {
    return anime({
      targets: targets,
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: 500,
      delay: anime.stagger(delay),
      easing: 'easeOutCubic'
    });
  }

  static slideIn(target: string | HTMLElement, direction: 'left' | 'right' | 'up' | 'down' = 'right') {
    const translateProp = direction === 'left' || direction === 'right' ? 'translateX' : 'translateY';
    const startValue = direction === 'left' || direction === 'up' ? -100 : 100;

    return anime({
      targets: target,
      [translateProp]: [startValue, 0],
      opacity: [0, 1],
      duration: 500,
      easing: 'easeOutCubic'
    });
  }

  static slideOut(target: string | HTMLElement, direction: 'left' | 'right' | 'up' | 'down' = 'left') {
    const translateProp = direction === 'left' || direction === 'right' ? 'translateX' : 'translateY';
    const endValue = direction === 'left' || direction === 'up' ? -100 : 100;

    return anime({
      targets: target,
      [translateProp]: [0, endValue],
      opacity: [1, 0],
      duration: 400,
      easing: 'easeInCubic'
    });
  }

  static shake(target: string | HTMLElement) {
    return anime({
      targets: target,
      translateX: [0, -10, 10, -10, 10, 0],
      duration: 500,
      easing: 'easeInOutQuad'
    });
  }

  static glow(target: string | HTMLElement) {
    return anime({
      targets: target,
      boxShadow: [
        '0 0 0 0 rgba(59, 130, 246, 0.4)',
        '0 0 20px 10px rgba(59, 130, 246, 0.1)',
        '0 0 0 0 rgba(59, 130, 246, 0.4)'
      ],
      duration: 2000,
      loop: true,
      easing: 'easeInOutQuad'
    });
  }

  static stopAnimation(target: string | HTMLElement) {
    anime.remove(target);
  }

  static resetElement(target: string | HTMLElement) {
    anime.set(target, {
      opacity: 1,
      scale: 1,
      translateX: 0,
      translateY: 0,
      rotate: 0
    });
  }
}

export function useAnimation() {
  return {
    animate: AnimationController,
    anime
  };
}

export const AnimationPresets = {
  pageTransition: {
    enter: (target: string | HTMLElement) => AnimationController.pageEnter(target),
    exit: (target: string | HTMLElement) => AnimationController.pageExit(target)
  },

  cardInteraction: {
    enter: (target: string | HTMLElement, delay?: number) => AnimationController.cardEntrance(target, delay),
    hover: (target: string | HTMLElement) => AnimationController.cardHover(target),
    hoverOut: (target: string | HTMLElement) => AnimationController.cardHoverOut(target)
  },

  buttonFeedback: {
    press: (target: string | HTMLElement) => AnimationController.buttonPress(target),
    pulse: (target: string | HTMLElement) => AnimationController.buttonPulse(target)
  },

  modalInteraction: {
    enter: (target: string | HTMLElement) => AnimationController.modalEnter(target),
    exit: (target: string | HTMLElement) => AnimationController.modalExit(target)
  }
};
