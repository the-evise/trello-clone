'use client'

import React from 'react'
import styles from './Button.module.scss'
import clsx from 'clsx'

type ButtonConfig = {
    default: {
        variant: 'primary' | 'secondary' | 'error'
        size: 'lg' | 'md'
    }
    addAnother: {
        variant?: never
        size: 'insideCard' | 'outsideCard'
    }
}


type ButtonProps = {
    [A in keyof ButtonConfig]: {
        action: A
        size: ButtonConfig[A]['size']
        variant?: ButtonConfig[A]['variant']
        children?: React.ReactNode
        onClick?: React.MouseEventHandler<HTMLButtonElement>
    }
}[keyof ButtonConfig]

const Button: React.FC<ButtonProps> = ({
                                           action,
                                           variant,
                                           size,
                                           onClick,
                                           children,
                                       }) => {
    return (
        <button
            className={clsx(
                styles.button,
                styles[variant ?? 'default'],
                styles[size]
            )}
            onClick={onClick}
            data-action={action} // optional: useful for debugging / analytics
        >
            {children}
        </button>
    )
}

export default Button