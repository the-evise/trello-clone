'use client'

import React from 'react';
import styles from './Button.module.scss';
import clsx from "clsx";

type ButtonAction =
    | 'default'
    | 'addAnother';

type ButtonVariant =
    | 'primary'
    | 'error'
    | 'secondary'
    | "default";

type ButtonSize =
    | 'lg'
    | 'md'
    | 'insideCard'
    | 'outsideCard';

const button: {
    [key in ButtonAction]: {
        variants?: ButtonVariant[];
        sizes: ButtonSize[];
    }
} = {
    default: {variants: ['primary', "secondary", "error"], sizes: ["lg", "md"]},
    addAnother: {
        variants: [],
        sizes: ["insideCard", "outsideCard"],
    }
};

interface ButtonProps {
    action: ButtonAction;
    variant?: ButtonVariant;
    size: ButtonSize;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({action, variant, size, onClick, children}) =>
{
    const actionStyles = button[action];


    if (action === 'default' && !actionStyles.variants?.includes(variant as "primary" | "error" | "secondary")) {
        console.warn(`Invalid variant for 'default' action: ${variant}. Allowed variants: ${actionStyles.variants}`);
    }

    if (action === 'addAnother' && !actionStyles.sizes.includes(size)) {
        console.warn(`Invalid size for 'addAnother' action: ${size}. Allowed sizes: ${actionStyles.sizes}`);
    }

    return (
        <button
            className={clsx(
                styles.button,
                styles[variant || 'default'], // Default to 'default' if no variant is provided
                styles[size]  // Apply the appropriate size
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
