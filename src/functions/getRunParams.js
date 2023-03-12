import bridge from "@vkontakte/vk-bridge"

export const getRunParams = async () => {
    if (window.vkParams) return window.vkParams

    const params = await bridge.send("VKWebAppGetLaunchParams")
    return Object.keys(params)
        .map(k => {
            return {[k]: params[k]}
        })
        .map(kv => `${Object.keys(kv)[0]}=${Object.values(kv)[0]}`)
        .join("&")
}