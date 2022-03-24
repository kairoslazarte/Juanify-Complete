import JuanifyIcon from '../../assets/img/icons/juanify.png'

const ForgotPassword = () => {
    return (
        <div className="forgot-password">
            <div className="forgot-password__container">
                <div className="forgot-password__div-1">
                    <center>
                        <img
                            className="forgot-password__img"
                            src = {JuanifyIcon}
                            alt="Workflow"
                        />
                    </center>
                    <div className="forgot-password__back-to-login">
                        <a href="/login">
                            Back to login
                        </a>
                    </div>
                    <h2>Forgot your password?</h2>
                    <p>
                        Worry not, we got you. Enter your email address and we’ll send you a link to reset your password.
                    </p>
                </div>
                <form className="forgot-password__form">
                    <div className="forgot-password__form--container">
                        <div>
                            <label htmlFor="email" className="forgot-password__email-label">
                            Email address
                            </label>
                            <input
                            id="email"
                            type="email"
                            name="email"
                            className="forgot-password__email-input"
                            required
                            autoFocus
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="forgot-password__btn-submit"
                        >
                            <span className="forgot-password__btn-span">
                            </span>
                                Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
