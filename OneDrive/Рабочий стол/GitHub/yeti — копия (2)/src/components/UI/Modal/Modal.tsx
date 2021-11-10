import React from 'react'

export const Modal: React.FunctionComponent = ({children}) => {
    return (
        <React.Fragment>
            <section className="modal modal--section">
                <div className="modal__content">{children}</div>
            </section>
        </React.Fragment>
    )
}
