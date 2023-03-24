const userAgent = window.navigator.userAgent

export const platform = {
    isAndroid: () => Boolean(userAgent.match(/Android/i)),
    isIos: () => Boolean(userAgent.match(/iPhone|iPad|iPod/i)),
    isOpera: () => Boolean(userAgent.match(/Opera Mini/i)),
    isWindows: () => Boolean(userAgent.match(/IEMobile/i)),
    isSSR: () => Boolean(userAgent.match(/SSR/i)),
    isMobile: () => Boolean(platform.isAndroid() || platform.isIos() || platform.isOpera() || platform.isWindows()),
    isDesktop: () => Boolean(!platform.isMobile() && !platform.isSSR())
}