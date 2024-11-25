import {presetIcons, presetUno, transformerVariantGroup} from 'unocss'
import UnoCSS from 'unocss/vite'

export function stylePlugin() {
    return UnoCSS({
        rules: [
            [/^bg-(primary|secondary|tertiary|quaternary)$/, ([, d]) => ({background: `var(--background-${d})`})],
            [/^text-accent-(secondary|tertiary|quaternary)$/, ([, d]) => ({color: `var(--accent-${d})`})],
            [/^text-accent$/, () => ({color: `var(--accent-primary)`})],
            [/^text-(primary|secondary)$/, ([, d]) => ({color: `var(--foreground-${d})`})],
        ],
        presets: [
            presetUno({
                theme: {
                    colors: {
                        'yell': '#FFFF00',
                        'primary': 'var(--foreground-primary)',
                        'secondary': 'var(--foreground-secondary)',
                        'accent': 'var(--accent-primary)',
                        'accent-muted': 'var(--accent-primary-muted)',
                        'accent-secondary': 'var(--accent-secondary)',
                        'accent-tertiary': 'var(--accent-tertiary)',
                        'accent-quaternary': 'var(--accent-quaternary)',
                    }
                }
            }),
            presetIcons(),
        ],
        transformers: [
            transformerVariantGroup(),
        ]
    })
}
