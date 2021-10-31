import React from 'react';

const TwButton = ({type, className, size, label}) => {
    return (
        <button type={type} className={`btn-defaults ${className} ${size}`}>
            <span className={"block mb-1"}>{label}</span>
        </button>
    )
};

const TwButtonPrimary = ({type, className, label, size}) => {
    return (
        <TwButton
            type={type}
            className={`btn-primary-defaults ${className}`}
            label={label}
            size={size}
        />
    )
};

const TwButtonSecondary = ({type, className, label, size}) => {
    return (
        <TwButton type={type}
                  className={`btn-secondary-defaults ${className}`}
                  label={label}
                  size={size}
        />
    )
};
const TwButtonPrimaryGhostLight = ({type, className, label, size}) => {
    return (
        <TwButton
            type={type}
            className={`btn-primary-ghost-light-defaults ${className}`}
            label={label}
            size={size}
        />
    )
};

const TwButtonSecondaryGhostLight = ({type, className, label, size}) => {
    return (
        <TwButton type={type}
                  className={`btn-secondary-ghost-light-defaults ${className}`}
                  label={label}
                  size={size}
        />
    )
};
const TwButtonPrimaryGhostDark = ({type, className, label, size}) => {
    return (
        <TwButton
            type={type}
            className={`btn-primary-ghost-dark-defaults ${className}`}
            label={label}
            size={size}
        />
    )
};

const TwButtonSecondaryGhostDark = ({type, className, label, size}) => {
    return (
        <TwButton type={type}
                  className={`btn-secondary-ghost-dark-defaults ${className}`}
                  label={label}
                  size={size}
        />
    )
};

TwButton.defaultProps = {
    type: "button",
    label: "Button label",
    size: "btn-sm"
}

export {
    TwButtonPrimary,
    TwButtonSecondary,
    TwButtonPrimaryGhostLight,
    TwButtonSecondaryGhostLight,
    TwButtonPrimaryGhostDark,
    TwButtonSecondaryGhostDark
} ;
