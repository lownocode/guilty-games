import { Icon24BrowserBack } from "@vkontakte/icons"

import "../styles/components/back-button.css"

export const BackButton = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            className={"back-button-container"}
        >
            <Icon24BrowserBack
                style={{ color: "var(--text-color)" }}
                width={20}
                height={20}
            />
        </div>
    )
}