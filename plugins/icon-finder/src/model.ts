export type PluginMessageEvent =  {
  type: 'create-svg',
  content: string,
  title: string
} | {
  type: 'theme'
  content: string
}

