export interface IconProps {
  size?: number;
  color?: string;
  class?: string;
}

export const defaultIconProps: Required<Pick<IconProps, 'size' | 'color'>> = {
  size: 24,
  color: 'currentColor'
};
